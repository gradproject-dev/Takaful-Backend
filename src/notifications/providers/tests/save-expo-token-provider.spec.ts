import { Test, TestingModule } from '@nestjs/testing';
import { SaveExpoTokenProvider } from '../save-expo-token-provider';

describe('SaveExpoTokenProvider', () => {
  let provider: SaveExpoTokenProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaveExpoTokenProvider],
    }).compile();

    provider = module.get<SaveExpoTokenProvider>(SaveExpoTokenProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
