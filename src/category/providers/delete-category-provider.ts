import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../category.entity';
import { Repository } from 'typeorm';
import { GenericService } from 'src/generic-module/generic.service';

@Injectable()
export class DeleteCategoryProvider {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    private readonly genericService: GenericService,
  ) {}

  softDeleteCategory(id: number) {
    return this.genericService.softDeleteItem(id, this.categoryRepo);
  }
}
