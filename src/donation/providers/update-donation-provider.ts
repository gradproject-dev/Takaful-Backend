import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Donation } from '../donation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from 'src/generic-module/generic.service';
import { UpdateDonationDto } from '../dtos/update-donation.dto';

@Injectable()
export class UpdateDonationProvider {
  constructor(
    @InjectRepository(Donation)
    private readonly donationRepo: Repository<Donation>,

    private readonly genericService: GenericService,
  ) {}

  public async updateDonation(
    updateDonationDto: UpdateDonationDto,
  ): Promise<Donation> {
    return this.genericService.updateOne<Donation, UpdateDonationDto>(
      this.donationRepo,
      updateDonationDto,
      { id: updateDonationDto.id },
    );
  }
}
