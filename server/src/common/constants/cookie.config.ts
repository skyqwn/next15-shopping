export const COOKIE_BASE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  path: '/',
};

export const COOKIE_DURATIONS = {
  ACCESS_TOKEN: 1000 * 60 * 60 * 24, // 24시간
  USER_ID: 1000 * 60 * 60 * 24 * 7, // 7일
};
