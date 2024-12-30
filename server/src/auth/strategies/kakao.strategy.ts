import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { AuthService } from '../auth.service';

export interface KakaoProfile {
  email: string;
  nickname: string;
  profile_image: string;
}

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('KAKAO_CLIENT_ID'),
      callbackURL: configService.get<string>('KAKAO_CALLBACK_URL'),
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: Function,
  ) {
    try {
      const { kakao_account } = profile._json;
      const email = kakao_account.email;
      const nickname = profile.displayName;
      const profile_image = kakao_account.profile?.profile_image_url;

      const userProfile = { email, nickname, profile_image };
      const user = await this.authService.validateKakaoUser(userProfile);
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }
}
