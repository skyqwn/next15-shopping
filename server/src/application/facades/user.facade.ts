import { Injectable } from '@nestjs/common';
import { Effect, pipe } from 'effect';

import { UserService } from 'src/domain/service/user.service';
import { SignInCommand, SignUpCommand } from 'src/domain/dtos';
import {
  RefreshTokenCriteria,
  UpdateProfileCriteria,
  UserSignInCriteria,
  UserSignUpCriteria,
} from '../dtos/criteria';
import { UserInsertType } from 'src/infrastructure/drizzle/schema/users.schema';

@Injectable()
export class UserFacade {
  constructor(private readonly userService: UserService) {}

  signUp(userSignUpCriteria: UserSignUpCriteria) {
    const userSignUpEffect = this.userService.signUp(
      new SignUpCommand({
        email: userSignUpCriteria.email,
        password: userSignUpCriteria.password,
        name: userSignUpCriteria.name,
      }),
    );

    return Effect.runPromise(userSignUpEffect);
  }

  signIn(userSignInCriteria: UserSignInCriteria) {
    return this.userService.signIn(
      new SignInCommand({
        email: userSignInCriteria.email,
        password: userSignInCriteria.password,
      }),
    );
  }

  refreshToken(refreshTokenCriteria: RefreshTokenCriteria) {
    return this.userService.refreshToken(refreshTokenCriteria);
  }

  getMyProfile(userId: number) {
    return this.userService.getMyProfile(userId);
  }

  signOut(userId: string) {
    return this.userService.signOut(userId);
  }

  updateProfile(updateProfileCriteria: UpdateProfileCriteria, userId: number) {
    return this.userService.updateProfile(updateProfileCriteria, userId);
  }
  removeRefreshToken(userId: string) {
    return this.userService.removeRefreshToken(userId);
  }
}
