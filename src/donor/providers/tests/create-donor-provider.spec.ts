import { Test, TestingModule } from '@nestjs/testing';
import { CreateDonorProvider } from '../create-donor-provider';

describe('CreateDonorProvider', () => {
  let provider: CreateDonorProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateDonorProvider],
    }).compile();

    provider = module.get<CreateDonorProvider>(CreateDonorProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
