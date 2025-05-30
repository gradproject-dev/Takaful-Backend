import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../notification.entity';
import { CreateNotificationDto } from '../dtos/create-notification.dto';
import Expo from 'expo-server-sdk';
import { DonorService } from 'src/donor/providers/donor.service';
import { CharityService } from 'src/charity/providers/charity.service';
import { GenericService } from 'src/generic-module/generic.service';
import { UsersService } from 'src/users/providers/users.service';
@Injectable()
export class CreateNotificationProvider {
  private static expo: Expo;
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
    private readonly donorService: DonorService,
    private readonly charityService: CharityService,
    private readonly genericService: GenericService,
    private readonly userService: UsersService,
  ) {
    // Singleton
    if (!CreateNotificationProvider.expo)
      CreateNotificationProvider.expo = new Expo();
  }

  async createNotification(dto: CreateNotificationDto) {
    const { message, recieverId, senderId } = dto;
    // const donor = await this.donorService.getDonorById(donorId);
    const recipientExpoPushToken =
      await this.userService.getUserExpoToken(recieverId);
    const sender = await this.userService.getUserById(senderId);
    const reciever = await this.userService.getUserById(recieverId);
    // const recipientExpoPushToken = 'ExponentPushToken[hroZeHIuDkXfjAyFtO2gT2]';
    // const charity = await this.charityService.getCharityById(charityId);
    const notification = await this.genericService.create<
      Notification,
      CreateNotificationDto
    >(
      {
        ...dto,
        message,
        sender,
        reciever,
        recipientExpoPushToken,
      },
      this.notificationRepo,
    );

    // // Send real-time push notification
    try {
      await this.sendPushNotification(message, recipientExpoPushToken);
    } catch (error) {
      console.log(error);
    }
    return notification;
  }

  private async sendPushNotification(message: string, token: string) {
    if (!Expo.isExpoPushToken(token)) return;
    try {
      await CreateNotificationProvider.expo.sendPushNotificationsAsync([
        {
          to: token,
          sound: 'default',
          body: message,
          data: { message },
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  }
}
