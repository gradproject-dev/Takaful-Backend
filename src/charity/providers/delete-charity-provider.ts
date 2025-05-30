import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Charity } from '../charity.entity';
import { Repository } from 'typeorm';
import { GenericService } from 'src/generic-module/generic.service';

@Injectable()
export class DeleteCharityProvider {
  constructor(
    @InjectRepository(Charity)
    private readonly charityRepo: Repository<Charity>,

    private readonly genericService: GenericService,
  ) {}

  public async softDeleteItem(id: number) {
    return await this.genericService.softDeleteItem(id, this.charityRepo);
  }
}
