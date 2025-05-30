import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from '../event.entity';
import { Repository } from 'typeorm';
import { UpdateEventDto } from '../dtos/update-event.dto';
import { GenericService } from 'src/generic-module/generic.service';

@Injectable()
export class UpdateEventProvider {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepo: Repository<EventEntity>,
    private readonly genericService: GenericService,
  ) {}

  updateEvent(updateEventDto: UpdateEventDto) {
    return this.genericService.updateOne<EventEntity, UpdateEventDto>(
      this.eventRepo,
      updateEventDto,
    );
  }
}
