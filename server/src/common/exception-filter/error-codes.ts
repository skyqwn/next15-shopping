export class ErrorCodes {
  constructor(
    public readonly statusCode: number,
    public readonly message: string,
  ) {
    this.statusCode = statusCode;
    this.message = message;
  }

  static USER_UNAUTHORIZED = new ErrorCodes(
    401,
    '아이디 또는 패스워드가 일치하지 않습니다.',
  );

  static USER_DUPLICATE_EMAIL = new ErrorCodes(
    409,
    '이미 가입된 이메일입니다.',
  );

  static USER_REFRESHTOKEN_EXPIRED = new ErrorCodes(
    401,
    '토큰이 만료되었습니다. 다시 로그인해주세요.',
  );
}
