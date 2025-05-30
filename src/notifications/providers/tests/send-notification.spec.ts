import { Test, TestingModule } from '@nestjs/testing';
import { SendNotificationProvider } from '../send-notification-provider';

describe('SendNotificationProvider', () => {
  let provider: SendNotificationProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SendNotificationProvider],
    }).compile();

    provider = module.get<SendNotificationProvider>(SendNotificationProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
