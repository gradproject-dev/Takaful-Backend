import { Test, TestingModule } from '@nestjs/testing';
import { CreateCategoryProvider } from '../create-category-provider';

describe('CreateCategoryProvider', () => {
  let provider: CreateCategoryProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateCategoryProvider],
    }).compile();

    provider = module.get<CreateCategoryProvider>(CreateCategoryProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
