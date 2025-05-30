import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './providers/event.service';
import { CreateEventProvider } from './providers/create-event.provider';
import { UpdateEventProvider } from './providers/update-event.provider';
import { DeleteEventProvider } from './providers/delete-event.provider';
import { GetEventProvider } from './providers/get-event.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from './event.entity';
import { Charity } from 'src/charity/charity.entity';
import { Volunteer } from 'src/volunteer/volunteer.entity';
import { GenericModule } from 'src/generic-module/generic.module';
import { UploadsModule } from 'src/uploads/uploads.module';
import { CharityModule } from 'src/charity/charity.module';
import { CharityService } from 'src/charity/providers/charity.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventEntity, Charity, Volunteer]),
    GenericModule,
    UploadsModule,
    CharityModule,
  ],
  controllers: [EventController],
  providers: [
    EventService,
    CreateEventProvider,
    UpdateEventProvider,
    DeleteEventProvider,
    GetEventProvider,
  ],
})
export class EventModule {}
