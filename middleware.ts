import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {

    const token = request.cookies.get('nova_session')?.value;
    const { pathname } = request.nextUrl;


    const secret = new TextEncoder().encode(process.env.JWT_SECRET);


    if (pathname.startsWith("/dashboard")) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        try {
            await jwtVerify(token, secret);

            return NextResponse.next();
        } catch (error) {
            // Si el token es inválido o expiró, borrar cookie y mandar a login
            const response = NextResponse.redirect(new URL('/login', request.url));
            response.cookies.delete("nova_session");
            return response;
        }
    }


    if (pathname === '/login' || pathname === '/register') {
        if (token) {
            try {
                await jwtVerify(token, secret);
                // Si el token es válido y trata de entrar a /login, redirigir a /dashboard
                return NextResponse.redirect(new URL('/dashboard', request.url));
            } catch (error) {
                // Si el token no es válido, no hacemos nada y dejamos que vea el login/register
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/login', '/register'],
};