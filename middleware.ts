import { NextRequest, NextResponse } from "next/server";
import { useRouter } from "next/navigation";


export function decodedToken(token: string): any | null {
    try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        return decoded as any;
    } catch (error) {
        console.error('Token decoding error:', error);
        return null;
    }
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const url = request.nextUrl.clone();

    const token = request.cookies.get('token' as string)?.value;
    // const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9mYzU2LTE5Ny0yNTEtMjIwLTc0Lm5ncm9rLWZyZWUuYXBwXC9sb2dpbiIsImlhdCI6MTcwNDQ2NDE2MCwiZXhwIjoxNzA0NDY3NzYwLCJuYmYiOjE3MDQ0NjQxNjAsImp0aSI6ImdBUDlqdWtpRUk4RTlXNEQiLCJzdWIiOjMsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.N6PBt5Dfc_mlCySFQnBruUtGarSWN8IfGmZyPQa2624"

    if(!token && pathname !== '/get-started/find' &&  !pathname.startsWith('/invite/')){
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/get-started/find`)
    }

    if (token) {
        
        const user = decodedToken(token as string) as any;
        // console.log(user)

        // if token is expired then redirect to login page
        if (user.exp < Date.now()/1000 && pathname !== '/get-started/find') {
            url.pathname = "/get-started/find";
            return NextResponse.redirect(new URL(url, request.url));
        }

        // if (user.exp > Date.now()/1000 && pathname === '/get-started/find') {
        //     // url.pathname = "/";
        //     return;
        //     // return NextResponse.redirect(url);
        // }

    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/get-started/find',
        '/get-started/landing',
        '/client/:path*',
        '/invite/:path*'
        ],
}

