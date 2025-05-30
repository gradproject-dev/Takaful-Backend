import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { DonorService } from './providers/donor.service';
import { CreateDonorDto } from './dtos/create-donor.dto';
import { UpdateDonorDto } from './dtos/update-donor.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type-enum';

@Controller('donors')
export class DonorController {
  constructor(private readonly donorService: DonorService) {}

  @Auth(AuthType.None)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  createDonor(
    @Body() createDonorDto: CreateDonorDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new MaxFileSizeValidator({ maxSize: 3e7 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.donorService.createDonor(createDonorDto, file);
  }

  @Get(':id')
  getDonorById(@Param('id') id: number) {
    return this.donorService.getDonorById(id);
  }

  @Auth(AuthType.None)
  @Get()
  getAllDonors() {
    return this.donorService.getAllDonors();
  }

  @Put()
  updateDonor(@Body() updateDonorDto: UpdateDonorDto) {
    return this.donorService.updateDonor(updateDonorDto);
  }

  @Delete(':id')
  softDeleteDonor(@Param('id') id: number) {
    return this.donorService.softDeleteDonor(id);
  }
}
