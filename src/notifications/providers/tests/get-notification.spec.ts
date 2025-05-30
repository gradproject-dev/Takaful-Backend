import { Test, TestingModule } from '@nestjs/testing';
import { GetNotificationProvider } from '../get-notification-provider';

describe('GetNotificationProvider', () => {
  let provider: GetNotificationProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetNotificationProvider],
    }).compile();

    provider = module.get<GetNotificationProvider>(GetNotificationProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
