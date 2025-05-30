import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

@Injectable()
export class FindUserByEmailProvider {
  constructor(
    // Injecting the user Repo
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  public async findUserByEmail(email: string): Promise<User> {
    let user: User | undefined = undefined;
    try {
      user = await this.userRepo.findOneBy({ email });
    } catch (_) {
      throw new NotFoundException();
    }
    if (!user) throw new UnauthorizedException("User doesn't exist");
    return user;
  }
}
