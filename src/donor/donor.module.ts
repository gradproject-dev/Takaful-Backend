import { Module } from '@nestjs/common';
import { DonorController } from './donor.controller';
import { DonorService } from './providers/donor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donor } from './donor.entity';
import { CreateDonorProvider } from './providers/create-donor-provider';
import { GetDonorProvider } from './providers/get-donor-provider';
import { UpdateDonorProvider } from './providers/update-donor-provider';
import { DeleteDonorProvider } from './providers/delete-donor-provider';
import { GenericModule } from 'src/generic-module/generic.module';
import { UploadsModule } from 'src/uploads/uploads.module';
import { UsersModule } from 'src/users/users.module';
import { Volunteer } from 'src/volunteer/volunteer.entity';

@Module({
  controllers: [DonorController],
  providers: [
    DonorService,
    CreateDonorProvider,
    GetDonorProvider,
    UpdateDonorProvider,
    DeleteDonorProvider,
  ],
  imports: [
    TypeOrmModule.forFeature([Donor]),
    GenericModule,
    UploadsModule,
    UsersModule,
  ],
  exports: [DonorService],
})
export class DonorModule {}
