import { Test, TestingModule } from '@nestjs/testing';
import { DeleteDonorProvider } from '../delete-donor-provider';

describe('DeleteDonorProvider', () => {
  let provider: DeleteDonorProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteDonorProvider],
    }).compile();

    provider = module.get<DeleteDonorProvider>(DeleteDonorProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
