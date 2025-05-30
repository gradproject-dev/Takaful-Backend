import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { NotificationService } from './providers/notifications.service';
import { CreateNotificationDto } from './dtos/create-notification.dto';
import { UpdateNotificationDto } from './dtos/update-notification.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type-enum';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Auth(AuthType.None)
  @Post()
  create(@Body() dto: CreateNotificationDto) {
    return this.notificationService.createNotification(dto);
  }

  @Get()
  getAll() {
    return this.notificationService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.notificationService.getById(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateNotificationDto) {
    return this.notificationService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.notificationService.delete(id);
  }

  @Auth(AuthType.None)
  @Post('register-token')
  registerExpoToken(@Body() body: { userId: number; token: string }) {
    return this.notificationService.saveExpoToken(body.userId, body.token);
  }
}
