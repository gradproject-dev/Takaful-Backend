import { Test, TestingModule } from '@nestjs/testing';
import { DeleteVolunteerProvider } from '../delete-volunteer-provider';

describe('DeleteVolunteerProvider', () => {
  let provider: DeleteVolunteerProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteVolunteerProvider],
    }).compile();

    provider = module.get<DeleteVolunteerProvider>(DeleteVolunteerProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
