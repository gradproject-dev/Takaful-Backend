import { Test, TestingModule } from '@nestjs/testing';
import { UpdateCategoryProvider } from '../update-category-provider';

describe('UpdateCategoryProvider', () => {
  let provider: UpdateCategoryProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateCategoryProvider],
    }).compile();

    provider = module.get<UpdateCategoryProvider>(UpdateCategoryProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
