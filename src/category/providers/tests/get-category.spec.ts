import { Test, TestingModule } from '@nestjs/testing';
import { GetCategoryProvider } from '../get-category-provider';

describe('GetCategory', () => {
  let provider: GetCategoryProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetCategoryProvider],
    }).compile();

    provider = module.get<GetCategoryProvider>(GetCategoryProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
