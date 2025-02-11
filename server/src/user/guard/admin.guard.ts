import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { RolesEnum } from '../constants/roles.constant';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (user.role !== RolesEnum.ADMIN) {
      throw new ForbiddenException(
        '접근 권한이 없습니다. 관리자 권한이 필요합니다.',
      );
    }

    return true;
  }
}
