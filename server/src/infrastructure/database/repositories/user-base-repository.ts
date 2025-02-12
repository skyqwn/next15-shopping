import { Effect } from 'effect';
import { BaseRepository } from './base.repository';
import {
  AppNotFoundException,
  AppConflictException,
} from 'src/domain/exceptions';

export interface UserBaseRepository<T, R> extends BaseRepository<T, R> {
  getByEmail(email: string): Effect.Effect<R | null, AppNotFoundException>;
  checkEmailExists(email: string): Effect.Effect<void, AppConflictException>;
}
