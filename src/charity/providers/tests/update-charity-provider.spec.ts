import { Test, TestingModule } from '@nestjs/testing';
import { UpdateCharityProvider } from '../update-charity-provider';

describe('UpdateCharityProvider', () => {
  let provider: UpdateCharityProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateCharityProvider],
    }).compile();

    provider = module.get<UpdateCharityProvider>(UpdateCharityProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
