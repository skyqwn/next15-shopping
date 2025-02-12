import { Body, Controller, Post } from '@nestjs/common';
import { SignupRequestDto } from '../dtos/user/request';
import { UserFacade } from 'src/application/facades';
import { IsPublic } from 'src/common/decorators/is-public.decorator';

@Controller('/test')
@IsPublic()
export class UserController {
  constructor(private readonly userFacade: UserFacade) {}
  @Post('/signin')
  signin(@Body() signUpRequsetDto: SignupRequestDto) {
    console.log(signUpRequsetDto);
  }

  @Post('/signup')
  signup(@Body() signUpRequsetDto: SignupRequestDto) {
    return this.userFacade.signUp(signUpRequsetDto);
  }

  @Post('/one')
  test(@Body() sign: any) {
    return console.log('원!');
  }
}
