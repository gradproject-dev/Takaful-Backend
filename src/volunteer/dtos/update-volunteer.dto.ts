// src/volunteer/dtos/update-volunteer-status.dto.ts
import { IsEnum, IsNotEmpty } from 'class-validator';
import { VolunteerStatus } from '../enum/volunteer-status.enum';

export class UpdateVolunteerStatusDto {
  @IsNotEmpty()
  @IsEnum(VolunteerStatus, {
    message: `status must be one of: ${Object.values(VolunteerStatus).join(', ')}`,
  })
  status: VolunteerStatus;
}
