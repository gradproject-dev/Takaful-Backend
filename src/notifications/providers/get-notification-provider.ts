import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../notification.entity';
import { GenericService } from 'src/generic-module/generic.service';

@Injectable()
export class GetNotificationProvider {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,

    private readonly genericSerivce: GenericService,
  ) {}

  async getAll() {
    return await this.genericSerivce.findAllV2<Notification>(
      this.notificationRepo,
      {
        relations: ['donor', 'charity'],
        order: { createdAt: 'DESC' },
      },
    );
    // return await  this.notificationRepo.find({
    //   relations: ['donor', 'charity'],
    //   order: { createdAt: 'DESC' },
    // });
  }

  async getById(id: number) {
    return await this.genericSerivce.findOneByV2<Notification>(
      this.notificationRepo,
      {
        where: { id },
        relations: ['donor', 'charity'],
      },
    );
    // return await  this.notificationRepo.findOne({
    //   where: { id },
    //   relations: ['donor', 'charity'],
    // });
  }

  // async getByDonorId(donorId: number) {
  //   return await this.genericSerivce.findOneByV2<Notification>(
  //     this.notificationRepo,
  //     {
  //       where: { donor: { id: donorId } },
  //       order: { createdAt: 'DESC' },
  //     },
  //   );
  //   // return await  this.notificationRepo.find({
  //   //   where: { donor: { id: donorId } },
  //   //   order: { createdAt: 'DESC' },
  //   // });
  // }

  // async getByCharityId(charityId: number) {
  //   return await this.genericSerivce.findOneByV2<Notification>(
  //     this.notificationRepo,
  //     {
  //       where: { charity: { id: charityId } },
  //       order: { createdAt: 'DESC' },
  //     },
  //   );
  //   // return await  this.notificationRepo.find({
  //   //   where: { charity: { id: charityId } },
  //   //   order: { createdAt: 'DESC' },
  //   // });
  // }
}
