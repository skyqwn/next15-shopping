import { ErrorCodes } from 'src/common/exception-filter/error-codes';
import { ServiceException } from 'src/common/exception-filter/service-exception';

export default class UserRefreshTokenExpiredException extends ServiceException {
  constructor() {
    super(ErrorCodes.USER_REFRESHTOKEN_EXPIRED);
  }
}
