import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Charity } from '../charity.entity';
import { Repository } from 'typeorm';
import { GenericService } from 'src/generic-module/generic.service';
import {
  GenericFindManyOptions,
  GenericFindOptions,
} from 'src/generic-module/types';

@Injectable()
export class GetCharityProvider {
  constructor(
    @InjectRepository(Charity)
    private readonly charityRepo: Repository<Charity>,

    private readonly genericService: GenericService,
  ) {}

  async getCharityById(id: number) {
    return this.genericService.findOneBy<Charity>(this.charityRepo, { id });
  }
  async getAllCharities(options: GenericFindManyOptions<Charity>) {
    return this.genericService.findAllV2<Charity>(this.charityRepo, options);
  }

  async getCharity(options: GenericFindManyOptions<Charity>) {
    return this.genericService.findAllV2<Charity>(this.charityRepo, options);
  }
}
