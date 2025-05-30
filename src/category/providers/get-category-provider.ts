import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../category.entity';
import { GenericService } from 'src/generic-module/generic.service';

@Injectable()
export class GetCategoryProvider {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    private readonly genericService: GenericService,
  ) {}

  getCategoryById(id: number) {
    return this.genericService.findOneBy<Category>(this.categoryRepo, { id });
  }

  getAllCategories() {
    return this.genericService.findAll<Category>(this.categoryRepo, {});
  }
}
