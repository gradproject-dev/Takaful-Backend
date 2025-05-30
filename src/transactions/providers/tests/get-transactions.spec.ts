import { Test, TestingModule } from '@nestjs/testing';
import { GetTransactions } from '../get-transactions';

describe('GetTransactions', () => {
  let provider: GetTransactions;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetTransactions],
    }).compile();

    provider = module.get<GetTransactions>(GetTransactions);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
