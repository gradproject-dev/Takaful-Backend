import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from '../event.entity';
import { GenericService } from 'src/generic-module/generic.service';

@Injectable()
export class DeleteEventProvider {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepo: Repository<EventEntity>,
    private readonly genericService: GenericService,
  ) {}

  softDeleteItem(id: number) {
    return this.genericService.softDeleteItem<EventEntity>(id, this.eventRepo);
  }
}
