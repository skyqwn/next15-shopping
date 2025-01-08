import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { UserProps } from 'src/auth/type/user';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  async getMyProfile(@GetUser() user: UserProps) {
    console.log(123);
    const { password, ...userWithoutPassword } = user;
    return {
      data: userWithoutPassword,
      message: 'Profile fetched',
    };
  }
}
