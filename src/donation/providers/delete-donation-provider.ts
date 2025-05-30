import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Donation } from '../donation.entity';
import { Repository } from 'typeorm';
import { GenericService } from 'src/generic-module/generic.service';

@Injectable()
export class DeleteDonationProvider {
  constructor(
    @InjectRepository(Donation)
    private readonly donationRepo: Repository<Donation>,

    private readonly genericService: GenericService,
  ) {}

  public async softDeleteItem(id: number) {
    return await this.genericService.softDeleteItem(id, this.donationRepo);
  }
}
