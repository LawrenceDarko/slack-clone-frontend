'use client'

import React, { useState, useEffect, useRef } from 'react'
import { BiSolidUserRectangle } from "react-icons/bi";
import { IoMdSend } from "react-icons/io";
import RoomNav from "@/app/components/navbars/RoomNav";
import { useParams } from 'next/navigation';
import { useAuthContext } from "@/app/context/AuthContext";
import { useGeneralContext } from '@/app/context/GeneralContext';
import { axiosPrivate } from '@/app/hooks/axios';
import { io } from "socket.io-client";
import TextEditor from '@/app/components/TextEditor';




const RoomPage = () => {
    const params = useParams()
    const socket = useRef(io(`${process.env.NEXT_PUBLIC_SOCKET_URL}`)) as any

    const { user } = useAuthContext()
    const { setAddPeopleModal } = useGeneralContext()
    const [messages, setMessages] = useState([]) as any
    const [newMessage, setNewMessage] = useState("")
    const [friendInfo, setFriendInfo] = useState() as any
    const [workspaceInfo, setWorkspaceInfo] = useState<any>(null)

    const controller = new AbortController();
    const lastMessageRef = useRef<HTMLDivElement | null>(null);
    const directChatIdOrChannelId = params.roomId as any
    const workspaceId = params.workspaceId

    // console.log("ID:", typeof(directChatIdOrChannelId))



    const getFriendInfo = async() => { 
        try {
            const response = await axiosPrivate.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/direct-chat/room/${directChatIdOrChannelId}`)
            const roomData = response?.data
            // console.log("ROOM DATA:", roomData)
            if(roomData?.status === 'success' && user){
                const friendId = roomData?.data?.members.find((member: any) => member !== user?.id);
                // Make api call to fetch friend information
                const response = await axiosPrivate.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${friendId}`)
                const responseData = response?.data
                // console.log('FRIEND DATA:', responseData)
                if(responseData?.status === 'success'){
                    setFriendInfo(responseData?.data)
                }
            }
        } catch (error) {
            console.log("ERROR GETTING FRIEND DATA", error)
        }
    }

    const getAllMessagesBelongingToAChat = async() => {

        try {
            // directChatIdOrChannelId is the same as the space_id for the direcChat
            const response = await axiosPrivate.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/direct-chat/${directChatIdOrChannelId}`, {
            withCredentials: true,
            signal: controller.signal
        })
        const messagesData = response?.data
        // console.log(messagesData)
        setMessages(messagesData)
        } catch (error) {
            console.log(error)
        }
        // controller.abort()
    }

    const getAllMessagesBelongingToAChannel = async() => {

        try {
            // directChatIdOrChannelId is the same as the space_id for the channel
            const response = await axiosPrivate.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/channels/messages/${directChatIdOrChannelId}`, {
            withCredentials: true,
            signal: controller.signal
        })
        const messagesData = response?.data
        console.log(messagesData)
        setMessages(messagesData)
        } catch (error) {
            console.log(error)
        }
        
        // controller.abort()
    }


    const sendMessage = async (e: any) => {
        e.preventDefault();
    
        const data = {
            sender_id: user.id,
            direct_chat_id: directChatIdOrChannelId,
            message_body: newMessage,
            username: user.username,
            createdAt: new Date()
        };
    
        console.log(data);
    
        try {
            let endpoint;
    
            if (directChatIdOrChannelId.startsWith('DC')) {
                // If the directChatIdOrChannelId starts with 'DC'
                endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/direct-chat/message`;
            } else if (directChatIdOrChannelId.startsWith('CH')) {
                // If the directChatIdOrChannelId starts with 'CH'
                endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/channels/message`;
            } else {
                // Handle other cases if needed
                console.error('Invalid directChatIdOrChannelId format');
                return;
            }
    
            const response = await axiosPrivate.post(endpoint, data);
            
            const messagesData = response?.data;
            socket.current.emit("sendMessage", data);

            // await setMessages((prev: any) => [...prev, messagesData]);
            setNewMessage('');
            console.log(messagesData);
        } catch (error) {
            console.error(error);
        }
    };

    const getChannelInfo = async() => {
        try {
            const response = await axiosPrivate.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/channels/${directChatIdOrChannelId}`)
            const responseData = response?.data
            setWorkspaceInfo(responseData)
        } catch (error) {
            console.log("ERROR GETTING WORKSPACE INFO", error)
        }
    }


    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    useEffect(() => {
        getChannelInfo()
    }, [])
    
    useEffect(() => {
        // if the first two letters of the directChatIdOrChannelId are DC, then get messages for chat and if it s CH then get for channels
        if(directChatIdOrChannelId.slice(0,2) === 'DC'){
            getAllMessagesBelongingToAChat()
            getFriendInfo()
        } else if(directChatIdOrChannelId.slice(0,2) === 'CH'){
            getAllMessagesBelongingToAChannel()
        }
        
    }, [user])



    useEffect(() => {
        // Listen for received messages
        socket.current.on("receiveMessage", (data: any) => {
            // Update the local state to show the received message
            setMessages((prev: any) => [...prev, data]);
        });

        // Clean up the socket connection when the component unmounts
        return () => {
            socket.current.disconnect();
        };
    }, []);
    
    useEffect(() => {
        if (!user) return;
    
        socket.current.emit("addUser", user?.id);
    
        // Join the room or channel
        socket.current.emit("joinRoom", directChatIdOrChannelId);
    
        socket.current.on("getUser", (updatedUsers: any) => {
            console.log("ONLINE USERS:", updatedUsers);
        });
    }, [user, directChatIdOrChannelId]);
    
    
    
    return (
        <div className='relative w-full h-screen'>
            <RoomNav user={friendInfo?.username} isChannel={directChatIdOrChannelId.startsWith('CH')} channelName={workspaceInfo?.data?.name}/>
            <section className="flex flex-col flex-1 w-full h-full overflow-x-hidden overflow-y-auto">
                <section className="w-full h-full gap-3 pb-10 overflow-y-auto pt-72">
                    <div className="flex items-center">
                        {directChatIdOrChannelId.startsWith('CH') ?
                            <p className={`${!workspaceInfo?.data?.name && "invisible"} p-3 text-2xl font-semibold`}># {workspaceInfo?.data?.name}</p>
                            :  <BiSolidUserRectangle className='text-[#007A5A] text-9xl'/>}
                        {/* <h1 className="font-semibold">{messages?.username}</h1> */}
                    </div>
                    <div className="px-3">
                        <p>{`This conversation is just between @${friendInfo?.username}. and you. Check out their profile to learn more about them.`}</p>
                    </div>
                    <div className="flex gap-3 px-3">
                        {directChatIdOrChannelId.startsWith('CH') &&
                        <div onClick={()=>setAddPeopleModal(true)} className="flex px-3 py-2 text-sm hover:bg-[#F8F8F8] dark:hover:bg-transparent border border-gray-400 rounded-[5px] cursor-pointer">
                            <p>Add Coworkers</p>
                        </div>
                        }
                        <div className="flex dark:hover:bg-transparent cursor-pointer px-3 py-2 text-sm hover:bg-[#F8F8F8] border border-gray-400 rounded-[5px]">
                            <p>View Profile</p>
                        </div>
                    </div>

                    {messages && <section className='flex flex-col w-full h-full gap-3 p-3 cursor-pointer'>
                        {messages?.map((message: any, i: any) => {
                                const createdAtDate = new Date(message?.createdAt);
                                const options: any = { hour: '2-digit', minute: '2-digit' };
                                const formattedTime = createdAtDate.toLocaleTimeString(undefined, options);
                                const formattedDate = createdAtDate.toDateString();

                                // Check if it's a new day
                                const isNewDay = i === 0 || formattedDate !== new Date(messages[i - 1].createdAt).toDateString();

                                return (
                                    <>
                                    {isNewDay && (
                                        <div className="w-full relative flex justify-center dark:border-gray-600 items-center mb-2 text-center border-t-[1px] border-gray-200">
                                            <span className="absolute font-semibold p-2 -bottom-[14px] text-xs rounded-3xl border bg-white dark:border-gray-600 dark:bg-[var(--dark-theme-bg-color)] border-gray-200">
                                                {formattedDate}
                                            </span>
                                        </div>
                                    )}
                                    <div ref={i === messages.length - 1 ? lastMessageRef : null} key={i} className='flex items-start justify-start w-full gap-2 p-2 hover:bg-[#F8F8F8] dark:hover:bg-[#222529]'>
                                        <div className='w-12 h-12 rounded-md flex-[0.04]'>
                                            <BiSolidUserRectangle className="w-full h-full text-gray-900 dark:bg-[#350D36] dark:text-white"/>
                                        </div>
                                        <div className='pt-2 flex-[0.96]'>
                                            <p className='font-bold leading-[1.4px]'>{message?.username} <span className='text-xs font-normal text-[#5F5F5F]'>{formattedTime}</span></p>
                                            <p className='font-normal text-[15px] text-[#5F5F5F]'>{message?.message_body}</p>
                                        </div>
                                    </div>
                                    </>
                                );
                            })}
                            
                    </section>}
                </section>
                <section className="m-5 flex border-1 flex-col active:border-black bottom-2 left-3 right-3 h-20  min-h-[50px] z-19">
                    {/* <TextEditor /> */}
                    <form action="" className='flex dark:border-[#35373B] dark:bg-[#222529] w-full h-full overflow-hidden border rounded-lg'>
                        <input className='w-full h-full rounded-lg p-3 outline-none dark:bg-[#222529]' value={newMessage} onChange={(e: any)=>setNewMessage(e.target.value)}/>
                        <button type='submit' disabled={!newMessage}  onClick={sendMessage}>
                            <IoMdSend className={`${!newMessage && 'cursor-not-allowed'} text-2xl text-green-800`}/>
                        </button>
                    </form>
                </section>
            </section>
        </div>
    )
}

export default RoomPage