import { Injectable } from '@nestjs/common';
import { GenericCreateService } from './providers/generic-create-service';
import { GenericUpdateService } from './providers/generic-update-service';
import { GenericGetService } from './providers/generic-get-service';
import { GenericDeleteService } from './providers/generic-delete-service';
import {
  GenericCreateOptions,
  GenericFindManyOptions,
  GenericFindOptions,
} from './types';
import { Repository } from 'typeorm';

@Injectable()
export class GenericService {
  constructor(
    private readonly genericCreateService: GenericCreateService,
    private readonly genericUpdateService: GenericUpdateService,
    private readonly genericGetService: GenericGetService,
    private readonly genericDeleteService: GenericDeleteService,
  ) {}

  async create<T, V>(
    createGenericModuleDto: V,
    repo: Repository<T>,
    options: GenericCreateOptions = {},
  ): Promise<T> {
    return await this.genericCreateService.create<T, V>(
      createGenericModuleDto,
      repo,
      options,
    );
  }

  async findAll<T>(
    repo: Repository<T>,
    options: GenericFindOptions<T> = {},
  ): Promise<T[]> {
    return await this.genericGetService.getAllBy(repo, options);
  }
  async findAllV2<T>(
    repo: Repository<T>,
    options: GenericFindManyOptions<T> = {},
  ): Promise<T[]> {
    return await this.genericGetService.getMany(repo, options);
  }

  async findOneBy<T>(
    repo: Repository<T>,
    options: GenericFindOptions<T>,
  ): Promise<T> {
    return this.genericGetService.getOneBy<T>(repo, options);
  }
  async findOneByV2<T>(
    repo: Repository<T>,
    options: GenericFindManyOptions<T>,
  ): Promise<T> {
    return this.genericGetService.getOneByV2<T>(repo, options);
  }

  async updateOne<T, V>(
    repo: Repository<T>,
    genericUpdateDto: V,
    findOneByOptions?: GenericFindOptions<T>,
  ): Promise<T> {
    const updatedItem = await this.genericUpdateService.updateOne(
      repo,
      genericUpdateDto,
      findOneByOptions,
    );
    console.log(updatedItem);
    return updatedItem;
  }

  async softDeleteItem<T>(id: number, repo: Repository<T>) {
    return await this.genericDeleteService.softDeleteItem(id, repo);
  }
}
