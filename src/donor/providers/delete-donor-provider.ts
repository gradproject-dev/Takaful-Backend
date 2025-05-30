import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Donor } from '../donor.entity';
import { Repository } from 'typeorm';
import { GenericService } from 'src/generic-module/generic.service';

@Injectable()
export class DeleteDonorProvider {
  constructor(
    @InjectRepository(Donor)
    private readonly donorRepo: Repository<Donor>,

    private readonly genericService: GenericService,
  ) {}

  public async softDeleteItem(id: number) {
    return await this.genericService.softDeleteItem(id, this.donorRepo);
  }
}
