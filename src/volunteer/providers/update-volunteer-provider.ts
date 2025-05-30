import { Injectable } from '@nestjs/common';
import { VolunteerStatus } from '../enum/volunteer-status.enum';
import { GenericService } from 'src/generic-module/generic.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Volunteer } from '../volunteer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UpdateVolunteerProvider {
  constructor(
    private genericService: GenericService,
    @InjectRepository(Volunteer)
    private readonly volunteerRepo: Repository<Volunteer>,
  ) {}
  async updateVolunteerStatus(id: number, status: VolunteerStatus) {
    const volunteer = await this.genericService.findOneByV2(
      this.volunteerRepo,
      { where: { id } },
    );

    volunteer.status = status;
    return this.volunteerRepo.save(volunteer);
  }
}
