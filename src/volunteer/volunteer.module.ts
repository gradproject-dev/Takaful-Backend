import { Module } from '@nestjs/common';
import { VolunteerService } from './providers/volunteer.service';
import { GetVolunteerProvider } from './providers/get-volunteer-provider';
import { DeleteVolunteerProvider } from './providers/delete-volunteer-provider';
import { CreateVolunteerProvider } from './providers/create-volunteer-provider';
import { UpdateVolunteerProvider } from './providers/update-volunteer-provider';
import { VolunteerController } from './volunteer.controller';
import { Donor } from 'src/donor/donor.entity';
import { EventEntity } from 'src/event/event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Volunteer } from './volunteer.entity';
import { GenericModule } from 'src/generic-module/generic.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Volunteer, Donor, EventEntity]),
    GenericModule, // 👈 registers entities with TypeORM
  ],
  providers: [
    VolunteerService,
    GetVolunteerProvider,
    DeleteVolunteerProvider,
    CreateVolunteerProvider,
    UpdateVolunteerProvider,
  ],
  controllers: [VolunteerController],
  exports: [VolunteerService],
})
export class VolunteerModule {}
