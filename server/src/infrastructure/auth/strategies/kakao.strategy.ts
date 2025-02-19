import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/domain/service/user.service';
import { Effect, pipe } from 'effect';

export interface KakaoProfile {
  email: string;
  name: string;
  imageUri?: string;
  kakaoId: string;
  loginType: 'kakao';
  isVerified: boolean;
  role: 'USER' | 'ADMIN';
}

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      clientID: configService.get('KAKAO_CLIENT_ID'),
      clientSecret: configService.get('KAKAO_CLIENT_SECRET'),
      callbackURL: configService.get('KAKAO_CALLBACK_URL'),
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ) {
    try {
      const { kakao_account } = profile._json;

      const userProfile = {
        email: kakao_account.email,
        name: profile.displayName,
        imageUri: kakao_account.profile?.profile_image_url,
        kakaoId: profile.id,
        loginType: 'kakao' as const,
        isVerified: true,
        role: 'USER' as const,
      };

      const result = await pipe(
        this.userService.validateKakaoUser(userProfile),
        Effect.runPromise,
      );

      done(null, result);
    } catch (error) {
      console.error('카카오 인증 실패:', error);
      done(error, false);
    }
  }
}
