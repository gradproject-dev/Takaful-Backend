import { Test, TestingModule } from '@nestjs/testing';
import { GenericCreateService } from '../generic-create-service';

describe('GenericCreateService', () => {
  let provider: GenericCreateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenericCreateService],
    }).compile();

    provider = module.get<GenericCreateService>(GenericCreateService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
