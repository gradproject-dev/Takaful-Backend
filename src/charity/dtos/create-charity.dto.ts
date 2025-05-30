import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { User } from 'src/users/user.entity';
import { JoinColumn, OneToOne } from 'typeorm';
export class CreateCharityDto {
  //   id: number;
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
  @IsUrl()
  imgUrl: string;

  @IsOptional()
  @IsString()
  imgId: string;

  // @IsOptional()
  user: User;
}
