import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CharityModule } from './charity/charity.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenericModule } from './generic-module/generic.module';
import { DonorModule } from './donor/donor.module';
import { UploadsModule } from './uploads/uploads.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './auth/config/jwt.config';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './auth/http/authentication.guard';
import { AccessTokenGuard } from './auth/guards/access-token/access-token.guard';
import { DonationModule } from './donation/donation.module';
import { CategoryModule } from './category/category.module';
import { EventModule } from './event/event.module';
import { VolunteerModule } from './volunteer/volunteer.module';
import { TransactionsModule } from './transactions/transactions.module';
import { NotificationsModule } from './notifications/notifications.module';

const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // this nesures that this is available inside all modules
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configservice: ConfigService) => {
        return {
          type: 'postgres',
          host: configservice.getOrThrow('DB_HOST'),
          port: configservice.getOrThrow('DB_PORT'),
          username: configservice.getOrThrow('DB_USERNAME'),
          database: configservice.getOrThrow('DB'),
          password: configservice.getOrThrow('DB_PASSWORD'),
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    // {
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   database: 'Takaful',
    //   password: configservice.getOrThrow('DB_PASSWORD'),
    //   autoLoadEntities: true,
    //   synchronize: true,
    // };
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
    CharityModule,
    GenericModule,
    DonorModule,
    AuthModule,
    UsersModule,
    UploadsModule,
    DonationModule,
    CategoryModule,
    EventModule,
    VolunteerModule,
    TransactionsModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: AuthenticationGuard },
    AccessTokenGuard,
  ],
})
export class AppModule {}
