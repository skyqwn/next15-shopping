import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Effect, pipe } from 'effect';
import { FiberFailureCauseId } from 'effect/Runtime';
import type { Observable } from 'rxjs';
import { catchError, mergeMap } from 'rxjs';
import { ApplicationException } from 'src/domain/exceptions';
import { AppAuthException } from 'src/domain/exceptions/app-auth.exception';
import { AppConflictException } from 'src/domain/exceptions/app-conflict.exception';
import { AppNotFoundException } from 'src/domain/exceptions/app-not-found.exception';

@Injectable()
export class EffectInterceptor implements NestInterceptor {
  constructor() {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const handler = context.getHandler();
    const className = context.getClass().name;
    const methodName = handler.name;
    const spanName = `${className}.${methodName}`;

    return next.handle().pipe(
      mergeMap(async (value) => {
        return await Effect.runPromise(
          pipe(
            Effect.if(Effect.isEffect(value), {
              onTrue: () => value,
              onFalse: () => Effect.tryPromise(() => value),
            }),
            Effect.flatMap((ret) =>
              ret instanceof ApplicationException
                ? Effect.fail(ret)
                : Effect.succeed(ret),
            ),
            Effect.catchAll((error) => {
              throw error;
            }),
          ) as Effect.Effect<unknown, unknown, never>,
        );
      }),
      catchError((error) => {
        if (!Effect.isFailure(error)) throw error;
        switch (error[FiberFailureCauseId].defect._tag) {
          case 'AppAuthException':
            throw new AppAuthException(undefined, error.message);
          case 'AppNotFoundException':
            throw new AppNotFoundException(undefined, error.message);
          case 'AppConflictException':
            throw new AppConflictException(undefined, error.message);
          default:
            throw error;
        }
      }),
    );
  }
}
