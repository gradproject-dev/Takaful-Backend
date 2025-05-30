import { Test, TestingModule } from '@nestjs/testing';
import { CreateNotificationProvider } from '../create-notification-provider';

describe('CreateNotificationProvider', () => {
  let provider: CreateNotificationProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateNotificationProvider],
    }).compile();

    provider = module.get<CreateNotificationProvider>(
      CreateNotificationProvider,
    );
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
