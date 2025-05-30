import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from './providers/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthType } from 'src/auth/enums/auth-type-enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('users')
export class UsersController {
  constructor(
    // Injecting the configService
    private readonly configService: ConfigService,

    private readonly usersService: UsersService,
  ) {}

  @Auth(AuthType.None)
  @Post()
  public CreateUsers(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  // maybe implement this later
  // @Auth(AuthType.None)
  // @Get()
  // public GetAllUsers() {
  //   return this.usersService.
  // }

  @Auth(AuthType.None)
  @Get(':id')
  public async GetUserById(@Param() userId: number) {
    return await this.usersService.getUserById(userId);
  }
}
