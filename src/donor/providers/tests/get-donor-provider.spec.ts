import { Test, TestingModule } from '@nestjs/testing';
import { GetDonorProvider } from '../get-donor-provider';

describe('GetDonorProvider', () => {
  let provider: GetDonorProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetDonorProvider],
    }).compile();

    provider = module.get<GetDonorProvider>(GetDonorProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
