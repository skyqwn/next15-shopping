import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { pipe, Effect } from 'effect';
import * as bcrypt from 'bcrypt';

import { UserRepository } from 'src/infrastructure/database/repositories/user.repository';
import {
  RefreshTokenCommand,
  SignInCommand,
  SignUpCommand,
  UpdateProfileCommand,
  UserInfo,
} from '../dtos';
import {
  AppAuthException,
  AppConflictException,
  AppNotFoundException,
} from '../exceptions';
import { ErrorCodes } from 'src/common/error';
import { ConfigService } from '@nestjs/config';
import {
  RefreshTokenCacheStore,
  UserCacheStore,
} from 'src/infrastructure/cache';
import { KakaoProfile } from 'src/infrastructure/auth/strategies';
import { UserModel } from '../model/user.model';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    private readonly refreshTokenCacheStore: RefreshTokenCacheStore,
    private readonly userCacheStore: UserCacheStore,

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

        return pipe(
          this.createTokens(user),
          Effect.tap(({ accessToken }) =>
            Effect.sync(() => {
              const decoded = this.jwtService.decode(accessToken);
              console.log('Access Token 정보:', {
                exp: new Date(decoded.exp * 1000),
                iat: new Date(decoded.iat * 1000),
                expiresIn: this.configService.get(
                  'JWT_ACCESS_TOKEN_EXPIRATION',
                ),
              });
            }),
          ),
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
              loginType: profile.loginType,
              imageUri: profile.imageUri,
              isVerified: profile.isVerified,
            }),
            Effect.flatMap((user) => this.createTokens(user)),
          );
        }

        return pipe(
          Effect.succeed({
            email: profile.email,
            name: profile.name,
            imageUri: profile.imageUri || null,
            loginType: profile.loginType,
            isVerified: profile.isVerified,
            role: profile.role,
            password: null,
            description: null,
          }),
          Effect.flatMap((data) => this.userRepository.create(data)),
          Effect.flatMap((user) => this.createTokens(user)),
        );
      }),
      Effect.catchAll((error) => {
        console.error('카카오 인증 처리 중 에러:', error);
        return Effect.fail(new AppAuthException(ErrorCodes.USER_AUTH_FAILED));
      }),
    );
  }

  private createTokens(user: UserModel) {
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
    );
  }

  refreshToken(refreshTokenComman: RefreshTokenCommand) {
    return pipe(
      this.refreshTokenCacheStore.findBy(refreshTokenComman.userId),
      Effect.tap((token) =>
        Effect.sync(() => console.log('Found refresh token:', token)),
      ),
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
      Effect.tap((token) =>
        Effect.sync(() => console.log('New access token:', token)),
      ),
      Effect.map((accessToken) => ({
        accessToken,
      })),
    );
  }

  getMyProfile(userId: number) {
    return pipe(
      this.userCacheStore.findBy(userId.toString()),
      Effect.flatMap((cachedUser) =>
        cachedUser
          ? Effect.succeed(cachedUser)
          : pipe(
              this.userRepository.findOneBy(userId),
              Effect.flatMap((user) =>
                user
                  ? pipe(
                      this.userCacheStore.cache(userId.toString(), user),
                      Effect.map(() => user),
                    )
                  : Effect.fail(
                      new AppNotFoundException(ErrorCodes.USER_NOT_FOUND),
                    ),
              ),
            ),
      ),
    );
  }

  updateProfile(command: UpdateProfileCommand, userId: number) {
    return pipe(
      this.userRepository.update(userId, {
        name: command.name,
        description: command.description,
        imageUri: command.profileImageUris,
        updatedAt: new Date(),
      }),
      Effect.flatMap((updatedUser) =>
        pipe(
          this.userCacheStore.cache(userId.toString(), updatedUser),
          Effect.map(() => updatedUser),
        ),
      ),
    );
  }

  removeRefreshToken(userId: string) {
    return pipe(
      this.refreshTokenCacheStore.remove(userId.toString()),
      Effect.catchAll((error) => {
        console.error('리프레시 토큰 삭제 중 에러:', error);
        return Effect.fail(new AppAuthException(ErrorCodes.USER_TOKEN_EXPIRED));
      }),
    );
  }

  signOut(userId: string) {
    return pipe(
      Effect.all([
        this.refreshTokenCacheStore.remove(userId.toString()),
        this.userCacheStore.remove(userId),
      ]),
      Effect.map(() => true),
    );
  }
}
