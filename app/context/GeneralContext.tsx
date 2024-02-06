'use client'

import React, { useState, createContext, useContext, useEffect } from 'react';
import useAxiosPrivate from "@/app/hooks/useAxiosPrivate";
import { useParams } from 'next/navigation';
import axios from 'axios';
import { useAuthContext } from './AuthContext';

interface GeneralContextType {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
    getWorkspaceChannels: () => void;
    channelList: any;
    getWorkspaceUsers: () => void;
    worksapceUsers: any;
    showInviteModal: boolean;
    setShowInviteModal: (value: boolean) => void;
    showWorkspaceModal: boolean;
    setShowWorkspaceModal: (value: boolean) => void;
    
}

export const GeneralContext = createContext<GeneralContextType | undefined>(undefined);

interface GeneralContextProviderProps {
    children: React.ReactNode;
}

export const GeneralContextProvider: React.FC<GeneralContextProviderProps> = ({ children }) => {
    const params = useParams()
    const workspaceId = params.workspaceId
    const axiosInstance = useAxiosPrivate();
    const { user } = useAuthContext()

    const [showModal, setShowModal] = useState(false);
    const [showInviteModal, setShowInviteModal] = useState<any>(false)
    const [showWorkspaceModal, setShowWorkspaceModal] = useState(false)

    const [channelList, setChannelList] = useState<any>([])
    const [worksapceUsers, setWorksapceUsers] = useState([])
    // console.log(user)

    const getWorkspaceChannels = async() => {
        
        try {
            if(workspaceId){
            // console.log("WS ID", workspaceId)
            const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/channels/workspace-channels/${workspaceId}`)
            const responseData = response?.data
            setChannelList(responseData?.data)
            // getWorkspaceChannels()
            // console.log("CHANNELS:", responseData?.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getWorkspaceUsers = async() => {
        if(!workspaceId || !user) return;
            
        try {
            const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/workspace/all-workspace-users/${workspaceId}`)
            const responseData = response?.data
            // console.log(responseData)
            setWorksapceUsers(responseData.filter((directChatInfo: any) => directChatInfo?.user?._id !== user?.id))
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getWorkspaceChannels()
        getWorkspaceUsers()
    }, [workspaceId])

    


    return (
        <GeneralContext.Provider value={{
            showModal,
            setShowModal,
            getWorkspaceChannels,
            channelList,
            getWorkspaceUsers,
            worksapceUsers,
            showInviteModal,
            setShowInviteModal,
            showWorkspaceModal,
            setShowWorkspaceModal
        }}>
        {children}
        </GeneralContext.Provider>
    );
    }

    export const useGeneralContext = (): GeneralContextType => {
    const context = useContext(GeneralContext);
    
    if (!context) {
        throw new Error('useGeneralContext must be used within a GeneralContextProvider');
    }
    
    return context;
};
