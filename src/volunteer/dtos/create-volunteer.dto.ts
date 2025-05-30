// src/volunteer/dtos/create-volunteer.dto.ts
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { VolunteerStatus } from '../enum/volunteer-status.enum';

export class CreateVolunteerDto {
  @IsNumber()
  donorId: number;

  @IsNumber()
  eventId: number;

  // @IsNotEmpty()
  // role: string;

  // status is optional on creation; defaults to IDLE
  @IsEnum(VolunteerStatus)
  status?: VolunteerStatus = VolunteerStatus.IDLE;
}
