import { FindManyOptions, FindOptionsWhere } from 'typeorm';

export type GenericCreateOptions = {
  validate?: boolean;
  // relations?: string[];

  // use if u wanted to mutate data before saving it
  // like hashing the password and etc
  transformBeforeSave?: (...args: any[]) => any;
};

// nothing to add to this type until now
export type GenericUpdateOptions<T> =
  | FindOptionsWhere<T>
  | FindOptionsWhere<T>[];

export type GenericFindOptions<T> = FindOptionsWhere<T> | FindOptionsWhere<T>[];
export type GenericFindManyOptions<T> = FindManyOptions<T>;
