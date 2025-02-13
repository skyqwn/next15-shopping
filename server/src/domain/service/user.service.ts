import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { pipe, Effect } from 'effect';

import { UserRepository } from 'src/infrastructure/database/repositories/user.repository';
import { SignInCommand, SignUpCommand, UserInfo } from '../dtos';
import { AppAuthException, AppNotFoundException } from '../exceptions';
import { ErrorCodes } from 'src/common/error';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenCacheStore } from 'src/infrastructure/cache';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    private readonly refreshTokenCacheStore: RefreshTokenCacheStore,
    private readonly jwtService: JwtService,
  ) {}

  signUp(signUpCommand: SignUpCommand) {
    return pipe(
      this.userRepository.checkEmailExists(signUpCommand.email),
      Effect.flatMap(() =>
        this.userRepository.create({
          email: signUpCommand.email,
          password: bcrypt.hashSync(signUpCommand.password, 10),
          isVerified: false,
          loginType: 'email',
          name: signUpCommand.name,
          role: 'USER',
        }),
      ),
      Effect.map(UserInfo.from),
    );
  }

  signIn(signInCommand: SignInCommand) {
    return pipe(
      this.userRepository.getByEmail(signInCommand.email),
      Effect.flatMap((user) => {
        // 소셜 로그인은 패스워드가 없을 수있기때문 체크
        if (!user || !user.password) {
          return Effect.fail(new AppAuthException(ErrorCodes.USER_NOT_FOUND));
        }

        const isPasswordValid = bcrypt.compareSync(
          signInCommand.password,
          user.password,
        );

        if (!isPasswordValid) {
          return Effect.fail(new AppAuthException(ErrorCodes.USER_AUTH_FAILED));
        }

        const payload = { userId: user.id };
        const accessToken = this.jwtService.sign(payload, {
          secret: this.configService.get('JWT_SECRET'),
          expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION'),
        });

        const refreshToken = this.jwtService.sign(payload, {
          secret: this.configService.get('JWT_SECRET'),
          expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION'),
        });

        return pipe(
          this.refreshTokenCacheStore.cache(user.id.toString(), refreshToken),
          Effect.map(() => ({
            accessToken,
            user: UserInfo.from(user),
          })),
          Effect.catchAll((error) =>
            Effect.fail(new AppAuthException(ErrorCodes.USER_TOKEN_EXPIRED)),
          ),
        );
      }),
    );
  }
}
