import { Test, TestingModule } from '@nestjs/testing';
import { GenericUpdateService } from '../generic-update-service';

describe('GenericUpdateService', () => {
  let provider: GenericUpdateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenericUpdateService],
    }).compile();

    provider = module.get<GenericUpdateService>(GenericUpdateService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
