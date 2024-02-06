'use client'

import axios from 'axios';
import React from 'react';
import { useRouter } from 'next/navigation';

const Logout = () => {
    const router = useRouter();

    const handleLogout = async() => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/logout`, {}, {
                withCredentials: true,
            })
            const resData = response.data;
            console.log(resData)
            if(resData.status === 'success') {
                localStorage.removeItem('userData');
                router.push('/get-started/find')
            }
        } catch (error) {
            console.log('ERROR IN LOGGING OUT')
        }

        
    }

    return (
        <div onClick={handleLogout} className='absolute cursor-pointer left-7 bottom-14'>Logout</div>
    )
}

export default Logout