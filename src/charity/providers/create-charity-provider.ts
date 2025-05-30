import { Injectable } from '@nestjs/common';
import { CreateCharityDto } from '../dtos/create-charity.dto';
import { Repository } from 'typeorm';
import { Charity } from '../charity.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from 'src/generic-module/generic.service';
import { UploadsService } from 'src/uploads/providers/uploads.service';
import { UsersService } from 'src/users/providers/users.service';
import { ROLES } from 'src/users/types';

@Injectable()
export class CreateCharityProvider {
  constructor(
    @InjectRepository(Charity)
    private readonly charityRepo: Repository<Charity>,

    private readonly genericService: GenericService,

    private readonly uploadsService: UploadsService,

    private readonly userService: UsersService,

    // for Ammar
    // private readonly usersService: UserService,
  ) {}

  // async createCharity(
  //   createCharityDto: CreateCharityDto,
  //   file: Express.Multer.File,
  // ) {
  //   // create the image
  //   const img = await this.uploadsService.uploadFile(file);
  //   // create the user
  //   const user = await this.userService.createUser({
  //     email: createCharityDto.email,
  //     password: createCharityDto.password,
  //     role: ROLES.CHARITY,
  //   });

  //   return await this.genericService.create<Charity, CreateCharityDto>(
  //     { ...createCharityDto, imgId: img.name, imgUrl: img.path, user },
  //     this.charityRepo,
  //   );
  // }
  async createCharity(
    createCharityDto: CreateCharityDto,
    imageFile: Express.Multer.File,
    docFiles: Express.Multer.File[],
  ) {
    const img = await this.uploadsService.uploadImage(imageFile);

    const uploadedDocs = await Promise.all(
      docFiles.map((doc) => this.uploadsService.uploadDocument(doc)),
    );

    const user = await this.userService.createUser({
      email: createCharityDto.email,
      password: createCharityDto.password,
      role: ROLES.CHARITY,
    });

    console.log(img);
    console.log(uploadedDocs);
    return await this.genericService.create<Charity, any>(
      {
        ...createCharityDto,
        imgId: img.name,
        imgUrl: img.path,
        docsId: uploadedDocs.map((d) => d.name),
        docsUrl: uploadedDocs.map((d) => d.path),
        user,
      },
      this.charityRepo,
    );
  }
}

// this should be moved to a sperate file
// const addImageToDto = <T>(
//   oldDto: T,
//   { name: imgId, path: imgUrl }: UploadFile,
// ) =>
//   ({
//     ...oldDto,
//     imgId,
//     imgUrl,
//   }) as T;
