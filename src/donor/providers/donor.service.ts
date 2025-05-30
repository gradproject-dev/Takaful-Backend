import { Injectable } from '@nestjs/common';
import { CreateDonorDto } from '../dtos/create-donor.dto';
import { CreateDonorProvider } from './create-donor-provider';
import { GetDonorProvider } from './get-donor-provider';
import { UpdateDonorDto } from '../dtos/update-donor.dto';
import { UpdateDonorProvider } from './update-donor-provider';
import { DeleteDonorProvider } from './delete-donor-provider';
import { GenericFindOptions } from 'src/generic-module/types';
import { Donor } from '../donor.entity';

@Injectable()
export class DonorService {
  constructor(
    private readonly createDonorProvider: CreateDonorProvider,
    private readonly getDonorProvider: GetDonorProvider,
    private readonly updateDonorProvider: UpdateDonorProvider,
    private readonly deleteDonorProvider: DeleteDonorProvider,
  ) {}

  public createDonor(
    createDonorDto: CreateDonorDto,
    file?: Express.Multer.File,
  ) {
    return this.createDonorProvider.createDonor(createDonorDto, file);
  }

  public getDonorById(id: number) {
    return this.getDonorProvider.getDonorById(id);
  }

  public getAllDonors(options: GenericFindOptions<Donor> = {}) {
    return this.getDonorProvider.getAllDonors(options);
  }

  public async updateDonor(updateDonorDto: UpdateDonorDto) {
    return await this.updateDonorProvider.updateDonor(updateDonorDto);
  }

  public softDeleteDonor(id: number) {
    return this.deleteDonorProvider.softDeleteItem(id);
  }
}
