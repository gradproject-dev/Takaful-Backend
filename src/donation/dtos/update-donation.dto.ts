import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateDonationDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsIn([1, 2, 3, 4, 5])
  @IsOptional()
  rating: number;

  @IsNumber()
  @IsOptional()
  charityId: number;

  @IsNumber()
  @IsOptional()
  categoryId: number;
}
