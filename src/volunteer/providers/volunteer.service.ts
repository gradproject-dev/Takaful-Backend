// src/volunteer/providers/volunteer.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Volunteer } from '../volunteer.entity';
import { CreateVolunteerDto } from '../dtos/create-volunteer.dto';
import { VolunteerStatus } from '../enum/volunteer-status.enum';
import {
  GenericFindManyOptions,
  GenericFindOptions,
} from 'src/generic-module/types';
import { CreateVolunteerProvider } from './create-volunteer-provider';
import { DeleteVolunteerProvider } from './delete-volunteer-provider';
import { UpdateVolunteerProvider } from './update-volunteer-provider';
import { GetVolunteerProvider } from './get-volunteer-provider';

@Injectable()
export class VolunteerService {
  constructor(
    private readonly createVolunteerProvider: CreateVolunteerProvider,
    private readonly deleteVolunteerProvider: DeleteVolunteerProvider,
    private readonly updateVolunteerProvider: UpdateVolunteerProvider,
    private readonly getVolunteerProvider: GetVolunteerProvider,
  ) {}

  async createVolunteer(dto: CreateVolunteerDto) {
    console.log(dto);
    console.log(this.createVolunteerProvider);
    return await this.createVolunteerProvider.createVolunteer(dto);
  }

  async updateVolunteerStatus(id: number, status: VolunteerStatus) {
    return this.updateVolunteerProvider.updateVolunteerStatus(id, status);
  }
  async getVolunteer(options: GenericFindManyOptions<Volunteer>) {
    return this.getVolunteerProvider.getVolunteer(options);
  }

  async getAllVolunteers(options: GenericFindOptions<Volunteer> = {}) {
    return this.getVolunteerProvider.getAllVolunteers(options);
  }

  // add the delete volunteer later ramez
}
