export const publicUrls: Record<string, boolean> = {
  "/auth/login": true,
  "/auth/register": true,
  "/auth/email-verify": true,
  "/auth/email-login": true,
  "/auth/email-register": true,
  "/shop": true,
};

export function isPublicRoute(pathname: string): boolean {
  return !!publicUrls[pathname];
}
