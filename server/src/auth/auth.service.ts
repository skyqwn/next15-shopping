import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dto/sign-up-dto';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import * as bcrypt from 'bcryptjs';
import { users } from 'src/drizzle/schema/users.schema';
import { SigninDto } from './dto/signin-dto';
import { eq } from 'drizzle-orm';
import { RedisService } from 'src/redis/redis.service';
import { MailService } from 'src/mail/mail.service';
import UserUnauthorizedException from './exceptions/user-unauthorized.exception';
import UserDuplicateEmailException from './exceptions/user-duplicate-email.exception';
import UserRefreshTokenExpiredException from './exceptions/user-refreshtoken-expired.exception';
import axios from 'axios';
import { KakaoProfile } from './strategies/kakao.strategy';
@Injectable()
export class AuthService {
  constructor(
    @Inject(DRIZZLE) private db: DrizzleDB,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    private readonly mailService: MailService,
  ) {}

  async getTokens(payload: { userId: number }) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION'),
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;

    const user = await this.db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) throw new UserUnauthorizedException();

    const userId = user.id;

    if (!user.password) throw new UserUnauthorizedException();

    const checked = await bcrypt.compare(password, user.password);

    if (!checked) throw new UserUnauthorizedException();

    const { accessToken, refreshToken } = await this.getTokens({ userId });

    await this.redisService.setRefreshToken(userId, refreshToken);

    return { accessToken, userId };
  }

  async signup(signupDto: SignupDto) {
    const { email, name, password } = signupDto;

    const userExists = await this.db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (userExists) throw new UserDuplicateEmailException();

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    this.mailService.sendVerificationEmail(email);

    const user = await this.db
      .insert(users)
      .values({
        email,
        password: hashedPassword,
        loginType: 'email',
        name,
        isVerified: false,
      })
      .returning();

    return { message: '이메일 인증 후 로그인 해주세요.' };
  }

  async refreshTokens(userId: number) {
    const refreshToken = await this.redisService.getRefreshToken(userId);

    if (!refreshToken) throw new UserRefreshTokenExpiredException();

    await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configService.get('JWT_SECRET'),
    });

    const accessToken = await this.jwtService.signAsync(
      { userId },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION'),
      },
    );

    return { accessToken };
  }

  async signUpWithKakao(profile: any) {}

  async getKakaoAccessToken(code: string) {
    const tokenUrl = 'https://kauth.kakao.com/oauth/token';
    const payload = {
      grant_type: 'authorization_code',
      client_id: this.configService.get('KAKAO_CLIENT_ID'),
      redirect_uri: this.configService.get('KAKAO_CALLBACK_URL'),
      code,
    };
    try {
      const response = await axios.post(tokenUrl, payload, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return response.data.access_token;
    } catch (error) {
      throw new UserUnauthorizedException();
    }
  }

  async getKakaoProfile(accessToken: string) {
    const profileUrl = 'https://kapi.kakao.com/v2/user/me';
    const response = await axios.get(profileUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const userData = response.data;
    const kakaoEmail = userData.kakao_account.email;
    const nickname = userData.properties.nickname;
    const profileImage = userData.properties.profile_image;
    return { kakaoEmail, nickname, profileImage };
  }

  async validateKakaoUser(profile: KakaoProfile) {
    const { email, nickname, profile_image } = profile;

    let user = await this.db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (user) {
      const updatedUsers = await this.db
        .update(users)
        .set({
          loginType: 'kakao',
          imageUri: profile_image,
          isVerified: true,
        })
        .where(eq(users.email, email))
        .returning();
      user = updatedUsers[0];
    } else {
      const newUser = await this.db
        .insert(users)
        .values({
          email,
          loginType: 'kakao',
          name: nickname,
          imageUri: profile_image,
          isVerified: true,
        })
        .returning();
      user = newUser[0];
    }
    const userId = user.id;

    const { accessToken, refreshToken } = await this.getTokens({ userId });

    await this.redisService.setRefreshToken(userId, refreshToken);

    return { user, accessToken };
  }
}
