import { UserService } from 'src/domain/service/user.service';
import { UserSignUpCriteria } from '../dtos/criteria/user/user-sign-up-criteria';
import { SignUpCommand } from 'src/domain/dtos';
import { Injectable } from '@nestjs/common';
import { Effect } from 'effect';

@Injectable()
export class UserFacade {
  constructor(private readonly userService: UserService) {}

  signUp(userSignUpCriteria: UserSignUpCriteria) {
    const userSignUpEffect = this.userService.signUp(
      new SignUpCommand(userSignUpCriteria),
    );

    return Effect.runPromise(userSignUpEffect);
  }
}
