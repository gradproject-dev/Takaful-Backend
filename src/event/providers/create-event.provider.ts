import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from '../event.entity';
import { Repository } from 'typeorm';
import { GenericService } from 'src/generic-module/generic.service';
import { UploadsService } from 'src/uploads/providers/uploads.service';
import { CreateEventDto } from '../dtos/create-event.dto';
import { CharityService } from 'src/charity/providers/charity.service';

@Injectable()
export class CreateEventProvider {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepo: Repository<EventEntity>,

    private readonly uploadsService: UploadsService,

    private readonly genericService: GenericService,

    private readonly charityService: CharityService,
  ) {}

  async createEvent(
    createEventDto: CreateEventDto,
    files: Express.Multer.File[],
  ) {
    // maybe get the charity before?
    const charity = await this.charityService.getCharityById(
      createEventDto.charityId,
    );

    const uploaded = await this.uploadsService.uploadImages(files);
    const imgsId = uploaded.map((file) => file.name);
    const imgsUrl = uploaded.map((file) => file.path);

    return this.genericService.create<EventEntity, CreateEventDto>(
      { ...createEventDto, imgsId, imgsUrl, charity },
      this.eventRepo,
    );
  }
}
