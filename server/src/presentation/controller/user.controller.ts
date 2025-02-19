import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Patch,
  Post,
  Req,
  Res,
  UnauthorizedException,
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
import { KakaoAuthGuard } from 'src/infrastructure/auth/guards/kakao-auth.guard';
import { ConfigService } from '@nestjs/config';

@Controller('/auth')
export class UserController {
  constructor(
    private readonly userFacade: UserFacade,
    private readonly configService: ConfigService,
  ) {}

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
  @UseGuards(KakaoAuthGuard)
  async kakaoLogin() {}

  @IsPublic()
  @Get('/kakao/callback')
  @UseGuards(KakaoAuthGuard)
  async kakaoCallback(@Req() req, @Res() response: Response) {
    if (!req.user) {
      console.error('카카오 유저 정보가 없습니다.');
      throw new UnauthorizedException('카카오 인증 실패');
    }

    try {
      const { user, accessToken } = req.user;

      if (!user || !user.id) {
        console.error('유효하지 않은 유저 데이터:', user);
        throw new BadRequestException('유효하지 않은 유저 데이터');
      }

      response.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
      });

      response.cookie('userId', user.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24,
        path: '/',
      });

      response.redirect(this.configService.get('CLIENT_URL') as string);
    } catch (error) {
      console.error('카카오 콜백 처리 중 에러:', error);
      throw new InternalServerErrorException(
        '카카오 로그인 처리 중 오류가 발생했습니다.',
      );
    }
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
    response.clearCookie('accessToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    response.clearCookie('userId', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    return {
      success: true,
    };
  }
}
