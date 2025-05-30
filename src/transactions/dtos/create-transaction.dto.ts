import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { PaymentMethod } from '../transaction.entity';

export class DonateDto {
  @IsNumber()
  @IsNotEmpty()
  donorId: number;

  @IsNumber()
  @IsNotEmpty()
  charityId: number;

  @IsNumber({ allowInfinity: false })
  @IsNotEmpty()
  amount: number;

  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @IsString()
  @Length(13, 19) // Typical card length: 13–19 digits
  cardNumber: string;

  @IsString()
  @Length(3, 4) // CCV is typically 3 or 4 digits
  ccv: string;
}
