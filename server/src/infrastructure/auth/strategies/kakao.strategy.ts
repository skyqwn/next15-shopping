import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/domain/service/user.service';
import { Effect, pipe } from 'effect';

export interface KakaoProfile {
  email: string;
  nickname: string;
  profile_image: string;
}

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      clientID: configService.get('KAKAO_CLIENT_ID'),
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
        nickname: profile.displayName,
        profile_image: kakao_account.profile?.profile_image_url,
      };

      return await pipe(
        this.userService.validateKakaoUser(userProfile),
        Effect.runPromise,
      );
    } catch (error) {
      done(error, false);
    }
  }
}
