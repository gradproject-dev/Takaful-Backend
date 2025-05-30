import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constants';

// This is not used directly Instead it is used from the authentication.guard.ts
@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    // Inject jwtService
    private readonly jwtService: JwtService,

    // Inject jwtConfiguration
    // @Inject(jwtConfig.KEY)
    // private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Extract the request form the executionContext
    const request = context.switchToHttp().getRequest();

    // Extract the token from the header
    const token = this.extractRequestFromHeader(request);

    // validate the token
    if (!token) throw new UnauthorizedException();

    try {
      //this line verifies that the sent token is valid
      //no need to pass the expiresIn cuz it was already assigned to the token when we created it

      const payload = await this.jwtService.verifyAsync(token, {
        audience: this.configService.get('JWT_TOKEN_AUDIENCE'),
        issuer: this.configService.get('JWT_TOKEN_ISSUER'),
        secret: this.configService.get('JWT_SECRET'),
      });
      request[REQUEST_USER_KEY] = payload;
    } catch (_) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractRequestFromHeader(request: Request): string | undefined {
    // the first element is the error
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }
}
