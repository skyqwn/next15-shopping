import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/common/decorators/is-public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log('isPublic:', isPublic);

    console.log('유저정보', user);
    const req = context.switchToHttp().getRequest();

    if (isPublic) {
      req.isRoutePublic = true;
      return true;
    }

    console.log(
      'Token in request cookies jwt-auth.guard.ts:',
      req?.cookies?.accessToken,
    );

    console.log('User in handleRequest jwt-auth.guard.ts:', user);
    console.log('Error in handleRequest:', err);

    if (err || !user) {
      throw err || new UnauthorizedException('가드에서 에러입니다.');
    }

    return user;
  }

  async validate(payload: { userId: number }) {
    console.log('jwt-auth-guard.ts :', payload); // 여기가 호출되지 않는 경우 문제 발생
    // 사용자 인증 로직
  }
}
