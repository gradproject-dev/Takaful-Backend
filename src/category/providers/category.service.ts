import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { CreateCategoryProvider } from './create-category-provider';
import { GetCategoryProvider } from './get-category-provider';
import { DeleteCategoryProvider } from './delete-category-provider';
import { UpdateCategoryProvider } from './update-category-provider';

@Injectable()
export class CategoryService {
  constructor(
    private readonly createCategoryProvider: CreateCategoryProvider,
    private readonly getCategoryProvider: GetCategoryProvider,
    private readonly updateCategoryProvider: UpdateCategoryProvider,
    private readonly deleteCategoryProvider: DeleteCategoryProvider,
  ) {}

  createCategory(dto: CreateCategoryDto) {
    return this.createCategoryProvider.createCategory(dto);
  }

  getCategoryById(id: number) {
    return this.getCategoryProvider.getCategoryById(id);
  }

  getAllCategories() {
    return this.getCategoryProvider.getAllCategories();
  }

  updateCategory(dto: UpdateCategoryDto) {
    return this.updateCategoryProvider.updateCategory(dto);
  }

  softDeleteCategory(id: number) {
    return this.deleteCategoryProvider.softDeleteCategory(id);
  }
}
