import { Test, TestingModule } from '@nestjs/testing';
import { UpdateTransactions } from '../update-transactions';

describe('UpdateTransactions', () => {
  let provider: UpdateTransactions;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateTransactions],
    }).compile();

    provider = module.get<UpdateTransactions>(UpdateTransactions);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
