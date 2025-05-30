import { FindManyOptions } from 'typeorm';

export function isFindManyOptions<T>(obj: any): obj is FindManyOptions<T> {
  return (
    typeof obj === 'object' &&
    ('take' in obj || 'skip' in obj || 'relations' in obj)
  );
}
