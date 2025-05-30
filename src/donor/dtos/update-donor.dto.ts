import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDonorDto {
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

  @IsOptional()  
  @IsString()
  imgId?: string;

  @IsOptional() 
  @IsString()
  imgUrl?: string;
}
