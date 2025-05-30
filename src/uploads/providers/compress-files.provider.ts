import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as sharp from 'sharp';

@Injectable()
export class CompressFilesProvider {
  public async compressAndConvert(file: Express.Multer.File, quality?: number) {
    let compressedImageBuffer: null | Buffer = null;
    try {
      compressedImageBuffer = await sharp(file.buffer)
        .resize({ width: 800 }) // Resize the image (adjust size as needed)
        .webp({ quality: quality ?? 90 }) // Convert to WebP with 80% quality
        .toBuffer();
    } catch (error) {
      throw new UnauthorizedException(error);
    }

    if (!compressedImageBuffer) throw new UnauthorizedException();
    return compressedImageBuffer;
  }
}
