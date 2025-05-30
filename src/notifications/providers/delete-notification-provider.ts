import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../notification.entity';
import { GenericService } from 'src/generic-module/generic.service';

@Injectable()
export class DeleteNotificationProvider {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,

    private readonly genericService: GenericService,
  ) {}

  async delete(id: number) {
    // maybe check if it is there before trying to delete
    return await this.genericService.softDeleteItem(id, this.notificationRepo);
    // const notification = await this.notificationRepo.findOneBy({ id });
    // if (!notification) throw new NotFoundException('Notification not found');
    // return await this.notificationRepo.remove(notification);
  }
}
