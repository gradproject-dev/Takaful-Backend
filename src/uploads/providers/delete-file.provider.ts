import {
  DeleteObjectCommand,
  DeleteObjectsCommand,
  HeadObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UploadsService } from './uploads.service';
import { LessThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Upload } from '../upload.entity';
import { GenericService } from 'src/generic-module/generic.service';

@Injectable()
export class DeleteFileProvider {
  constructor(
    private readonly configService: ConfigService,

    @Inject(forwardRef(() => UploadsService))
    private readonly uploadsService: UploadsService,

    @Inject(forwardRef(() => GenericService))
    private readonly genericService: GenericService,

    @InjectRepository(Upload)
    private readonly uploadRepo: Repository<Upload>,
  ) {}

  private readonly s3Client = new S3Client({
    credentials: {
      accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
    },
    region: this.configService.getOrThrow('AWS_REGION'),
  });

  public async deleteFile(id: string) {
    try {
      // Check if the file exists
      await this.s3Client.send(
        new HeadObjectCommand({
          Bucket: this.configService.get<string>('AWS_PUBLIC_BUCKET_NAME'),
          Key: id,
        }),
      );
      // If the file exists, proceed with deletion
      const response = await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.configService.get<string>('AWS_PUBLIC_BUCKET_NAME'),
          Key: id,
        }),
      );
      return { success: true, message: 'File deleted successfully' };
    } catch (error) {
      if (error.name === 'NoSuchKey') {
        throw new NotFoundException(`File with id ${id} does not exist`);
      } else {
        throw new UnauthorizedException(error);
      }
    }
  }

  // // this one removes the uploads from the table
  // public async softDeleteUploads(ids: number[]) {
  //   // return this.genericService.softDeleteItems(ids, this.uploadRepo);
  //   return this.genericService.softDeleteItem(ids, this.uploadRepo);
  // }

  // this one deletes the files from the s3 and call the softDeleteUploads after that
  // public async deleteAllFilesBefore30Days() {
  //   try {
  //     // Get the date 30 days ago
  //     const thirtyDaysAgo = new Date();
  //     thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  //     // Fetch files from the uploads table that are older than 30 days
  //     const files = await this.uploadsService.getFiles({
  //       where: { Customized: false, createDate: LessThan(thirtyDaysAgo) },
  //     });

  //     // Check if there are files to delete
  //     if (files.length === 0) {
  //       return { success: true, message: 'No old files to delete' };
  //     }

  //     // Prepare the keys for deletion
  //     const objectsToDelete = files.map((file) => ({
  //       Key: file.name, // Replace `s3Key` with the actual field name for the S3 file key
  //     }));

  //     // Batch delete files from S3
  //     const response = await this.s3Client.send(
  //       new DeleteObjectsCommand({
  //         Bucket: this.configService.get<string>('AWS_PUBLIC_BUCKET_NAME'),
  //         Delete: {
  //           Objects: objectsToDelete,
  //           Quiet: false, // Set to true if you don't want a response for each deleted object
  //         },
  //       }),
  //     );

  //     // Log deleted files
  //     // console.log(`Deleted ${response.Deleted?.length} files successfully.`);

  //     // now delete them from the table
  //     await this.softDeleteUploads(files.map((file) => file.id));

  //     return {
  //       success: true,
  //       message: `${response.Deleted?.length} old files deleted successfully`,
  //     };
  //   } catch (error) {
  //     console.error('Error deleting files:', error);
  //     throw new UnauthorizedException('Failed to delete old files');
  //   }
  // }
}
