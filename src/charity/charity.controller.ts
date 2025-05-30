import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CreateCharityDto } from './dtos/create-charity.dto';
import { CharityService } from './providers/charity.service';
import { UpdateCharityDto } from './dtos/update-charity.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type-enum';
import { CHARITY_STATUS } from './enums';
import { AdminUpdateCharityDto } from './dtos/admin-update-charity.dto';

@Controller('charity')
export class CharityController {
  constructor(private readonly charityServices: CharityService) {}

  @Get()
  @Auth(AuthType.None)
  getCharity(
    @Query('id') idRaw?: string,
    @Query('email') email?: string,
    @Query('name') name?: string,
  ) {
    const id = idRaw ? parseInt(idRaw, 10) : undefined;
    if (!id && !email && !name)
      throw new BadRequestException(
        'Please specify at least one filter (e.g., id)',
      );
    return this.charityServices.getCharity({
      where: { id, email, name },
      relations: ['events'],
    });
  }

  // we might add some filtering here later
  @Get('all')
  @Auth(AuthType.None)
  getAllCharities(@Query('charityStatus') charityStatus: CHARITY_STATUS) {
    let finalStatus = charityStatus ?? CHARITY_STATUS.ACCEPTED;
    return this.charityServices.getAllCharities({
      relations: ['events'],
      where: { status: finalStatus },
    });
  }

  // @Auth(AuthType.None)
  // @Post()
  // @UseInterceptors(FileInterceptor('file'))
  // createCharity(
  //   @Body() createCharityDto: CreateCharityDto,
  //   @UploadedFile(
  //     new ParseFilePipe({
  //       validators: [
  //         new MaxFileSizeValidator({ maxSize: 3e7 }),
  //         new FileTypeValidator({ fileType: 'image/*' }),
  //       ],
  //     }),
  //   )
  //   file: Express.Multer.File,
  // ) {
  //   return this.charityServices.createCharity(createCharityDto, file);
  // }

  @Auth(AuthType.None)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'docs', maxCount: 5 },
    ]),
  )
  createCharityWithDocs(
    @Body() createCharityDto: CreateCharityDto,
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
      docs?: Express.Multer.File[];
    },
  ) {
    // Validate required fields
    if (!files.image?.length) {
      throw new BadRequestException('At least one image is required.');
    }
    if (!files.docs?.length) {
      throw new BadRequestException('At least one document is required.');
    }

    // Validate file types
    for (const image of files.image) {
      if (!image.mimetype.startsWith('image/')) {
        throw new BadRequestException(
          'Only image files are allowed in "images".',
        );
      }
    }

    for (const doc of files.docs) {
      if (doc.mimetype !== 'application/pdf') {
        throw new BadRequestException('Only PDF files are allowed in "docs".');
      }
    }

    return this.charityServices.createCharity(
      createCharityDto,
      files.image[0],
      files.docs,
    );
  }

  @Patch()
  updateCharity(@Body() updateCharityDto: UpdateCharityDto) {
    return this.charityServices.updateCharity(updateCharityDto);
  }

  @Auth(AuthType.None)
  @Patch('admin-update')
  changeCharityStatus(@Body() bodyDto: AdminUpdateCharityDto) {
    return this.charityServices.updateCharityStatus(bodyDto);
  }

  @Delete('soft/:id')
  deleteCharity(@Param('id', ParseIntPipe) id: number) {
    return this.charityServices.softDeleteCharity(id);
  }
}
