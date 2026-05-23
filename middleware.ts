import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  const isDashboard = pathname.startsWith('/dashboard');
  const isApiDashboard = pathname.startsWith('/api/dashboard');

  if (isDashboard && !isLoggedIn) {
    // Redirect to login page
    const loginUrl = new URL('/login', req.nextUrl.origin);
    // Keep reference of current URL for post-login redirect
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.href);
    return Response.redirect(loginUrl);
  }

  if (isApiDashboard && !isLoggedIn) {
    return Response.json(
      { error: 'Authentication required to access dashboard resources' },
      { status: 401 }
    );
  }
});

export const config = {
  matcher: [
    /*
     * Match all dashboard routes and dashboard API routes
     */
    '/dashboard/:path*',
    '/api/dashboard/:path*',
  ],
};
