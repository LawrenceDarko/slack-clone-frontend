'use client'

import React, {useEffect} from 'react'
import { useRouter } from 'next/router'

const LoginRedirect = () => {
    const router = useRouter()
    useEffect(() => {
        router.push('/get-started/find')
    }, [])
    
    return (
        <div></div>
    )
}

export default LoginRedirect