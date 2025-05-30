import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { ActiveUserData } from '../interfaces/active-user-data.interface';

// PROFILE_API_KEY=123
// JWT_SECRET=dBWswyurygqwyemnaasd
// JWT_TOKEN_AUDIENCE=localhost:3000
// JWT_TOKEN_ISSUER=localhost:3000
// JWT_ACCESS_TOKEN_TTL=3600
// JWT_REFRESH_TOKEN_TTL=86400

@Injectable()
export class GenerateTokensProvider {
  constructor(
    private readonly jwtService: JwtService,

    private readonly configService: ConfigService,
    // @Inject(jwtConfig.KEY)
    // private readonly jwtConfigiration: ConfigType<typeof jwtConfig>,
  ) {}

  public async signToken(expiresIn: number, payload: ActiveUserData) {
    const accessToken = await this.jwtService.signAsync(
      { ...payload },
      {
        audience: this.configService.get('JWT_TOKEN_AUDIENCE'),
        issuer: this.configService.get('JWT_TOKEN_ISSUER'),
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: expiresIn,
      },
    );

    return accessToken;
  }

  public async generateTokens(user: User) {
    // Generate refresh token
    // Generate the access token
    // const [accessToken, refreshToken] = await Promise.all([
    //   this.signToken<Partial<ActiveUserData>>(
    //     user.id,
    //     this.jwtConfigiration.accessTokenTtl,
    //     { email: user.email },
    //   ),
    //   this.signToken(user.id, this.jwtConfigiration.refreshTokenTtl),
    // ]);

    // return { accessToken, refreshToken };

    const accessToken = await this.signToken(
      this.configService.get('JWT_ACCESS_TOKEN_TTL'),
      { email: user.email, sub: user.id },
    );
    return accessToken;
  }
}
