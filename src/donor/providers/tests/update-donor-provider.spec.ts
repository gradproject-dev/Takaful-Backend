import { Test, TestingModule } from '@nestjs/testing';
import { UpdateDonorProvider } from '../update-donor-provider';

describe('UpdateDonorProvider', () => {
  let provider: UpdateDonorProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateDonorProvider],
    }).compile();

    provider = module.get<UpdateDonorProvider>(UpdateDonorProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
