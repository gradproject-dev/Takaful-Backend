import { Injectable } from '@nestjs/common';
import { CreateCharityDto } from '../dtos/create-charity.dto';
import { CreateCharityProvider } from './create-charity-provider';
import { GetCharityProvider } from './get-charity-provider';
import { UpdateCharityDto } from '../dtos/update-charity.dto';
import { UpdateCharityProvider } from './update-charity-provider';
import { DeleteCharityProvider } from './delete-charity-provider';
import {
  GenericFindManyOptions,
  GenericFindOptions,
} from 'src/generic-module/types';
import { Charity } from '../charity.entity';
import { AdminUpdateCharityDto } from '../dtos/admin-update-charity.dto';

@Injectable()
export class CharityService {
  constructor(
    private readonly createCharityProvider: CreateCharityProvider,
    private readonly getCharityProvider: GetCharityProvider,
    private readonly updateCharityProvider: UpdateCharityProvider,
    private readonly deleteCharityProvider: DeleteCharityProvider,
  ) {}

  public createCharity(
    createCharityDto: CreateCharityDto,
    file: Express.Multer.File,
    docFiles: Express.Multer.File[],
  ) {
    return this.createCharityProvider.createCharity(
      createCharityDto,
      file,
      docFiles,
    );
  }

  public getCharityById(id: number) {
    return this.getCharityProvider.getCharityById(id);
  }

  async getCharity(options: GenericFindManyOptions<Charity>) {
    return this.getCharityProvider.getCharity(options);
  }

  public getAllCharities(options: GenericFindManyOptions<Charity> = {}) {
    return this.getCharityProvider.getAllCharities(options);
  }

  public async updateCharity(updateCharityDto: UpdateCharityDto) {
    return await this.updateCharityProvider.updateCharity(updateCharityDto);
  }

  public async updateCharityStatus(updateCharityDto: AdminUpdateCharityDto) {
    return await this.updateCharityProvider.updateCharityStatus(
      updateCharityDto,
    );
  }

  public softDeleteCharity(id: number) {
    return this.deleteCharityProvider.softDeleteItem(id);
  }
}
