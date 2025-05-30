import { Module } from '@nestjs/common';
import { DonationController } from './donation.controller';
import { DonationService } from './providers/donation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donation } from './donation.entity';
import { CreateDonationProvider } from './providers/create-donation-provider';
import { GetDonationProvider } from './providers/get-donation-provider';
import { UpdateDonationProvider } from './providers/update-donation-provider';
import { DeleteDonationProvider } from './providers/delete-donation-provider';
import { GenericModule } from 'src/generic-module/generic.module';
import { UploadsModule } from 'src/uploads/uploads.module';
import { UsersModule } from 'src/users/users.module';
import { CharityModule } from 'src/charity/charity.module'; // Assuming Donation is related to Charity
import { DonorModule } from 'src/donor/donor.module';

@Module({
  controllers: [DonationController],
  providers: [
    DonationService,
    CreateDonationProvider,
    GetDonationProvider,
    UpdateDonationProvider,
    DeleteDonationProvider,
  ],
  imports: [
    TypeOrmModule.forFeature([Donation]),
    GenericModule,
    UploadsModule,
    UsersModule,
    CharityModule, // If needed for relations
    DonorModule,
  ],
})
export class DonationModule {}
