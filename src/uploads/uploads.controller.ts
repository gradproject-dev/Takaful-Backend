import {
  Controller,
  Delete,
  FileTypeValidator,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './providers/uploads.service';

// @Auth(AuthType.None)
@Controller('uploads')
export class UploadsController {
  constructor(
    /**
     * inject uploadsService
     */
    private readonly uploadsService: UploadsService,
  ) {}

  // File is the field name
  // @UseInterceptors(FileInterceptor('file'))
  // @Post('file')
  // public uploadFile(
  //   @UploadedFile(
  //     new ParseFilePipe({
  //       validators: [
  //         new MaxFileSizeValidator({ maxSize: 3e7 }),
  //         new FileTypeValidator({
  //           fileType: /^(image\/jpeg|image\/jpg|image\/png|image\/heic)$/, // Accepts jpg, jpeg, png, and heic
  //         }),
  //       ],
  //     }),
  //   )
  //   file: Express.Multer.File,
  // ) {
  //   return this.uploadsService.uploadFile(file);
  // }

  @Delete('file/:id')
  @HttpCode(HttpStatus.OK)
  public deleteFile(@Param('id') id: string) {
    return this.uploadsService.deleteFile(id);
  }

  // @Delete('file/deleteBefore30')
  // public deletes() {
  //   return this.uploadsService.deleteBefore30Days();
  // }
}
