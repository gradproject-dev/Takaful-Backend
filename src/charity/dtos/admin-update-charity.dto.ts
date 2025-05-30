import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CHARITY_STATUS } from '../enums';
export class AdminUpdateCharityDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsBoolean()
  @IsOptional()
  canReceiveFunds?: boolean;

  @IsOptional()
  @IsEnum(CHARITY_STATUS)
  status?: CHARITY_STATUS;

  //   imgUrl: string;
  //   imgId: string;
}
