'use client'
import { axiosPrivate } from "./axios";
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const useAxiosPrivate = () => {
    const router = useRouter()
    // const { user } = useAuthContext();

    useEffect(() => {
        const userData = localStorage.getItem('userData') as any;
        const user = JSON.parse(userData)

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                config.withCredentials = true;
                if (!config.headers['Authorization'] && user) {
                    config.headers['Authorization'] = `Bearer ${user?.accessToken}`;

                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                if(error?.response?.status === 401 && error?.response?.data?.message === 'Token expired'){
                    // localStorage.removeItem('userData')
                    return router.push('/get-started/find')
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [])

    return axiosPrivate;
}

export default useAxiosPrivate;