import { Injectable } from '@nestjs/common';
import {
  GenericFindManyOptions,
  GenericFindOptions,
} from 'src/generic-module/types';
import { CreateEventDto } from '../dtos/create-event.dto';
import { UpdateEventDto } from '../dtos/update-event.dto';
import { EventEntity } from '../event.entity';
import { CreateEventProvider } from './create-event.provider';
import { GetEventProvider } from './get-event.provider';
import { UpdateEventProvider } from './update-event.provider';
import { DeleteEventProvider } from './delete-event.provider';

@Injectable()
export class EventService {
  constructor(
    private readonly createEventProvider: CreateEventProvider,
    private readonly getEventProvider: GetEventProvider,
    private readonly updateEventProvider: UpdateEventProvider,
    private readonly deleteEventProvider: DeleteEventProvider,
  ) {}

  public createEvent(
    createEventDto: CreateEventDto,
    files: Express.Multer.File[],
  ) {
    return this.createEventProvider.createEvent(createEventDto, files);
  }

  public getEventById(id: number) {
    return this.getEventProvider.getEventById(id);
  }

  public getEvent(options: GenericFindManyOptions<EventEntity>) {
    return this.getEventProvider.getEvent(options);
  }

  public getAllEvents(options: GenericFindManyOptions<EventEntity> = {}) {
    return this.getEventProvider.getAllEvents(options);
  }

  public updateEvent(updateEventDto: UpdateEventDto) {
    return this.updateEventProvider.updateEvent(updateEventDto);
  }

  public softDeleteEvent(id: number) {
    return this.deleteEventProvider.softDeleteItem(id);
  }
}
