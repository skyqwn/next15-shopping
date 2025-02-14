import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Effect, pipe } from 'effect';
import { response, Response } from 'express';

import {
  RefreshTokenRequestDto,
  SigninRequestDto,
  SignupRequestDto,
} from '../dtos/user/request';
import { UserFacade } from 'src/application/facades';
import { IsPublic } from 'src/common/decorators/is-public.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('/test')
export class UserController {
  constructor(private readonly userFacade: UserFacade) {}

  @IsPublic()
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

  @IsPublic()
  @Post('/signup')
  signup(@Body() signUpRequsetDto: SignupRequestDto) {
    return this.userFacade.signUp(signUpRequsetDto);
  }

  @IsPublic()
  @Get('/kakao/signin')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLogin() {}

  @IsPublic()
  @Get('/auth/kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async kakaoCallback(
    @Req() req,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = req['user'];
    const userUser = user['user'];
    const userId = userUser['id'];

    const accessToken = req.user['accessToken'];

    response.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    return {
      user: user.user,
    };
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
