import { NextRequest, NextResponse } from "next/server"
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {

    const { token } = await req.json();

    const cookieStore = cookies()
    const cookie = cookieStore.set('token', token, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000, secure: true} )

    return NextResponse.json({cookie})
}