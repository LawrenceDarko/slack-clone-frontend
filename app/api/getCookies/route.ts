import { NextRequest, NextResponse } from "next/server"
import axios from "axios";
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {

    const cookieStore = cookies()
    const cookie = cookieStore.get('token')

    return NextResponse.json({cookie})
}