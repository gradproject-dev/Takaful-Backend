import { Test, TestingModule } from '@nestjs/testing';
import { DonationController } from './donation.controller';
import { DonationService } from './providers/donation.service';

describe('DonationController', () => {
  let donationController: DonationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DonationController],
      providers: [DonationService],
    }).compile();

    donationController = module.get<DonationController>(DonationController);
  });
});
