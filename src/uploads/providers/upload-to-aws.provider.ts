import * as path from 'path';

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { UploadFile } from '../interfaces/upload-file.interface';
import { fileTypes } from '../enums/file-type.enum';
import { CompressFilesProvider } from './compress-files.provider';
import { createItemOptions } from '../types';
@Injectable()
export class UploadToAwsProvider {
  constructor(
    private readonly configService: ConfigService,
    private readonly compressFileProvider: CompressFilesProvider,
  ) {}

  private readonly s3Client = new S3Client({
    credentials: {
      accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
    },
    region: this.configService.getOrThrow('AWS_REGION'),
  });

  /**
   * Upload and compress image to AWS S3
   */
  public async uploadImage(
    file: Express.Multer.File,
    options?: createItemOptions,
  ) {
    const compressedFileBuffer =
      await this.compressFileProvider.compressAndConvert(file);

    const fileName = this.generateFileName(file);

    // if (
    //   ![
    //     'image/gif',
    //     'image/jpeg',
    //     'image/jpg',
    //     'image/png',
    //     'image/heic',
    //   ].includes(file.mimetype.toLocaleLowerCase())
    // ) {
    //   throw new BadRequestException('MIME type not supported');
    // }

    return this.uploadToS3(
      fileName,
      options?.compress ? compressedFileBuffer : file.buffer,
      `${options?.compress ? 'webp' : file.mimetype}`,
      file.size,
      fileTypes.IMAGE,
    );
  }

  /**
   * Upload document file to AWS S3 (e.g., PDF, DOCX)
   */
  public async uploadDocs(file: Express.Multer.File) {
    const fileName = this.generateFileName(file);

    if (
      ![
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ].includes(file.mimetype.toLocaleLowerCase())
    ) {
      throw new BadRequestException('Unsupported document type');
    }

    return this.uploadToS3(
      fileName,
      file.buffer,
      file.mimetype,
      file.size,
      fileTypes.DOCUMENT,
    );
  }

  private async uploadToS3(
    fileName: string,
    buffer: Buffer,
    mime: string,
    size: number,
    type: fileTypes,
  ): Promise<UploadFile> {
    try {
      const bucketName = this.configService.getOrThrow<string>(
        'AWS_PUBLIC_BUCKET_NAME',
      );
      const region = this.configService.getOrThrow<string>('AWS_REGION');

      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: fileName,
          Body: buffer,
          ContentType: mime,
        }),
      );

      const fileUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`;

      return {
        name: fileName,
        path: fileUrl,
        type,
        mime,
        size,
      };
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException(err);
    }
  }

  private generateFileName(file: Express.Multer.File) {
    let name = file.originalname.split('.')[0].replace(/\s/g, '').trim();
    let extension = path.extname(file.originalname);
    let timeStamp = new Date().getTime().toString().trim();
    return `${name}-${timeStamp}-${uuidv4()}${extension}`;
  }
}
