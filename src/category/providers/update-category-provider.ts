import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../category.entity';
import { Repository } from 'typeorm';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { GenericService } from 'src/generic-module/generic.service';

@Injectable()
export class UpdateCategoryProvider {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    private readonly genericService: GenericService,
  ) {}

  updateCategory(updateCategoryDto: UpdateCategoryDto) {
    return this.genericService.updateOne<Category, UpdateCategoryDto>(
      this.categoryRepo,
      updateCategoryDto,
      { id: updateCategoryDto.id },
    );
  }
}
