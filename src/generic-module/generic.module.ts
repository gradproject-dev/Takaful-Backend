import { Module } from '@nestjs/common';
import { GenericService } from './generic.service';
import { GenericCreateService } from './providers/generic-create-service';
import { GenericUpdateService } from './providers/generic-update-service';
import { GenericDeleteService } from './providers/generic-delete-service';
import { GenericGetService } from './providers/generic-get-service';
import { UploadsModule } from 'src/uploads/uploads.module';

@Module({
  providers: [
    GenericService,
    GenericCreateService,
    GenericUpdateService,
    GenericDeleteService,
    GenericGetService,
  ],
  exports: [GenericService],
  imports: [UploadsModule],
})
export class GenericModule {}
