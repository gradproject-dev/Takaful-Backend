import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';
import { Charity } from 'src/charity/charity.entity';
import { Donor } from 'src/donor/donor.entity';
import { User } from 'src/users/user.entity';

export class CreateNotificationDto {
  @IsNumber()
  @IsNotEmpty()
  senderId: number;

  @IsNumber()
  @IsNotEmpty()
  recieverId: number;

  @IsString()
  @IsNotEmpty()
  message: string;

  // @IsOptional()
  // donorId?: number;

  // @IsOptional()
  // charityId?: number;

  // this should be taken from the user in the database
  @IsString()
  @IsOptional()
  recipientExpoPushToken?: string;

  @IsOptional()
  sender?: User;

  @IsOptional()
  reciever?: User;
}
