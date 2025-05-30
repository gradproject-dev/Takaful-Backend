import { Test, TestingModule } from '@nestjs/testing';
import { CreateEventProvider } from '../create-event.provider';

describe('CreateEventProvider', () => {
  let provider: CreateEventProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateEventProvider],
    }).compile();

    provider = module.get<CreateEventProvider>(CreateEventProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
