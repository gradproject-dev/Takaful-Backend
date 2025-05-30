import { Module } from '@nestjs/common';
import { CharityController } from './charity.controller';
import { CharityService } from './providers/charity.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Charity } from './charity.entity';
import { CreateCharityProvider } from './providers/create-charity-provider';
import { GenericModule } from 'src/generic-module/generic.module';
import { GetCharityProvider } from './providers/get-charity-provider';
import { UpdateCharityProvider } from './providers/update-charity-provider';
import { DeleteCharityProvider } from './providers/delete-charity-provider';
import { UploadsModule } from 'src/uploads/uploads.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [CharityController],
  providers: [
    CharityService,
    CreateCharityProvider,
    GetCharityProvider,
    UpdateCharityProvider,
    DeleteCharityProvider,
  ],
  imports: [
    TypeOrmModule.forFeature([Charity]),
    GenericModule,
    UploadsModule,
    UsersModule,
  ],
  exports: [CharityService],
})
export class CharityModule {}
