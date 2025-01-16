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

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AdminGuard)
  @Get('/me')
  async getMyProfile(@GetUser() user: UserSelectType) {
    const { password, ...userWithoutPassword } = user;
    return {
      data: userWithoutPassword,
      message: 'Profile fetched',
    };
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
