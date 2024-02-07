'use client'

import React, { useState } from 'react'
import { useForm, FieldValues } from 'react-hook-form'
import CustomInput from '@/app/components/CustomInput';
import { RiLoader4Fill } from 'react-icons/ri'
import { useParams } from 'next/navigation';
import useAxiosPrivate from '@/app/hooks/useAxiosPrivate';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/app/context/AuthContext';



const Login = ({ onLogin }: { onLogin: any}) => {
    const { control, handleSubmit, formState: { errors } } = useForm<FieldValues>()
    const { dispatch } = useAuthContext()
    const [loading, setLoading] = useState(false)

    const params = useParams()
    const router = useRouter()
    const axiosInstance = useAxiosPrivate()
    const token = params.inviteToken

    const handleLoginFormSubmit = async(data: FieldValues) => {
        // Handle login logic here
        // console.log("Login Form Data:", data);
        try {
            setLoading(true)
            // console.log("DATA:", data)
            const registrationData = {
                ...data,
                invitationToken: token[1],
                workspace_id: token[0],
            }
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login-with-invitation`, registrationData, {
                withCredentials: true
            })
            const resData = response?.data

            if(resData?.status === 'success'){
                // localStorage.removeItem('userData')
                const userdata = localStorage.setItem('userData', JSON.stringify(resData.data))
                dispatch({type: 'LOGIN', payload: resData.data})
                console.log("LOGIN DATA:", userdata)
                router.push(`/client/${token[0]}`)
                // router.push('/get-started/landing')
            }
            // console.log("REGISTRATION DATA: ", resData)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
        onLogin();
    };

    return (
        <div className='flex flex-col items-center justify-center w-full'>
            <h1 className='py-4 text-xl font-bold'>Login to your account</h1>
            <div className="flex flex-col items-center w-full gap-4 px-5 md:w-2/4 lg:w-1/3">
                <CustomInput name='email' placeholder='Enter email' control={control} customStyles="py-3 focus:border-blue-500 focus:bg-[#f9fafc]" type='email' rules={{ required: 'Email is required' }} />
                <CustomInput name='password' placeholder='Enter password' control={control} customStyles="py-3 focus:border-blue-500 focus:bg-[#f9fafc]" type='password' rules={{ required: 'Password is required' }} />
                
                <button
                    onClick={handleSubmit(handleLoginFormSubmit)}
                    className="mt-2 cursor-pointer flex rounded text-white bg-[#3f1b3f] justify-center items-center h-11 w-full"
                >
                    {loading? <RiLoader4Fill size={22} className="text-white animate-spin"/> : "Login"}
                </button>
            </div>
        </div>
    );
}


const InvitePage = () => {
    const {control, handleSubmit, formState:{errors}} = useForm<FieldValues>()
    const [showLogin, setShowLogin] = useState(false);
    const [loading, setLoading] = useState(false)
    
    const router = useRouter()
    const params = useParams()
    
    const token = params.inviteToken

    const handleFormSubmit = async(data: FieldValues) => {
        try {
            setLoading(true)
            console.log("DATA:", data)
            const registrationData = {
                ...data,
                invitationToken: token[1],
                workspace_id: token[0],
            }
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/register-with-invitation`, registrationData)
            const resData = response?.data

            if(resData.status === 'success'){
                setShowLogin(true)
            }

            console.log("REGISTRATION DATA: ", resData)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
        // console.log("Registration Form Data:", data);
    };

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    const handleLoginComplete = () => {
        // Additional actions after successful login (if needed)
        // router.push(`/client/${token[0]}`)
    };
    
    return (
        <div className="w-full h-full">
            <div className="relative w-full flex flex-col h-full pb-20 bg-[#F9F6F1] md:px-6 lg:px-12 xl:px-48 justify-center items-center">
                <div className="w-40 h-16 mb-20">
                    <img src="/images/logo.png" className="object-contain" alt="Logo" />
                </div>
                <div className="flex items-center justify-center w-[65%] gap-5 flex-col">
                    <h1 className='text-4xl font-bold tracking-wide text-center'>Join <span className='text-[#3F0E40]'>New Workpace</span> on Slack</h1>
                    <p>Slack is a messaging app that brings your whole team together</p>
                    {/* <div className="absolute -bottom-[30px] left-[47.5%] rounded-full bg-white p-6">OR</div> */}
                </div>
            </div>
            <div className="flex w-full flex-col pt-[35px] items-center justify-center"> 
            <div className="flex items-center">
                <p className="">You&apos;re accepting an invitation sent to <span className='font-semibold'>darkolawrence@gmail.com</span></p>
            </div>
            <div className="flex flex-col items-center justify-center w-full gap-3 p-4 pb-20">
                {showLogin ? (
                    <Login onLogin={handleLoginComplete} />
                ) : (
                    <>
                        <div className="flex flex-col items-center">
                            <h1 className='text-xl font-bold'>Create your account</h1>
                            <p className='text-[#616061]'>Create a new account to continue or <span onClick={handleLoginClick} className='text-blue-500 cursor-pointer'>Login here</span></p>
                        </div>
                        
                        <div className="flex flex-col items-center w-full gap-4 px-5 md:w-2/4 lg:w-1/3">
                            {/* Your existing registration component JSX */}
                            <CustomInput name='username' placeholder='Username' control={control} customStyles="py-3 focus:border-blue-500 focus:bg-[#f9fafc]" type='text' rules={{ required: 'Username is required' }} />
                            <CustomInput name='email' placeholder='Enter email' control={control} customStyles="py-3 focus:border-blue-500 focus:bg-[#f9fafc]" type='email' rules={{ required: 'Email is required' }} />
                            <CustomInput name='password' placeholder='Enter password' control={control} customStyles="py-3 focus:border-blue-500 focus:bg-[#f9fafc]" type='password' rules={{ required: 'Password is required' }} />
                            
                            <button
                                onClick={handleSubmit(handleFormSubmit)}
                                className="mt-2 cursor-pointer flex rounded text-white bg-[#3f1b3f] justify-center items-center h-11 w-full"
                            >
                                {loading? <RiLoader4Fill size={22} className="text-white animate-spin"/> : "Continue"}
                            </button>
                        </div>
                    </>
                )}
                
            </div>
            
            </div>
        </div>
    )
}

export default InvitePage