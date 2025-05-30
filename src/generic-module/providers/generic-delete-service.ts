import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class GenericDeleteService {
  public async deleteById<T>(id: number, repo: Repository<T>) {
    try {
      await repo.delete({});
    } catch (error) {}
  }

  public async softDeleteItem<T>(id: number, repo: Repository<T>) {
    let deletedItem: null | DeleteResult = null;
    try {
      deletedItem = await repo.softDelete(id);
      if (!deletedItem.affected) {
        throw new NotFoundException(`Item with ID ${id} not found`);
      }
    } catch (error) {
      throw new UnauthorizedException(error);
    }
    if (!deletedItem) {
      throw new InternalServerErrorException(
        'An error occurred while deleting the item',
      );
    }
    return deletedItem;
  }
}
