import { ErrorCodes } from 'src/common/exception-filter/error-codes';
import { ServiceException } from 'src/common/exception-filter/service-exception';

export default class UserUnauthorizedException extends ServiceException {
  constructor() {
    super(ErrorCodes.USER_UNAUTHORIZED);
  }
}
