import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Donor } from '../donor.entity';
import { Repository } from 'typeorm';
import { GenericService } from 'src/generic-module/generic.service';
import { GenericFindOptions } from 'src/generic-module/types';

@Injectable()
export class GetDonorProvider {
  constructor(
    @InjectRepository(Donor)
    private readonly donorRepo: Repository<Donor>,

    private readonly genericService: GenericService,
  ) {}

  async getDonorById(id: number) {
    return this.genericService.findOneBy<Donor>(this.donorRepo, { id });
  }

  async getAllDonors(options: GenericFindOptions<Donor>) {
    return this.genericService.findAll<Donor>(this.donorRepo, options);
  }
}
