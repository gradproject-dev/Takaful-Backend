import { PartialType } from '@nestjs/mapped-types';
import { CreateGenericModuleDto } from './create-generic-module.dto';

export class UpdateGenericModuleDto extends PartialType(CreateGenericModuleDto) {}
