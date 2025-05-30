import { Test, TestingModule } from '@nestjs/testing';
import { GetEventProvider } from '../get-event.provider';

describe('GetEventProvider', () => {
  let provider: GetEventProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetEventProvider],
    }).compile();

    provider = module.get<GetEventProvider>(GetEventProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
