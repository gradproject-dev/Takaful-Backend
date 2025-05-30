import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { Category } from './category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './providers/category.service';
import { CreateCategoryProvider } from './providers/create-category-provider';
import { UpdateCategoryProvider } from './providers/update-category-provider';
import { DeleteCategoryProvider } from './providers/delete-category-provider';
import { GetCategoryProvider } from './providers/get-category-provider';
import { GenericModule } from 'src/generic-module/generic.module';
import { UploadsModule } from 'src/uploads/uploads.module';

@Module({
  controllers: [CategoryController],
  providers: [
    CategoryService,
    CreateCategoryProvider,
    UpdateCategoryProvider,
    DeleteCategoryProvider,
    GetCategoryProvider,
  ],
  imports: [TypeOrmModule.forFeature([Category]), GenericModule, UploadsModule],
})
export class CategoryModule {}
