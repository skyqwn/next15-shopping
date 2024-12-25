import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { eq } from 'drizzle-orm';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { users } from 'src/drizzle/schema/users.schema';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { RedisService } from 'src/redis/redis.service';
import * as crypto from 'crypto';

@Injectable()
export class MailService {
  constructor(
    @Inject(DRIZZLE) private db: DrizzleDB,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {}

  async sendVerificationEmail(email: string) {
    try {
      const verificationToken = crypto.randomBytes(32).toString('hex');

      await this.redisService.setEmailVerificationToken(
        email,
        verificationToken,
      );

      const verificationLink = `${this.configService.get<string>('CLIENT_URL')}/auth/email-verify?token=${verificationToken}&email=${email}`;

      await this.mailerService.sendMail({
        to: email,
        subject: '이메일 인증을 완료해주세요',
        html: `
          <div style="max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333;">이메일 인증</h1>
            <p>아래 버튼을 클릭하여 이메일 인증을 완료해주세요.</p>
            <div style="margin: 20px 0;">
              <a href="${verificationLink}" 
                 style="background-color: #4CAF50; 
                        color: white; 
                        padding: 12px 20px; 
                        text-decoration: none; 
                        border-radius: 5px; 
                        display: inline-block;">
                이메일 인증하기
              </a>
            </div>
            <p style="color: #666; font-size: 14px;">
              이 링크는 24시간 동안 유효합니다.
            </p>
          </div>
        `,
      });
    } catch (error) {
      console.error('이메일 발송 에러:', error);
    }
  }

  async verifyEmail(email: string) {
    const checked = await this.redisService.getEmailVerificationToken(email);

    if (!checked) {
      throw new UnauthorizedException(
        '유효하지 않거나 만료된 인증 링크입니다.',
      );
    }

    await this.db
      .update(users)
      .set({ isVerified: true })
      .where(eq(users.email, email));

    await this.redisService.deleteEmailVerificationToken(email);

    return { message: '이메일 인증이 완료되었습니다.' };
  }
}
