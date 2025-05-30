import { Module } from '@nestjs/common';
import { DeleteNotificationProvider } from './providers/delete-notification-provider';
import { GetNotificationProvider } from './providers/get-notification-provider';
import { UpdateNotificationProvider } from './providers/update-notification-provider';
import { CreateNotificationProvider } from './providers/create-notification-provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { NotificationController } from './notifications.controller';
import { NotificationService } from './providers/notifications.service';
import { CharityModule } from 'src/charity/charity.module';
import { DonorModule } from 'src/donor/donor.module';
import { GenericService } from 'src/generic-module/generic.service';
import { GenericModule } from 'src/generic-module/generic.module';
import { SaveExpoTokenProvider } from './providers/save-expo-token-provider';
import { UsersModule } from 'src/users/users.module';
import { SendNotificationProvider } from './providers/send-notification-provider';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),
    CharityModule,
    DonorModule,
    GenericModule,
    UsersModule,
  ],
  providers: [
    DeleteNotificationProvider,
    GetNotificationProvider,
    UpdateNotificationProvider,
    CreateNotificationProvider,
    NotificationService,
    SaveExpoTokenProvider,
    SendNotificationProvider,
  ],
  controllers: [NotificationController],
})
export class NotificationsModule {}
