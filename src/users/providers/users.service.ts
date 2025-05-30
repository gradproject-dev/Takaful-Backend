import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { FindUserByEmailProvider } from './find-user-by-email.provider';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateUserProvider } from './create-user.provider';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    // Injecting Config Service for envs
    private readonly configService: ConfigService,

    @InjectRepository(User)
    private userRepo: Repository<User>,

    private findUserByEmailProvider: FindUserByEmailProvider,

    private createUserProvider: CreateUserProvider,
  ) {}

  // public findAll() {
  //   console.log(this.configService.get("S3_BUCKET"));
  //   return "hello";
  // }

  public async findOneByEmail(email: string): Promise<User> {
    return await this.findUserByEmailProvider.findUserByEmail(email);
  }

  public async createUser(createUserDto: CreateUserDto) {
    return await this.createUserProvider.createUser(createUserDto);
  }

  public async getUserById(id: number): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id },
    });
    if (!user) {
    }
    return user;
  }

  public async getUserExpoToken(id: number): Promise<string> {
    try {
      const token = await this.userRepo.find({
        where: { id },
        select: { expoPushToken: true },
      });
      return token[0].expoPushToken;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
