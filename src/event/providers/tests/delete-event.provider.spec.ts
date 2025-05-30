import { Test, TestingModule } from '@nestjs/testing';
import { DeleteEventProvider } from '../delete-event.provider';

describe('DeleteEventProvider', () => {
  let provider: DeleteEventProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteEventProvider],
    }).compile();

    provider = module.get<DeleteEventProvider>(DeleteEventProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
