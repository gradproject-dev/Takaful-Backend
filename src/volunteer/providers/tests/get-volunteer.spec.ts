import { Test, TestingModule } from '@nestjs/testing';
import { GetVolunteerProvider } from '../get-volunteer-provider';

describe('GetVolunteerProvider', () => {
  let provider: GetVolunteerProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetVolunteerProvider],
    }).compile();

    provider = module.get<GetVolunteerProvider>(GetVolunteerProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
