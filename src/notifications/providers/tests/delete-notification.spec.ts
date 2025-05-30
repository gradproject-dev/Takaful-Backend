import { Test, TestingModule } from '@nestjs/testing';
import { DeleteNotificationProvider } from '../delete-notification-provider';

describe('DeleteNotificationProvider', () => {
  let provider: DeleteNotificationProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteNotificationProvider],
    }).compile();

    provider = module.get<DeleteNotificationProvider>(
      DeleteNotificationProvider,
    );
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
