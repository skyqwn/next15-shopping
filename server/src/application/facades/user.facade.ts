import { Injectable } from '@nestjs/common';
import { Effect } from 'effect';

import { UserService } from 'src/domain/service/user.service';
import { SignInCommand, SignUpCommand } from 'src/domain/dtos';
import { UserSignInCriteria, UserSignUpCriteria } from '../dtos/criteria';

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
}
