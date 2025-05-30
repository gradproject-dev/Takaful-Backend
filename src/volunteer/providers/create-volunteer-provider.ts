import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVolunteerDto } from '../dtos/create-volunteer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Volunteer } from '../volunteer.entity';
import { Repository } from 'typeorm';
import { GenericService } from 'src/generic-module/generic.service';
import { VolunteerStatus } from '../enum/volunteer-status.enum';
import { Donor } from 'src/donor/donor.entity';
import { EventEntity } from 'src/event/event.entity';

@Injectable()
export class CreateVolunteerProvider {
  constructor(
    @InjectRepository(Volunteer)
    private readonly volunteerRepo: Repository<Volunteer>,

    @InjectRepository(Donor)
    private readonly donorRepo: Repository<Donor>,

    @InjectRepository(EventEntity)
    private readonly eventRepo: Repository<EventEntity>,

    private readonly genericService: GenericService,
  ) {}
  async createVolunteer(dto: CreateVolunteerDto) {
    const donor = await this.genericService.findOneByV2(this.donorRepo, {
      where: { id: dto.donorId },
    });
    const event = await this.genericService.findOneByV2(this.eventRepo, {
      where: { id: dto.eventId },
    });

    if (!donor || !event) {
      throw new NotFoundException('Donor or Event not found');
    }

    const newVolunteer = {
      donor,
      event,
      // role: dto.role,
      status: VolunteerStatus.IDLE,
    };

    return this.genericService.create<Volunteer, Partial<Volunteer>>(
      newVolunteer,
      this.volunteerRepo,
    );
  }
}
