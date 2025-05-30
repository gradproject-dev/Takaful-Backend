// save-expo-token-provider.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { GenericService } from 'src/generic-module/generic.service';

@Injectable()
export class SaveExpoTokenProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    private readonly genericService: GenericService,
  ) {}

  async saveToken(userId: number, expoToken: string) {
    console.log(`saving ${userId} with token ${expoToken}`);
    const user = await this.genericService.findOneByV2<User>(this.userRepo, {
      where: { id: userId },
    });
    user.expoPushToken = expoToken;
    await this.userRepo.save(user);
  }
}
