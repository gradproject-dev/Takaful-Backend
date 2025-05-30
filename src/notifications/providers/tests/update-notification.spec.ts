import { Test, TestingModule } from '@nestjs/testing';
import { UpdateNotificationProvider } from '../update-notification-provider';

describe('UpdateNotificationProvider', () => {
  let provider: UpdateNotificationProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateNotificationProvider],
    }).compile();

    provider = module.get<UpdateNotificationProvider>(
      UpdateNotificationProvider,
    );
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
