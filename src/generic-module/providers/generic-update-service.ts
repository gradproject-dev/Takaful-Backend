import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { GenericGetService } from './generic-get-service';
import { GenericFindOptions } from '../types';
@Injectable()
export class GenericUpdateService {
  constructor(private readonly genericGetService: GenericGetService) {}

  async updateOne<T, V>(
    repo: Repository<T>,
    genericUpdateDto: V,
    options: GenericFindOptions<T>, // based on this we get the old item
  ): Promise<T> {
    // find the old item
    const oldItem = await this.genericGetService.getOneBy<T>(repo, options);

    const updatedItem = await repo.save({ ...oldItem, ...genericUpdateDto });

    return updatedItem;
  }
}
