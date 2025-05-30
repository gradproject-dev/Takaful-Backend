import { Test, TestingModule } from '@nestjs/testing';
import { UpdateEventProvider } from '../update-event.provider';

describe('UpdateEventProvider', () => {
  let provider: UpdateEventProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateEventProvider],
    }).compile();

    provider = module.get<UpdateEventProvider>(UpdateEventProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
