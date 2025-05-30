import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { User } from 'src/users/user.entity';

export class CreateDonorDto {
  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  lat: string;
  @IsString()
  @IsNotEmpty()
  lng: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString()
  imgId?: string;

  @IsOptional()
  @IsString()
  imgUrl?: string;

  @IsOptional()
  user: User;
}
