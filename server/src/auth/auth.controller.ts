import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  UseGuards,
  Req,
  UnauthorizedException,
  Query,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin-dto';
import { SignupDto } from './dto/sign-up-dto';
import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { KakaoAuthGuard } from './kakao-auth.guard';
import { IsPublic } from 'src/common/decorators/is-public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @IsPublic()
  @Post('/signin')
  async create(
    @Body() body: SigninDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.signin(body);

    if (typeof result === 'string') {
      throw new UnauthorizedException(result);
    }

    const { accessToken, userId } = result;

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 1 * 1000,
      path: '/',
    });

    res.cookie('userId', userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 14 * 1000,
      path: '/',
    });

    return { message: 'Login successful' };
  }

  @IsPublic()
  @Post('/signup')
  signup(@Body() body: SignupDto) {
    console.log('body', body);
    return this.authService.signup(body);
  }

  @Delete('/signout')
  signout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('userId');

    return;
  }

  @IsPublic()
  @Post('/refreshToken')
  async refresh(
    @Body() { userId }: RefreshTokenDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!userId) {
      throw new UnauthorizedException('No user ID found');
    }

    try {
      const { accessToken } = await this.authService.refreshTokens(userId);

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 1000, // 1시간
        path: '/',
      });

      return accessToken;
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  @IsPublic()
  @Get('/kakao/signin')
  @UseGuards(KakaoAuthGuard)
  async kakaoLogin(@Res({ passthrough: true }) res: Response) {}

  @IsPublic()
  @Get('/kakao/callback')
  @UseGuards(KakaoAuthGuard)
  async kakaoCallback(
    @Query('code') kakaoAuthResCode: string,
    @Req() req: Request,
    @Res() res: Response,
    // @Res({ passthrough: true }) res: Response,
  ) {
    if (!req.user) return;

    const user = req['user'];
    const userUser = user['user'];
    const userId = userUser['id'];

    const accessToken = req.user['accessToken'];

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000, // 1시간
      path: '/',
    });

    res.cookie('userId', userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 100000,
      path: '/',
    });

    return res.redirect(this.configService.get('CLIENT_URL') as string);
  }
}
