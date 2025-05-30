import { Test, TestingModule } from '@nestjs/testing';
import { GetCharityProvider } from '../get-charity-provider.js';

describe('GetCharityProvider', () => {
  let provider: GetCharityProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetCharityProvider],
    }).compile();

    provider = module.get<GetCharityProvider>(GetCharityProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
