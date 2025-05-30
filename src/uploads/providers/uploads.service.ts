import { Injectable } from '@nestjs/common';
import { UploadFile } from '../interfaces/upload-file.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Upload } from '../upload.entity';
import { Repository } from 'typeorm';
import { UploadToAwsProvider } from './upload-to-aws.provider';
import { DeleteFileProvider } from './delete-file.provider';
import { GetFileProvider } from './get-file.provider.ts';
import { GenericFindOptions } from 'src/generic-module/types';
import { createItemOptions } from '../types';
@Injectable()
export class UploadsService {
  constructor(
    /**
     * Inject uploadToAwsProvider
     */
    private readonly uploadToAwsProvider: UploadToAwsProvider,

    private readonly getFileProvider: GetFileProvider,
    /**
     * inject configService
     */
    // private readonly configService: ConfigService,
    /**
     * inject uploadsRepository
     */
    @InjectRepository(Upload)
    private uploadsRepository: Repository<Upload>,

    private readonly deleteFileProvider: DeleteFileProvider,
  ) {}

  public async uploadImage(
    file: Express.Multer.File,
    options?: createItemOptions,
  ) {
    const fileToUpload: UploadFile = await this.uploadToAwsProvider.uploadImage(
      file,
      options,
    );
    // await this.uploadsRepository.create(fileToUpload);
    await this.uploadsRepository.save({
      ...fileToUpload,
    });
    return fileToUpload;
  }

  public async uploadImages(
    files: Express.Multer.File[],
    options?: createItemOptions,
  ) {
    const filesToUpload: UploadFile[] = await Promise.all(
      files.map((file) =>
        this.uploadToAwsProvider.uploadImage(file, {
          ...options,
          // change this later
          compress: true,
        }),
      ),
    );

    // await this.uploadsRepository.create(fileToUpload);
    await Promise.all(
      filesToUpload.map((file) =>
        this.uploadsRepository.save({
          ...file,
        }),
      ),
    );
    return filesToUpload;
  }

  public async deleteFile(id: string) {
    return await this.deleteFileProvider.deleteFile(id);
  }

  public async deleteFiles(options: GenericFindOptions<Upload>) {
    // return await this.deleteFileProvider.
  }

  public async getFiles(options: GenericFindOptions<Upload>) {
    return await this.getFileProvider.getFiles(options);
  }

  public async uploadDocument(file: Express.Multer.File) {
    const fileToUpload: UploadFile =
      await this.uploadToAwsProvider.uploadDocs(file);
    await this.uploadsRepository.save({ ...fileToUpload });
    return fileToUpload;
  }

  public async uploadDocuments(files: Express.Multer.File[]) {
    const filesToUpload: UploadFile[] = await Promise.all(
      files.map((file) => this.uploadToAwsProvider.uploadDocs(file)),
    );

    await Promise.all(
      filesToUpload.map((file) => this.uploadsRepository.save({ ...file })),
    );

    return filesToUpload;
  }

  // public async deleteBefore30Days() {
  //   return await this.deleteFileProvider.deleteAllFilesBefore30Days();
  // }
}
