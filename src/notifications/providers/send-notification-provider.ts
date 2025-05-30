import { Injectable } from '@nestjs/common';
import Expo from 'expo-server-sdk';
@Injectable()
export class SendNotificationProvider {
  private static expo: Expo;

  constructor() {
    if (!SendNotificationProvider.expo)
      SendNotificationProvider.expo = new Expo();
  }

  async sendPushNotification(
    expoToken: string,
    title: string,
    body: string,
    data?: any,
  ) {
    if (!Expo.isExpoPushToken(expoToken)) return;

    const messages = [
      {
        to: expoToken,
        sound: 'default',
        title,
        body,
        data,
      },
    ];

    await SendNotificationProvider.expo.sendPushNotificationsAsync(messages);
  }
}
