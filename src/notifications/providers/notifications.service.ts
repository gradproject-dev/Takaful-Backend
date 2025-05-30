import { Injectable } from '@nestjs/common';
import { CreateNotificationProvider } from './create-notification-provider';
import { DeleteNotificationProvider } from './delete-notification-provider';
import { GetNotificationProvider } from './get-notification-provider';
import { UpdateNotificationProvider } from './update-notification-provider';
import { CreateNotificationDto } from '../dtos/create-notification.dto';
import { UpdateNotificationDto } from '../dtos/update-notification.dto';
import { SaveExpoTokenProvider } from './save-expo-token-provider';

@Injectable()
export class NotificationService {
  constructor(
    private readonly createNotificationProvider: CreateNotificationProvider,
    private readonly getNotificationProvider: GetNotificationProvider,
    private readonly UpdateNotificationProvider: UpdateNotificationProvider,
    private readonly deleteNotificationProvider: DeleteNotificationProvider,
    private readonly saveExpoTokenProvider: SaveExpoTokenProvider,
  ) {}

  async createNotification(dto: CreateNotificationDto) {
    return await this.createNotificationProvider.createNotification(dto);
  }

  async getAll() {
    return await this.getNotificationProvider.getAll();
  }

  async getById(id: number) {
    return await this.getNotificationProvider.getById(id);
  }

  async update(id: number, dto: UpdateNotificationDto) {
    return await this.UpdateNotificationProvider.update(id, dto);
  }

  async delete(id: number) {
    return await this.deleteNotificationProvider.delete(id);
  }

  async saveExpoToken(userId: number, token: string) {
    return await this.saveExpoTokenProvider.saveToken(userId, token);
  }
}
