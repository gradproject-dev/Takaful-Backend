import { Type } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Charity } from 'src/charity/charity.entity';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  date: Date;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  charityId: number;

  // these don't get passed by the request
  @IsOptional()
  imgsId: string[];

  @IsOptional()
  imgsUrl: string[];

  @IsOptional()
  charity: Charity;
}
