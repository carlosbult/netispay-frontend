// import { NextResponse } from 'next/server';

// import type { NextRequest } from 'next/server';

// export async function middleware(request: NextRequest): Promise<NextResponse> {
//   console.log('Middleware ejecutado');
//   const authToken = request.cookies.get('session_token');

//   const tokenValue = authToken?.value ?? '';

//   console.log('this is the token', tokenValue);

//   return NextResponse.next();
// }

// Login handler (pages/api/login.ts or app/api/login/route.ts)
// Middleware (middleware.ts)
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Define public paths that don't need authentication
const publicPaths = [
  '/sign-in',
  '/sign-up',
  '/forgot-password',
  '/reset-password',
  '/about',
  '/contact',
  '/', // homepage
  '/api/public', // public API routes
];

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files and public assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/public') ||
    pathname.includes('/api/public') ||
    pathname.includes('.') // for files like favicon.ico, images, etc.
  ) {
    return NextResponse.next();
  }

  // Check if the current path is public
  const isPublicPath = publicPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  // Get auth tokens
  const authToken = request.cookies.get('session_token');
  // const tokenExpires = request.cookies.get('token_expires');
  const authData = request.cookies.get('auth_data');
  const tokenExpires: string | null =
    authData != null ? JSON.parse(authData.value) : null;
  // get data for localstorage
  // if (typeof window !== 'undefined') {
  //   const userId = localStorage.getItem('userId');
  //   const userRole = localStorage.getItem('userRole');

  //   if (userRole != null) {
  //     // If user data exists in localStorage, redirect to dashboard
  //     if (userRole === 'admin') {
  //       return NextResponse.redirect(new URL('/admin', request.url));
  //     } else {
  //       return NextResponse.redirect(new URL('/overview', request.url));
  //     }
  //   }
  // }

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/overview', request.url));
  }

  // Handle public paths
  if (isPublicPath) {
    // If user is already authenticated and tries to access login/signup pages,
    // redirect them to dashboard
    if (
      authToken != null &&
      tokenExpires != null &&
      pathname.includes('/sign-in')
    ) {
      return NextResponse.redirect(new URL('/overview', request.url));
    }
    return NextResponse.next();
  }

  // For protected routes, check if user is authenticated
  if (authToken == null || tokenExpires == null) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // Check token expiration
  const currentTime = Date.now();
  const expirationTime = new Date(tokenExpires).getTime();

  if (currentTime >= expirationTime) {
    const response = NextResponse.redirect(new URL('/sign-in', request.url));
    response.cookies.delete('session_token');
    response.cookies.delete('token_expires');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Include all paths that need checking
    '/(.*)',

    // Exclude static files and api routes that should always be public
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
