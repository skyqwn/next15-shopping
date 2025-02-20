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
import { Response } from 'express';

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
import {
  COOKIE_BASE_OPTIONS,
  COOKIE_DURATIONS,
} from 'src/common/constants/cookie.config';
import { UserSelectType } from 'src/infrastructure/drizzle/schema/users.schema';

interface SetCookiesOptions {
  accessToken?: string;
  userId?: number;
}

@Controller('/auth')
export class UserController {
  private setCookies(response: Response, options: SetCookiesOptions) {
    if (options.accessToken) {
      response.cookie('accessToken', options.accessToken, {
        ...COOKIE_BASE_OPTIONS,
        maxAge: COOKIE_DURATIONS.ACCESS_TOKEN,
      });
    }

    if (options.userId) {
      response.cookie('userId', options.userId, {
        ...COOKIE_BASE_OPTIONS,
        maxAge: COOKIE_DURATIONS.USER_ID,
      });
    }
  }

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
        this.setCookies(response, {
          accessToken: result.accessToken,
          userId: result.user.id,
        });
        return { user: result.user };
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

      this.setCookies(response, {
        accessToken: accessToken,
        userId: user.id,
      });
      response.redirect(this.configService.get('CLIENT_URL') as string);
    } catch (error) {
      console.error('카카오 콜백 처리 중 에러:', error);
      throw new InternalServerErrorException(
        '카카오 로그인 처리 중 오류가 발생했습니다.',
      );
    }
  }

  @IsPublic()
  @Post('/refreshToken')
  refreshToken(
    @Body() refreshTokenRequestDto: RefreshTokenRequestDto,
    @Res({ passthrough: true }) response: Response,
    @Req() request,
  ) {
    const cookies = request.headers.cookie?.split(';').reduce(
      (acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        acc[key] = value;
        return acc;
      },
      {} as Record<string, string>,
    );

    const userId = cookies?.userId;

    return pipe(
      this.userFacade.refreshToken(refreshTokenRequestDto),
      Effect.map((result) => {
        return {
          accessToken: result.accessToken,
        };
      }),
      Effect.runPromise,
    );
  }

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  getMyProfile(@GetUser() user: UserSelectType) {
    return pipe(
      this.userFacade.getMyProfile(user.id),
      Effect.map((user) => {
        const { password, ...userWithoutPassword } = user;
        return {
          isLoggedIn: true,
          data: {
            ...userWithoutPassword,
            role: user.role,
          },
          message: 'Profile fetched',
        };
      }),
      Effect.runPromise,
    );
  }

  @Patch('/me/profile')
  @UseGuards(AuthGuard('jwt'))
  updateMyProfile(
    @Body() updateProfileRequestDto: UpdateProfileRequestDto,
    @GetUser() user: UserModel,
  ) {
    return this.userFacade.updateProfile(updateProfileRequestDto, user.id);
  }

  @Post('/check-admin')
  @UseGuards(AuthGuard('jwt'))
  async checkAdmin(@GetUser() user: UserModel) {
    return {
      isAdmin: user.role === 'ADMIN',
    };
  }

  @Get('/status')
  @UseGuards(AuthGuard('jwt'))
  getAuthStatus(@GetUser() user: UserModel) {
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
  @UseGuards(AuthGuard('jwt'))
  signOut(
    @Res({ passthrough: true }) response: Response,
    @GetUser() user: UserModel,
  ) {
    return pipe(
      this.userFacade.signOut(user.id.toString()),
      Effect.tap(() => {
        response.clearCookie('accessToken', COOKIE_BASE_OPTIONS);
        response.clearCookie('userId', COOKIE_BASE_OPTIONS);
      }),
      Effect.map(() => ({ success: true })),
      Effect.runPromise,
    );
  }
}
