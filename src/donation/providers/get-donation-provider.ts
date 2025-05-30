import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Donation } from '../donation.entity';
import { Not, Repository } from 'typeorm';
import { GenericService } from 'src/generic-module/generic.service';
import {
  GenericFindManyOptions,
  GenericFindOptions,
} from 'src/generic-module/types';

@Injectable()
export class GetDonationProvider {
  constructor(
    @InjectRepository(Donation)
    private readonly donationRepo: Repository<Donation>,

    private readonly genericService: GenericService,
  ) {}

  async getDonationById(id: number): Promise<Donation> {
    // return this.genericService.findOneBy<Donation>(this.donationRepo, { id });
    return this.genericService.findOneByV2<Donation>(this.donationRepo, {
      where: { id },
    })[0];
  }
  async getDonationByIdV2(id: number) {
    return this.genericService.findOneByV2<Donation>(this.donationRepo, {
      where: { id },
    });
  }

  async getAllDonations(options: GenericFindManyOptions<Donation>) {
    return this.genericService.findAllV2<Donation>(this.donationRepo, options);
  }

  async getDonation(options: GenericFindManyOptions<Donation>) {
    // this.donationRepo.find({ where: { user: { id: 1 } } });
    return this.genericService.findOneByV2<Donation>(
      this.donationRepo,
      options,
    );
  }
}
