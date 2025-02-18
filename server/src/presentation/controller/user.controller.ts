import {
  Body,
  Controller,
  Get,
  Patch,
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
  UpdateProfileRequestDto,
} from '../dtos/user/request';
import { UserFacade } from 'src/application/facades';
import { IsPublic } from 'src/common/decorators/is-public.decorator';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { UserModel } from 'src/domain/model/user.model';

@Controller('/auth')
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

        response.cookie('userId', result.user.id, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 1000 * 60 * 60 * 24, // 24시간
          path: '/',
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

  @Patch('/me/profile')
  async updateProfile(
    @Body() updateProfileRequestDto: UpdateProfileRequestDto,
    @GetUser() { id }: { id: number },
  ) {
    return 'updateMyProfile';
  }

  @Post('/check-admin')
  @UseGuards(AuthGuard('jwt'))
  async checkAdmin(@GetUser() user: UserModel) {
    console.log('체크 어드민 컨트롤러:', user);

    return {
      isAdmin: user.role === 'ADMIN',
    };
  }

  @Get('/status')
  @UseGuards(AuthGuard('jwt'))
  async getAuthStatus(@GetUser() user: UserModel) {
    if (!user) {
      return {
        isLoggedIn: false,
        user: null,
      };
    }

    return {
      isLoggedIn: true,
      user: {
        id: user.id,
        name: user.name,
        imageUri: user.imageUri,
        role: user.role,
      },
    };
  }

  @Post('/signout')
  async signOut(@Res({ passthrough: true }) response: Response) {
    console.log('로그아웃 요청 시작');

    response.clearCookie('accessToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/', // path 추가
    });

    response.clearCookie('userId', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/', // path 추가
    });

    console.log('쿠키 삭제 완료');

    return {
      success: true,
    };
  }
}
