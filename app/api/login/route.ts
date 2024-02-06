import { NextResponse, NextRequest } from 'next/server'
import axios from 'axios'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
    const data = await req.json()
    // console.log(data)
    const response = await axios.post('http://localhost:8000/api/users/login', data, {
        withCredentials: true
    })
    const cookieStore = cookies()
    const token = cookieStore.get('token') as any

    
    const responseData = response?.data
    return NextResponse.json(responseData)

    // return new Response(responseData, {
    //     status: 200,
    //     headers: { 'Set-Cookie': `token=${token.value}`},
    // })
}