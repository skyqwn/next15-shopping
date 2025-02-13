import { Body, Controller, Post, Res } from '@nestjs/common';
import { Effect, pipe } from 'effect';
import { response, Response } from 'express';

import {
  RefreshTokenRequestDto,
  SigninRequestDto,
  SignupRequestDto,
} from '../dtos/user/request';
import { UserFacade } from 'src/application/facades';
import { IsPublic } from 'src/common/decorators/is-public.decorator';

@IsPublic()
@Controller('/test')
export class UserController {
  constructor(private readonly userFacade: UserFacade) {}

  @Post('/signin')
  signin(
    @Body() signInRequestDto: SigninRequestDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return pipe(
      this.userFacade.signIn(signInRequestDto),
      Effect.map((result) => {
        response.cookie('accessToken', result.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 1000 * 60 * 60 * 24, // 24시간
        });

        return {
          user: result.user,
        };
      }),
      Effect.runPromise,
    );
  }

  @Post('/signup')
  signup(@Body() signUpRequsetDto: SignupRequestDto) {
    return this.userFacade.signUp(signUpRequsetDto);
  }

  @Post('/one')
  test(@Body() sign: any) {
    return console.log('원!');
  }

  @Post('/refresh-token')
  refreshToken(
    @Body() refreshTokenRequestDto: RefreshTokenRequestDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return pipe(
      this.userFacade.refreshToken(refreshTokenRequestDto),
      Effect.map((result) => {
        response.cookie('accessToken', result.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          path: '/',
        });

        return {
          accessToken: result.accessToken,
        };
      }),
      Effect.runPromise,
    );
  }
}
