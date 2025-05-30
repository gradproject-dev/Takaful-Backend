import { Test, TestingModule } from '@nestjs/testing';
import { DeleteCharityProvider } from '../delete-charity-provider';

describe('DeleteCharityProvider', () => {
  let provider: DeleteCharityProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteCharityProvider],
    }).compile();

    provider = module.get<DeleteCharityProvider>(DeleteCharityProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
