import { Inject, Injectable } from '@nestjs/common';

import { UserModel } from 'src/domain/model/user.model';
import { AppConflictException } from 'src/domain/exceptions/app-conflict.exception';
import { Effect, pipe } from 'effect';
import { ErrorCodes } from 'src/common/error';
import { AppNotFoundException } from 'src/domain/exceptions';
import { eq } from 'drizzle-orm';
import { UserBaseRepository } from './user-base-repository';
import {
  UserInsertType,
  users,
  UserUpdateType,
} from 'src/infrastructure/drizzle/schema/users.schema';
import { DRIZZLE } from 'src/infrastructure/drizzle/drizzle.module';
import { DrizzleDB } from 'src/infrastructure/drizzle/types/drizzle';

@Injectable()
export class UserRepository
  implements UserBaseRepository<UserInsertType, UserModel>
{
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  create(data: UserInsertType): Effect.Effect<UserModel, AppConflictException> {
    return pipe(
      Effect.sync(() => console.log('Create 입력 데이터:', data)),
      Effect.flatMap(() =>
        Effect.tryPromise(() => this.db.insert(users).values(data).returning()),
      ),
      Effect.tap((result) =>
        Effect.sync(() => console.log('DB 생성 결과:', result)),
      ),
      Effect.map(([user]) => UserModel.from(user)),
      Effect.catchAll((error) => {
        console.error('유저 생성 에러:', error);
        return Effect.fail(
          new AppConflictException(ErrorCodes.USER_ALREADY_EXISTS),
        );
      }),
    );
  }
  update(id: number, data: UserUpdateType): Effect.Effect<UserModel, Error> {
    const userPromise = Effect.tryPromise(() =>
      this.db.update(users).set(data).where(eq(users.id, id)).returning(),
    );

    return pipe(
      userPromise,
      Effect.map(([user]) => UserModel.from(user)),
      Effect.catchAll(() =>
        Effect.fail(new AppNotFoundException(ErrorCodes.USER_NOT_FOUND)),
      ),
    );
  }

  delete(id: number): Effect.Effect<void, Error> {
    const deletePromise = Effect.tryPromise(() =>
      this.db.delete(users).where(eq(users.id, id)),
    );

    return pipe(
      deletePromise,
      Effect.map(() => void 0),
    );
  }

  findOneBy(id: number): Effect.Effect<UserModel | null, Error> {
    const userPromise = Effect.tryPromise(() =>
      this.db.query.users.findFirst({
        where: eq(users.id, id),
      }),
    );

    return pipe(
      userPromise,
      Effect.map((user) => (user ? UserModel.from(user) : null)),
    );
  }

  getById(id: number): Effect.Effect<UserModel, AppNotFoundException> {
    const userPromise = Effect.tryPromise(() =>
      this.db.query.users.findFirst({
        where: eq(users.id, id),
      }),
    );

    return pipe(
      userPromise,
      Effect.map(UserModel.from),
      Effect.catchAll(() =>
        Effect.fail(new AppNotFoundException(ErrorCodes.USER_NOT_FOUND)),
      ),
    );
  }

  getByEmail(email: string): Effect.Effect<UserModel | null, never> {
    return pipe(
      Effect.tryPromise(async () => {
        const result = await this.db.query.users.findFirst({
          where: eq(users.email, email),
        });
        console.log('getByEmail DB 결과:', result);
        return result;
      }),
      Effect.map((user) => (user ? UserModel.from(user) : null)),
      Effect.catchAll((error) => {
        return Effect.succeed(null);
      }),
    );
  }
  // getByEmail(
  //   email: string,
  // ): Effect.Effect<UserModel | null, AppNotFoundException> {
  //   const userPromise = Effect.tryPromise(() =>
  //     this.db.query.users.findFirst({
  //       where: eq(users.email, email),
  //     }),
  //   );

  //   return pipe(
  //     userPromise,
  //     Effect.map(UserModel.from),
  //     Effect.catchAll(() =>
  //       Effect.fail(new AppNotFoundException(ErrorCodes.USER_NOT_FOUND)),
  //     ),
  //   );
  // }

  checkEmailExists(
    email: string,
  ): Effect.Effect<boolean, AppConflictException> {
    const emailCheckPromise = Effect.tryPromise(() =>
      this.db.query.users.findFirst({
        where: eq(users.email, email),
      }),
    );

    return pipe(
      emailCheckPromise,
      Effect.map((user) => Boolean(user)),
      Effect.catchAll(() =>
        Effect.fail(new AppConflictException(ErrorCodes.USER_ALREADY_EXISTS)),
      ),
    );
  }

  findAll(): Effect.Effect<UserModel[], Error> {
    const usersPromise = Effect.tryPromise(() =>
      this.db.query.users.findMany(),
    );

    return pipe(
      usersPromise,
      Effect.map((users) => users.map(UserModel.from)),
    );
  }
}
