import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ROLES } from '../types';

export class CreateUserDto {
  @IsEmail()
  @MinLength(3)
  @MaxLength(96)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(96)
  password: string;

  @IsEnum(ROLES)
  @IsNotEmpty()
  role: ROLES;
}
