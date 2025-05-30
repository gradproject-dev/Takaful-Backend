import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { DonationService } from './providers/donation.service';
import { CreateDonationDto } from './dtos/create-donation.dto';
import { UpdateDonationDto } from './dtos/update-donation.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type-enum';
import { Like } from 'typeorm';

@Controller('donation')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @Get()
  @Auth(AuthType.None)
  async getDonation(
    @Query('id') idRaw: string,
    // @Query('donorId') donorIdRaw?: string,
  ) {
    const id = idRaw ? parseInt(idRaw, 10) : undefined;
    // const donorId = donorIdRaw ? parseInt(donorIdRaw, 10) : undefined;
    if (!id)
      throw new BadRequestException(
        'Please specify at least one filter (e.g., id)',
      );

    return await this.donationService.getDonation({
      where: { id },
      // where: { id, donor: donorId ? { id: donorId } : undefined },
    });
  }

  // add get donation by donor for mahde
  @Get('all')
  @Auth(AuthType.None)
  async getAllDonations(
    @Query('categoryId') categoryIdRaw?: string,
    @Query('donorId') donorIdRaw?: string,
  ) {
    const donorId = donorIdRaw ? parseInt(donorIdRaw, 10) : undefined;
    const categoryId = categoryIdRaw ? parseInt(categoryIdRaw, 10) : undefined;

    const whereClause: any = {};

    if (donorId) {
      whereClause.donor = { id: donorId };
    }

    if (categoryId) {
      whereClause.categoryId = categoryId;
    }

    return await this.donationService.getAllDonations({
      where: whereClause,
    });
  }

  @Auth(AuthType.None)
  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async createDonation(
    @Body() createDonationDto: CreateDonationDto,
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addValidator(new MaxFileSizeValidator({ maxSize: 3e7 }))
        .addValidator(new FileTypeValidator({ fileType: 'image/*' }))
        .build({ fileIsRequired: true }),
    )
    files: Express.Multer.File[],
  ) {
    return await this.donationService.createDonation(createDonationDto, files);
  }

  @Patch()
  async updateDonation(@Body() updateDonationDto: UpdateDonationDto) {
    return await this.donationService.updateDonation(updateDonationDto);
  }

  @Delete('soft/:id')
  async deleteDonation(@Param('id', ParseIntPipe) id: number) {
    return await this.donationService.softDeleteDonation(id);
  }
}
