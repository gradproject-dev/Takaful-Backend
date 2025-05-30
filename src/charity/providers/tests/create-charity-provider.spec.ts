import { Test, TestingModule } from '@nestjs/testing';
import { CreateCharityProvider } from '../create-charity-provider';

describe('CreateCharityProvider', () => {
  let provider: CreateCharityProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateCharityProvider],
    }).compile();

    provider = module.get<CreateCharityProvider>(CreateCharityProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
