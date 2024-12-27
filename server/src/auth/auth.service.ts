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

@Injectable()
export class AuthService {
  constructor(
    @Inject(DRIZZLE) private db: DrizzleDB,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    private mailService: MailService,
  ) {}

  private async getTokens(payload: { userId: number }) {
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

  // async refreshTokens(userId: number) {
  //   const refreshToken = await this.redisService.getRefreshToken(userId);

  //   if (!refreshToken) {
  //     throw new UnauthorizedException('다시 로그인이 필요합니다.');
  //   }

  //   try {
  //     await this.jwtService.verifyAsync(refreshToken, {
  //       secret: this.configService.get('JWT_SECRET'),
  //     });

  //     const accessToken = await this.jwtService.signAsync(
  //       { userId },
  //       {
  //         secret: this.configService.get('JWT_SECRET'),
  //         expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION'),
  //       },
  //     );

  //     return { accessToken };
  //   } catch (error) {
  //     throw new UnauthorizedException('다시 로그인이 필요합니다.');
  //   }
  // }
}
