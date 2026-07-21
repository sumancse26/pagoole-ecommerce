import { NextResponse } from 'next/server';
import NextAuth from 'next-auth';
import authConfig from '@/auth.config';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const session = req.auth;
    const { pathname } = req.nextUrl;

    const protectedRoutes = ['/dashboard', '/api/private'];
    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

    if (isProtectedRoute && !session) {
        return NextResponse.redirect(new URL('/login', req.url));
    }


    if (session && Number(session?.user?.id) >=0) {
        const requestHeaders = new Headers(req.headers);

        requestHeaders.set('user_id', Number(session?.user.id));
        requestHeaders.set('user_role', Number(session?.user?.role));
        if (session.email) {
            requestHeaders.set('user_email', session?.user.email);
        }

        return NextResponse.next({
            request: {
                headers: requestHeaders
            }
        });
    }

    return NextResponse.next();
});

// export const config = {
//     matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)']
// };
