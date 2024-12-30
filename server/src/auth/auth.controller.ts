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
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin-dto';
import { SignupDto } from './dto/sign-up-dto';
import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { RedisService } from 'src/redis/redis.service';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { KakaoAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

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
      maxAge: 60 * 60 * 1000, // 1시간
      // maxAge: 60 * 500,
      path: '/',
    });

    res.cookie('userId', userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 100000, // 1시간
      path: '/',
    });

    return { message: 'Login successful' };
  }

  @Post('/signup')
  signup(@Body() body: SignupDto) {
    return this.authService.signup(body);
  }

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

      return { message: 'Token refreshed' };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@GetUser() user: any) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  @Get('/login/kakao')
  @UseGuards(KakaoAuthGuard)
  async kakaoLogin(@Res({ passthrough: true }) res: Response) {}

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
