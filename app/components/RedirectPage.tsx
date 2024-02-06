'use client'

import {useEffect} from 'react'
import { useRouter } from 'next/navigation'

const RedirectPage = () => {

    const router = useRouter()

    useEffect(() => {
        router.replace('/get-started/find')
    }, [])
    

    return (
        <></>
    )
}

export default RedirectPage