import { Test, TestingModule } from '@nestjs/testing';
import { DeleteTransactions } from '../delete-transactions';

describe('DeleteTransactions', () => {
  let provider: DeleteTransactions;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteTransactions],
    }).compile();

    provider = module.get<DeleteTransactions>(DeleteTransactions);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
