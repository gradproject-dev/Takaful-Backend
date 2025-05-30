// update-category.dto.ts
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  name?: string;
}
