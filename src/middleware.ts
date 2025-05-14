import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuthenticatedCookie = request.cookies.get('isAuthenticated')?.value;
  const isAuthenticated = isAuthenticatedCookie === 'true';
  const path = request.nextUrl.pathname;

  const isLoginPage = path === '/login';
  const isProtectedPage = path.startsWith('/admin');

  if (isAuthenticated && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!isAuthenticated && isProtectedPage) {
    return NextResponse.redirect(
      new URL(`/login?from=${encodeURIComponent(path)}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match tất cả request trừ các route:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/admin/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
