import { Test, TestingModule } from '@nestjs/testing';
import { UpdateVolunteerProvider } from '../update-volunteer-provider';

describe('UpdateVolunteerProvider', () => {
  let provider: UpdateVolunteerProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateVolunteerProvider],
    }).compile();

    provider = module.get<UpdateVolunteerProvider>(UpdateVolunteerProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
