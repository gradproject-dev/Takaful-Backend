import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Charity } from '../charity.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from 'src/generic-module/generic.service';
import { UpdateCharityDto } from '../dtos/update-charity.dto';
import { CHARITY_STATUS } from '../enums';
import { AdminUpdateCharityDto } from '../dtos/admin-update-charity.dto';

@Injectable()
export class UpdateCharityProvider {
  constructor(
    @InjectRepository(Charity)
    private readonly charityRepo: Repository<Charity>,
    private readonly genericService: GenericService,
  ) {}

  public async updateCharity(
    updateCharityDto: UpdateCharityDto,
  ): Promise<Charity> {
    return this.genericService.updateOne<Charity, UpdateCharityDto>(
      this.charityRepo,
      updateCharityDto,
      { id: updateCharityDto.id },
    );
  }

  public async updateCharityStatus(
    updateCharityDtop: AdminUpdateCharityDto,
  ): Promise<Charity> {
    console.log(updateCharityDtop);
    return this.genericService.updateOne<Charity, AdminUpdateCharityDto>(
      this.charityRepo,
      updateCharityDtop,
      { id: updateCharityDtop.id },
    );
  }
}
