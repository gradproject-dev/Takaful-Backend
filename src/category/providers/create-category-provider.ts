import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../category.entity';
import { Repository } from 'typeorm';
import { GenericService } from 'src/generic-module/generic.service';
import { CreateCategoryDto } from '../dtos/create-category.dto';

@Injectable()
export class CreateCategoryProvider {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    private readonly genericService: GenericService,
  ) {}

  createCategory(dto: CreateCategoryDto) {
    return this.genericService.create<Category, CreateCategoryDto>(
      dto,
      this.categoryRepo,
    );
  }
}
