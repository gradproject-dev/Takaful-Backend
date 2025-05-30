import { Test, TestingModule } from '@nestjs/testing';
import { CreateVolunteerProvider } from '../create-volunteer-provider';

describe('CreateVolunteerProvider', () => {
  let provider: CreateVolunteerProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateVolunteerProvider],
    }).compile();

    provider = module.get<CreateVolunteerProvider>(CreateVolunteerProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
