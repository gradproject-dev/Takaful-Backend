import { Module } from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { FindUserByEmailProvider } from './providers/find-user-by-email.provider';
import { CreateUserProvider } from './providers/create-user.provider';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  providers: [UsersService, FindUserByEmailProvider, CreateUserProvider],
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
