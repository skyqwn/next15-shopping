import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { pipe, Effect } from 'effect';
import * as bcrypt from 'bcrypt';

import { UserRepository } from 'src/infrastructure/database/repositories/user.repository';
import {
  RefreshTokenCommand,
  SignInCommand,
  SignUpCommand,
  UserInfo,
} from '../dtos';
import {
  AppAuthException,
  AppConflictException,
  AppNotFoundException,
} from '../exceptions';
import { ErrorCodes } from 'src/common/error';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenCacheStore } from 'src/infrastructure/cache';
import { KakaoProfile } from 'src/infrastructure/auth/strategies';

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

  validateKakaoUser(profile: KakaoProfile) {
    return pipe(
      this.userRepository.getByEmail(profile.email),
      Effect.flatMap((existingUser) => {
        if (existingUser) {
          return pipe(
            this.userRepository.update(existingUser.id, {
              loginType: 'kakao',
              imageUri: profile.profile_image,
              isVerified: true,
            }),
            Effect.map((user) => {
              const payload = { userId: user.id };
              const accessToken = this.jwtService.sign(payload, {
                secret: this.configService.get('JWT_SECRET'),
                expiresIn: this.configService.get(
                  'JWT_ACCESS_TOKEN_EXPIRATION',
                ),
              });

              const refreshToken = this.jwtService.sign(payload, {
                secret: this.configService.get('JWT_SECRET'),
                expiresIn: this.configService.get(
                  'JWT_REFRESH_TOKEN_EXPIRATION',
                ),
              });

              return pipe(
                this.refreshTokenCacheStore.cache(
                  user.id.toString(),
                  refreshToken,
                ),
                Effect.map(() => ({
                  accessToken,
                  user: UserInfo.from(user),
                })),
              );
            }),
            Effect.flatten,
          );
        }

        // 새 사용자 생성
        return pipe(
          this.userRepository.create({
            email: profile.email,
            name: profile.nickname,
            imageUri: profile.profile_image,
            loginType: 'kakao',
            isVerified: true,
            role: 'USER',
          }),
          Effect.map((user) => {
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
              this.refreshTokenCacheStore.cache(
                user.id.toString(),
                refreshToken,
              ),
              Effect.map(() => ({
                accessToken,
                user: UserInfo.from(user),
              })),
            );
          }),
          Effect.flatten,
        );
      }),
      Effect.catchAll((error) =>
        Effect.fail(new AppAuthException(ErrorCodes.USER_AUTH_FAILED)),
      ),
    );
  }

  refreshToken(refreshTokenComman: RefreshTokenCommand) {
    return pipe(
      this.refreshTokenCacheStore.findBy(refreshTokenComman.userId),
      Effect.flatMap((storedToken) =>
        storedToken
          ? Effect.succeed(storedToken)
          : Effect.fail(new AppAuthException(ErrorCodes.USER_TOKEN_EXPIRED)),
      ),
      Effect.flatMap((storedToken) =>
        Effect.try({
          try: () =>
            this.jwtService.verify(storedToken, {
              secret: this.configService.get('JWT_SECRET'),
            }),
          catch: () => new AppAuthException(ErrorCodes.USER_TOKEN_EXPIRED),
        }),
      ),
      Effect.map((decoded) => ({
        userId: decoded.userId,
      })),
      Effect.flatMap((payload) =>
        Effect.succeed(
          this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION'),
          }),
        ),
      ),
      Effect.map((newAccessToken) => ({
        accessToken: newAccessToken,
      })),
    );
  }
}
