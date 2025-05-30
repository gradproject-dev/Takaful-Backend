import { Module, forwardRef } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './providers/uploads.service';
import { UploadToAwsProvider } from './providers/upload-to-aws.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Upload } from './upload.entity';
import { CompressFilesProvider } from './providers/compress-files.provider';
import { DeleteFileProvider } from './providers/delete-file.provider';
import { GetFileProvider } from './providers/get-file.provider.ts';
import { GenericModule } from 'src/generic-module/generic.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Upload]),
    forwardRef(() => GenericModule),
  ],
  controllers: [UploadsController],
  providers: [
    UploadsService,
    UploadToAwsProvider,
    CompressFilesProvider,
    DeleteFileProvider,
    GetFileProvider,
  ],
  exports: [UploadsService],
})
export class UploadsModule {}
