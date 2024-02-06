'use client'

import React, { useState, useEffect} from "react";
import WorkspaceItem from './WorkspaceItem'
import { useAuthContext } from '@/app/context/AuthContext'
import useAxiosPrivate from "@/app/hooks/useAxiosPrivate";
import { useRouter } from "next/navigation";

const WorkspacesCard = ({ modalState }: {modalState?: any}) => {

    const [workpaces, setWorkpaces] = useState() as any
    const { user } = useAuthContext()
    const router = useRouter()
    const axiosInstance = useAxiosPrivate();

    const getData = async() => {
        if(!user){
            return;
        }
        const controller = new AbortController();

        try {
            const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/workspace/all-user-workspaces/${user?.id}`, {
                signal: controller.signal,
                withCredentials: true
            })
            const responseData = response.data
            setWorkpaces(responseData)
            // console.log(responseData)

            responseData.map((item: any)=>(console.log(item.workspace.name)))
            // controller.abort()
        } catch (error) {
            console.log(error)
        }
    }

    const handleOnclick = (workspaceId: any) => {
        router.push(`/client/${workspaceId}`)
    }

    
    useEffect(() => {
        getData()
    }, [user, modalState])

    return (
        <div className='border flex flex-col h-full rounded-sm shadow-md w-full md:w-[40%]'>
            <div className='p-3 border-b'>
                <p>Workspaces for {user?.email}</p>
            </div>
            <div className='flex flex-col w-full h-full'>
                {workpaces?.map((item: any, i: any) => 
                    <div key={i} onClick={()=>handleOnclick(item?.workspace?._id)}>
                        <WorkspaceItem spaceName={item?.workspace?.name} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default WorkspacesCard