import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Volunteer } from '../volunteer.entity';
import { Repository } from 'typeorm';
import {
  GenericFindManyOptions,
  GenericFindOptions,
} from 'src/generic-module/types';
import { GenericService } from 'src/generic-module/generic.service';

@Injectable()
export class GetVolunteerProvider {
  constructor(
    @InjectRepository(Volunteer)
    private readonly volunteerRepo: Repository<Volunteer>,

    private readonly genericService: GenericService,
  ) {}
  async getVolunteer(options: GenericFindManyOptions<Volunteer>) {
    return this.genericService.findAllV2(this.volunteerRepo, options);
  }

  async getAllVolunteers(options: GenericFindOptions<Volunteer> = {}) {
    return this.genericService.findAll(this.volunteerRepo, options);
  }
}
