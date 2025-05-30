import { Test, TestingModule } from '@nestjs/testing';
import { GenericGetService } from '../generic-get-service';

describe('GenericGetService', () => {
  let provider: GenericGetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenericGetService],
    }).compile();

    provider = module.get<GenericGetService>(GenericGetService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
