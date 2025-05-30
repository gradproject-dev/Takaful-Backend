import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Donation } from '../donation.entity';
import { Repository } from 'typeorm';
import { CreateDonationDto } from '../dtos/create-donation.dto';
import { UploadsService } from 'src/uploads/providers/uploads.service';
import { GenericService } from 'src/generic-module/generic.service';
import { UsersService } from 'src/users/providers/users.service';
import { DonorService } from 'src/donor/providers/donor.service';

@Injectable()
export class CreateDonationProvider {
  constructor(
    @InjectRepository(Donation)
    private readonly donationRepo: Repository<Donation>,

    private readonly uploadsService: UploadsService,

    private readonly genericService: GenericService,

    private readonly userService: UsersService,

    private readonly donorService: DonorService,
  ) {}

  async createDonation(
    createDonationDto: CreateDonationDto,
    file: Express.Multer.File[],
  ) {
    const imgs = await this.uploadsService.uploadImages(file);

    // ammar
    // const user = createDonationDto.userId
    // ? await this.userService.getUserById(createDonationDto.userId)
    // : null;

    // no need to check the id here
    // cuz we are checking it inside the controller
    const donor = await this.donorService.getDonorById(
      createDonationDto.donorId,
    );

    const data = await this.genericService.create<Donation, CreateDonationDto>(
      {
        ...createDonationDto,
        imgsId: imgs.map((img) => img.name),
        imgsUrl: imgs.map((img) => img.path),
        // we should pass the whole user object and not the id
        // userId: user ? user.id : null, // ❌❌
        donor,
      },
      this.donationRepo,
    );
    return data;
  }
}
