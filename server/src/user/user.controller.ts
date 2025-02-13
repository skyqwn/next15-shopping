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
import { UserSelectType } from 'src/drizzle/schema/users.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminGuard } from './guard/admin.guard';
import { IsPublic } from 'src/common/decorators/is-public.decorator';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  async getMyProfile(@GetUser() user: UserSelectType) {
    const { password, ...userWithoutPassword } = user;
    return {
      data: userWithoutPassword,
      message: 'Profile fetched',
    };
  }

  @Post('/checkIsAdmin')
  async checkedIsAdmin(@Body() { userId }: any) {
    return await this.userService.checkIsAdmin(+userId);
  }
  @Patch('/me/profile')
  async updateMyProfile(
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() { id }: UserSelectType,
  ) {
    const updateMyProfile = await this.userService.updateMyProfile(
      updateUserDto,
      id,
    );
  }
}
