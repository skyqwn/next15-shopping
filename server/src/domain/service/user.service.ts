import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { pipe, Effect } from 'effect';

import { UserRepository } from 'src/infrastructure/database/repositories/user.repository';
import { SignUpCommand, UserInfo } from '../dtos';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

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
}
