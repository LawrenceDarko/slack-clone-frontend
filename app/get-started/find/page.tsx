'use client'
import React, { useState, useEffect } from 'react';
import { useFetch } from '@/app/hooks/useFetch';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useGeneralContext } from '@/app/context/GeneralContext';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/app/context/AuthContext';
import { cookies } from 'next/headers';
import useRefreshToken from '@/app/hooks/useRefreshToken';
import { RiLoader4Fill } from 'react-icons/ri';
import CustomInput from '@/app/components/CustomInput';
import { useForm, FieldValues } from 'react-hook-form';
import Link from 'next/link';

const Page = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const {control, handleSubmit, formState:{errors}} = useForm<FieldValues>()
    const router = useRouter()
    const { dispatch } = useAuthContext()

    // const cookieStore = cookies()
    // const user = cookieStore.get('token')

    // console.log(user)

    const setCookies = async(userData: any) => { 
        try {
            const response = await fetch('/api/get-cookies', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json', // Set appropriate headers
                },
                body: JSON.stringify({ token: userData.accessToken }), // Customize the data
            });
        } catch (error) {
            
        }
    }

    const handleFormSubmit = async (data: FieldValues) => {
            // "Authorization": `Bearer ${Cookies.get('refreshToken')}`
        try {
            setLoading(true)
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`, data, {
                withCredentials: true
            })
            const resData = response?.data;
            console.log(resData?.data);
            
            if(resData?.status === 'success'){
                const userdata = localStorage.setItem('userData', JSON.stringify(resData.data))
                dispatch({type: 'LOGIN', payload: resData.data})
                await setCookies(resData.data)
                router.push('/get-started/landing')
            }
        } catch (error: any) {
            console.error('Error occurred while fetching data:', error);
            setError(error?.response?.data)
        } finally {
            setLoading(false)
        }
    };



return (
    <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex items-center justify-center w-full h-screen overflow-x-hidden overflow-y-auto"
    >
    <div className="flex flex-col items-center justify-center w-full gap-3 p-4 pb-20">
        <div className="w-40 h-16">
            <img src="/images/logo.png" className="object-contain" alt="Logo" />
        </div>
        <div className="flex flex-col items-center">
            <h1 className="text-4xl font-extrabold tracking-wide">Let’s find your team</h1>
            <p className="font-medium tracking-tighter text-md">We suggest using the email address you use at work.</p>
        </div>
        
        <div className="flex flex-col items-center w-full gap-4 px-5 md:w-2/4 lg:w-1/3">
            <CustomInput name='email' placeholder='Enter email' control={control} customStyles="py-3 focus:border-blue-500 focus:bg-[#f9fafc]" type='email' rules={{ required: 'Email is required' }} />
            <CustomInput name='password' placeholder='Enter password' control={control} customStyles="py-3 focus:border-blue-500 focus:bg-[#f9fafc]" type='password' rules={{ required: 'Password is required' }} />
            
            {error && <p className="pt-5 italic text-red-500">{error}</p>}
            <button
                className="mt-2 cursor-pointer flex rounded text-white bg-[#3f1b3f] justify-center items-center h-11 w-full"
            >
                {loading? <RiLoader4Fill size={22} className="text-white animate-spin"/> : "Continue with Email"}
            </button>

            <p>Don&apos;t have an account? <Link href="/get-started/signup" className='text-blue-500'>register here</Link></p>
        </div>
    </div>
    </form>
);
};

export default Page;
