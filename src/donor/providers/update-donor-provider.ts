import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Donor } from '../donor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from 'src/generic-module/generic.service';
import { UpdateDonorDto } from '../dtos/update-donor.dto';

@Injectable()
export class UpdateDonorProvider {
  constructor(
    @InjectRepository(Donor)
    private readonly donorRepo: Repository<Donor>,
    private readonly genericService: GenericService,
  ) {}

  public async updateDonor(updateDonorDto: UpdateDonorDto): Promise<Donor> {
    return this.genericService.updateOne<Donor, UpdateDonorDto>(
      this.donorRepo,
      updateDonorDto,
      { id: updateDonorDto.id },
    );
  }
}
