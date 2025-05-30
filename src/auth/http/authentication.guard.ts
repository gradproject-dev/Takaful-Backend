import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { AuthType } from '../enums/auth-type-enum';
import { AccessTokenGuard } from '../guards/access-token/access-token.guard';
import { AUTH_TYPE_KEY } from '../constants/auth.constants';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  // Set the default Auth Type
  private static readonly defaultAuthType = AuthType.Bearer;

  // Create authTypeGuardMap
  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  > = {
    [AuthType.Bearer]: this.accessTokenGuard, // here this gaurd implements the canActivate
    [AuthType.None]: { canActivate: () => true },
  };

  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Print authTypeGuardMap

    // get the metadata which was set by the auth.decorator.ts
    const authTypes = this.reflector.getAllAndOverride<AuthType[]>(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    ) ?? [AuthenticationGuard.defaultAuthType];

    // Show what are authTypes
    const guards = authTypes.map((type) => this.authTypeGuardMap[type]).flat();
    // printeGuards => Show that the user can pass an array in users controller as well

    // Declare the default error
    let error = new UnauthorizedException();

    for (const instance of guards) {
      // print each instance
      // Decalre a new constant
      const canActivate = await Promise.resolve(
        // Here the AccessToken Guard Will be fired and check if user has permissions to acces
        // Later Multiple AuthTypes can be used even if one of them returns true
        // The user is Authorised to access the resource
        instance.canActivate(context),
      ).catch((err) => {
        error = err;
      });
      // Display Can Activate
      if (canActivate) {
        return true;
      }
    }

    throw error;
  }
}
