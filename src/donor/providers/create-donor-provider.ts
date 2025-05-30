import { Injectable } from '@nestjs/common';
import { CreateDonorDto } from '../dtos/create-donor.dto';
import { Repository } from 'typeorm';
import { Donor } from '../donor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from 'src/generic-module/generic.service';
import { UploadsService } from 'src/uploads/providers/uploads.service';
import { UsersService } from 'src/users/providers/users.service';
import { ROLES } from 'src/users/types';
import { UploadFile } from 'src/uploads/interfaces/upload-file.interface';

@Injectable()
export class CreateDonorProvider {
  constructor(
    @InjectRepository(Donor)
    private readonly donorRepo: Repository<Donor>,

    private readonly genericService: GenericService,
    private readonly uploadsService: UploadsService,

    private readonly userService: UsersService,
  ) {}

  async createDonor(
    createDonorDto: CreateDonorDto,
    file?: Express.Multer.File,
  ) {
    // create the image
    let img: UploadFile;
    if (file) img = await this.uploadsService.uploadImage(file);
    // create the user
    const user = await this.userService.createUser({
      email: createDonorDto.email,
      password: createDonorDto.password,
      role: ROLES.DONOR,
    });
    const donor = await this.genericService.create<Donor, CreateDonorDto>(
      { ...createDonorDto, imgId: img?.name, imgUrl: img?.path, user },
      this.donorRepo,
    );
    console.log(donor);
    return donor;
  }
}
