import { Test, TestingModule } from '@nestjs/testing';
import { DeleteCategoryProvider } from '../delete-category-provider';

describe('DeleteCategory', () => {
  let provider: DeleteCategoryProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteCategoryProvider],
    }).compile();

    provider = module.get<DeleteCategoryProvider>(DeleteCategoryProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
