import { Injectable } from '@nestjs/common';
import { CreateDonationDto } from '../dtos/create-donation.dto';
import { UpdateDonationDto } from '../dtos/update-donation.dto';
import { CreateDonationProvider } from './create-donation-provider';
import { GetDonationProvider } from './get-donation-provider';
import { UpdateDonationProvider } from './update-donation-provider';
import { DeleteDonationProvider } from './delete-donation-provider';
import { Donation } from '../donation.entity';
import {
  GenericFindManyOptions,
  GenericFindOptions,
} from 'src/generic-module/types';

@Injectable()
export class DonationService {
  constructor(
    private readonly createDonationProvider: CreateDonationProvider,
    private readonly getDonationProvider: GetDonationProvider,
    private readonly updateDonationProvider: UpdateDonationProvider,
    private readonly deleteDonationProvider: DeleteDonationProvider,
  ) {}

  public createDonation(
    createDonationDto: CreateDonationDto,
    file: Express.Multer.File[],
  ) {
    return this.createDonationProvider.createDonation(createDonationDto, file);
  }

  public getDonationById(id: number) {
    return this.getDonationProvider.getDonationById(id);
  }

  public getDonation(options: GenericFindManyOptions<Donation>) {
    return this.getDonationProvider.getDonation(options);
  }

  public getAllDonations(options: GenericFindManyOptions<Donation> = {}) {
    return this.getDonationProvider.getAllDonations(options);
  }

  public updateDonation(updateDonationDto: UpdateDonationDto) {
    return this.updateDonationProvider.updateDonation(updateDonationDto);
  }

  public softDeleteDonation(id: number) {
    return this.deleteDonationProvider.softDeleteItem(id);
  }
}
