import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { GenericCreateOptions } from '../types';

@Injectable()
export class GenericCreateService {
  constructor() {}

  async create<T, V>(
    createGenericModuleDto: V,
    repo: Repository<T>,
    options: GenericCreateOptions = {},
  ): Promise<T> {
    try {
      // Apply transformation before saving if provided
      const transformedData = options.transformBeforeSave
        ? options.transformBeforeSave(createGenericModuleDto)
        : createGenericModuleDto;
      // Create entity
      const newEntity = repo.create(transformedData);
      // TO-DO Ramez check this later
      // Save entity
      const saved = await repo.save(newEntity);
      return saved as T;
      // return newEntity;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }
}
