import React, {useEffect} from 'react'
import { useRouter } from 'next/router'

const RedirectComponent = () => {
    const router = useRouter()
    
    useEffect(() => {
        // router.push('/client')
    }, [])
    


    return (
        <div></div>
    )
}

export default RedirectComponent