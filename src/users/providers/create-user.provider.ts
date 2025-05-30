import {
  BadRequestException,
  Inject,
  Injectable,
  RequestTimeoutException,
  forwardRef,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { HashingProvider } from 'src/auth/providers/hashing.provider';

@Injectable()
export class CreateUserProvider {
  constructor(
    // Inject user repo
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject(forwardRef(() => HashingProvider))
    private readonly hashProvider: HashingProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    // Check if there is a user with the same email
    let existingUser = undefined;
    try {
      existingUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });
    } catch (error) {
      // Might want to save these errors with more information in a log file or database
      // You don't need to send this sensitive information to user
      console.log(error);
      throw new RequestTimeoutException('Unable to proccess your request', {
        description: 'Error connecting to the database',
      });
    }
    // Handle exception
    if (existingUser) {
      throw new BadRequestException(
        'The user already exists, please check your email',
      );
    }

    // Create a new user
    let newUser = this.userRepository.create({
      ...createUserDto,
      password: await this.hashProvider.hashPassword(createUserDto.password),
    });

    try {
      newUser = await this.userRepository.save(newUser);
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException('Unable to proccess your request', {
        description: 'Error connecting to the database',
      });
    }
    return newUser;
  }
}
