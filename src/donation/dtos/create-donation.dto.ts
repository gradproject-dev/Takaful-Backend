import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsNumber,
  IsIn,
} from 'class-validator';
import { Donor } from 'src/donor/donor.entity';
import { User } from 'src/users/user.entity';

export class CreateDonationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsIn([1, 2, 3, 4, 5])
  @IsNotEmpty()
  quality: number;

  @IsOptional()
  @IsUrl()
  imgsUrl: string[];

  @IsOptional()
  @IsString()
  imgsId: string[];

  @IsNumber()
  @IsOptional()
  charityId: number;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  // ammar
  // this one is for the controller request
  @IsNumber()
  donorId: number; // from donor

  // this is for the object insertion inside the DB
  @IsOptional()
  donor: Donor;
}
