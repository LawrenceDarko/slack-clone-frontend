'use client'

import CustomInput from '@/app/components/CustomInput'
import axios from 'axios'
import React, { useState } from 'react'
import { useForm, FieldValues } from 'react-hook-form'
import { RiLoader4Fill } from 'react-icons/ri';
import { useRouter } from 'next/navigation';

const SignUp = () => {
    const {control, handleSubmit, formState:{errors}} = useForm<FieldValues>()
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const router = useRouter()

    const handleFormSubmit = async(data: FieldValues) => {
        try {
            setLoading(true)
            // console.log("DATA:", data)
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/register`, data)
            const resData = response?.data

            if(resData.status === 'success'){
                router.push('/get-started/find')
            }

            console.log("REGISTRATION DATA: ", resData)
        } catch (error: any) {
            console.log(error)
            setErrorMsg(error?.response?.data)
        } finally {
            setLoading(false)
        }
        // console.log("Registration Form Data:", data);
    };

    const handleLoginClick = () => {
        router.push('/get-started/find')
    };

    return (
        <form
            onSubmit={handleFormSubmit}
            className="flex items-center justify-center w-full h-screen overflow-x-hidden overflow-y-auto"
        >
            <div className="flex flex-col items-center justify-center w-full gap-3 p-4 pb-20">
                <div className="w-40 h-16">
                    <img src="/images/logo.png" className="object-contain" alt="Logo" />
                </div>
                <div className="flex flex-col items-center">
                    <h1 className='text-xl font-bold'>Create your account</h1>
                    <p className='text-[#616061]'>Create a new account to continue or <span onClick={handleLoginClick} className='text-blue-500 cursor-pointer'>Login here</span></p>
                </div>
                
                <div className="flex flex-col items-center w-full gap-4 px-5 md:w-2/4 lg:w-1/3">
                    {/* Your existing registration component JSX */}
                    <CustomInput name='username' placeholder='Username' control={control} customStyles="py-3 focus:border-blue-500 focus:bg-[#f9fafc]" type='text' rules={{ required: 'Username is required' }} />
                    <CustomInput name='email' placeholder='Enter email' control={control} customStyles="py-3 focus:border-blue-500 focus:bg-[#f9fafc]" type='email' rules={{ required: 'Email is required' }} />
                    <CustomInput name='password' placeholder='Enter password' control={control} customStyles="py-3 focus:border-blue-500 focus:bg-[#f9fafc]" type='password' rules={{ required: 'Password is required' }} />
                    
                    {errorMsg && <p className="pt-5 italic text-red-500">{errorMsg}</p>}
                    <button
                        onClick={handleSubmit(handleFormSubmit)}
                        className="mt-2 cursor-pointer flex rounded text-white bg-[#3f1b3f] justify-center items-center h-11 w-full"
                    >
                        {loading? <RiLoader4Fill size={22} className="text-white animate-spin"/> : "Continue"}
                    </button>
                </div>
            </div>
    {/* <button onClick={refresh}>Refresh</button> */}
    </form>
    )
}

export default SignUp