import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { GenericFindManyOptions, GenericFindOptions } from '../types';

@Injectable()
export class GenericGetService {
  async getOneBy<T>(
    repo: Repository<T>,
    options: GenericFindOptions<T>,
  ): Promise<T> {
    try {
      const data = await repo.findOneBy(options);
      if (!data)
        throw new Error(`Item with ${JSON.stringify(options)} not Found`);
      return data;
    } catch (error) {
      console.log(`error occured ${error}`);
      throw new NotFoundException(error.message);
    }
  }

  async getOneByV2<T>(
    repo: Repository<T>,
    options: GenericFindManyOptions<T>,
  ): Promise<T> {
    try {
      const data = await repo.find(options);
      if (!data)
        throw new Error(`Item with ${JSON.stringify(options)} not Found`);
      if (data.length === 0)
        throw new NotFoundException(
          `can't find item with ${JSON.stringify(options.where)}`,
        );
      return data[0];
    } catch (error) {
      console.log(`error occured ${error}`);
      throw new NotFoundException(error.message);
    }
  }

  async getMany<T>(
    repo: Repository<T>,
    options: GenericFindManyOptions<T>,
  ): Promise<T[]> {
    try {
      const data = await repo.find(options);
      if (!data)
        throw new Error(`Item with ${JSON.stringify(options)} not Found`);
      return data;
    } catch (error) {
      console.log(`error occured ${error}`);
      throw new NotFoundException(error.message);
    }
  }

  async getAllBy<T>(
    repo: Repository<T>,
    options: GenericFindOptions<T>,
  ): Promise<T[]> {
    try {
      const data = await repo.findBy(options);
      return data;
    } catch (error) {
      console.log(`error occured ${error}`);
      throw new NotFoundException(error.message);
    }
  }
}
