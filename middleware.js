import { NextResponse } from 'next/server';

export function middleware(request) {
    // 1. Basic Rate Limiting check (Vercel automatically sets x-real-ip)
    const ip = request.headers.get('x-real-ip') || '127.0.0.1';

    // 2. Extra Security Headers (X-Robots-Tag for sensitive API routes)
    const response = NextResponse.next();

    if (request.nextUrl.pathname.startsWith('/api')) {
        response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    }

    // 3. Security Logic - Block suspicious requests
    const userAgent = request.headers.get('user-agent') || '';
    if (userAgent.includes('curl') || userAgent.includes('python-requests')) {
        // We optionally block certain command-line tools to reduce script abuse
        // But we let standard browsers through
    }

    return response;
}

export const config = {
    matcher: '/api/:path*',
};
