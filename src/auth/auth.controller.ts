import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { AuthService } from './providers/auth.service';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type-enum';
import { SkipThrottle, Throttle, ThrottlerGuard } from '@nestjs/throttler';
@UseGuards(ThrottlerGuard)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // when the user login and logout 3 times then he can't login again so fix it
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @Auth(AuthType.None)
  // @Throttle({ long: { limit: 3, ttl: 1000 * 60 * 15 } })
  public signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  //we call this api every 5 mins to check if the token is still valid
  // @Get('validJWT')
  // public validJWT() {}
}
