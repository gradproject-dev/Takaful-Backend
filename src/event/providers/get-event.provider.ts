import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from '../event.entity';
import { Repository } from 'typeorm';
import { GenericService } from 'src/generic-module/generic.service';
import {
  GenericFindManyOptions,
  GenericFindOptions,
} from 'src/generic-module/types';

@Injectable()
export class GetEventProvider {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepo: Repository<EventEntity>,
    private readonly genericService: GenericService,
  ) {}

  getEvent(options: GenericFindManyOptions<EventEntity>) {
    return this.genericService.findOneByV2<EventEntity>(
      this.eventRepo,
      options,
    );
  }

  getAllEvents(options: GenericFindManyOptions<EventEntity>) {
    return this.genericService.findAllV2<EventEntity>(this.eventRepo, options);
  }

  getEventById(id: number) {
    return this.genericService.findOneByV2<EventEntity>(this.eventRepo, {
      where: { id },
    });
  }
}
