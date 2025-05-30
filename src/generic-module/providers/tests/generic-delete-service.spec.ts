import { Test, TestingModule } from '@nestjs/testing';
import { GenericDeleteService } from '../generic-delete-service';

describe('GenericDeleteService', () => {
  let provider: GenericDeleteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenericDeleteService],
    }).compile();

    provider = module.get<GenericDeleteService>(GenericDeleteService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
