import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { ErrorCodes } from 'src/common/error';
import { AppAuthException } from 'src/domain/exceptions';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user || user.role !== 'ADMIN') {
      throw new AppAuthException(ErrorCodes.FORBIDDEN_ADMIN_ONLY);
    }

    return true;
  }
}
