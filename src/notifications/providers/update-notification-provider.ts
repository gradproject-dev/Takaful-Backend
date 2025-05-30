import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../notification.entity';
import { UpdateNotificationDto } from '../dtos/update-notification.dto';
import { GenericService } from 'src/generic-module/generic.service';

@Injectable()
export class UpdateNotificationProvider {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,

    private readonly genericService: GenericService,
  ) {}

  async update(id: number, dto: UpdateNotificationDto) {
    return await this.genericService.updateOne<
      Notification,
      UpdateNotificationDto
    >(this.notificationRepo, dto);
  }
}
