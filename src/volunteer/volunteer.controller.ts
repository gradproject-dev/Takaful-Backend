import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { VolunteerService } from './providers/volunteer.service';
import { CreateVolunteerDto } from './dtos/create-volunteer.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type-enum';
import { VolunteerStatus } from './enum/volunteer-status.enum';
import { UpdateVolunteerStatusDto } from './dtos/update-volunteer.dto';

@Controller('volunteer')
export class VolunteerController {
  constructor(private readonly volunteerService: VolunteerService) {}

  @Post()
  @Auth(AuthType.None)
  createVolunteer(@Body() dto: CreateVolunteerDto) {
    return this.volunteerService.createVolunteer(dto);
  }

  @Patch(':id/status')
  @Auth(AuthType.None)
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() { status }: UpdateVolunteerStatusDto,
  ) {
    return this.volunteerService.updateVolunteerStatus(id, status);
  }

  @Get()
  @Auth(AuthType.None)
  getVolunteer(
    @Query('id') idRaw?: string,
    @Query('donorId') donorIdRaw?: string,
    @Query('status') eventIdRaw?: string,
    @Query('status') status?: VolunteerStatus,
    // @Query('role') role?: string,
  ) {
    const id = idRaw ? parseInt(idRaw, 10) : undefined;
    const donorId = donorIdRaw ? parseInt(donorIdRaw, 10) : undefined;
    const eventId = eventIdRaw ? parseInt(eventIdRaw, 10) : undefined;
    if (!id && !status && !donorId) {
      throw new BadRequestException(
        'Please specify at least one filter (e.g., id)',
      );
    }

    return this.volunteerService.getVolunteer({
      where: {
        id,
        status,
        donor: { id: donorId },
        event: { id: eventId },
      },
      // role,
    });
  }

  @Get('check')
  @Auth(AuthType.None)
  checkIfDonorVolunteered(
    @Query('donorId') donorIdRaw?: string,
    @Query('eventId') eventIdRaw?: string,
  ) {
    const donorId = donorIdRaw ? parseInt(donorIdRaw, 10) : undefined;
    const eventId = eventIdRaw ? parseInt(eventIdRaw, 10) : undefined;

    if (!donorId || !eventId) {
      throw new BadRequestException('donorId and eventId are required');
    }

    return this.volunteerService.getVolunteer({
      where: {
        donor: { id: donorId },
        event: { id: eventId },
      },
    });
  }

  @Get('all')
  @Auth(AuthType.None)
  getAllVolunteers() {
    return this.volunteerService.getAllVolunteers();
  }
}
