import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CategoryService } from './providers/category.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type-enum';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @Auth(AuthType.None)
  async getCategory(@Query('id') idRaw?: string) {
    const id = idRaw ? parseInt(idRaw, 10) : undefined;
    if (!id)
      throw new BadRequestException('Please specify an id to fetch category');
    return await this.categoryService.getCategoryById(id);
  }

  @Get('all')
  @Auth(AuthType.None)
  async getAllCategories() {
    return await this.categoryService.getAllCategories();
  }

  @Post()
  @Auth(AuthType.None)
  async createCategory(@Body() dto: CreateCategoryDto) {
    return await this.categoryService.createCategory(dto);
  }

  @Patch()
  async updateCategory(@Body() dto: UpdateCategoryDto) {
    return await this.categoryService.updateCategory(dto);
  }

  @Delete('soft/:id')
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return await this.categoryService.softDeleteCategory(id);
  }
}
