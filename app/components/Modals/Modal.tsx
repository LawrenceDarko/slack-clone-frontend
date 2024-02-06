'use client';

import { IoIosClose } from "react-icons/io";
import { useGeneralContext } from "../../context/GeneralContext";
import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useAuthContext } from "../../context/AuthContext";
import { RiLoader4Line } from "react-icons/ri";
import { useParams } from "next/navigation";

const Modal = () => {
    const { showModal, setShowModal, getWorkspaceChannels } = useGeneralContext();
    const { user } = useAuthContext();
    const axiosInstance = useAxiosPrivate()

    const params = useParams()
    const workspaceId = params.workspaceId

    const [channelName, setChannelName] = useState("");
    const [visibility, setVisibility] = useState("public");
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState() as any

    const handleCreateChannel = async() => {
        // Make an api call to save channel
        setShowModal(false)
        
        if(!user && !workspaceId) return;

        try {
            setLoading(true)
            const channelData = {
                name: channelName,
                workspace_id: workspaceId,
                access_type: visibility,
                created_by: user.id,
            }
            const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/channels/create`, channelData)
            const responseData = response?.data
            
            console.log(responseData)
        } catch (error) {
            setError(error)
            console.log("CREATING CHANNEL ERROR", error)
        } finally{
            setLoading(false)
            getWorkspaceChannels()
        }
    }

    return (
        <div className={`${showModal === false ? 'hidden' : ''} fixed z-50 flex items-center inset-0 justify-center w-full h-full bg-black backdrop-blur-md bg-opacity-20`}>
            <div className="w-[448px] bg-white dark:bg-[var(--dark-theme-bg-color)] rounded-md p-8">
                <div className="flex justify-between w-full">
                    <h2 className="mb-4 text-lg font-semibold">Create Channel</h2>
                    <IoIosClose className="cursor-pointer" onClick={()=>setShowModal(false)} size={20}/>
                </div>
                
                <div className="relative mb-4">
                    <label htmlFor="channelName" className="text-gray-600">Name:</label>
                    <input
                        type="text"
                        id="channelName"
                        placeholder="# e.g plan-budget"
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                        className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 dark:bg-[#222529]`}
                    />
                </div>
                <div className="mb-4">
                    <label className="text-gray-600">Visibility</label>
                    <div className="flex items-center mt-2">
                        <input
                            type="radio"
                            id="public"
                            name="visibility"
                            className="mr-2"
                            checked={visibility === "public"}
                            onChange={() => setVisibility("public")}
                        />
                        <label htmlFor="public" className="text-gray-800 dark:text-gray-600">Public - anyone in New Workspace</label>
                    </div>
                    <div className="flex items-center mt-2">
                        <input
                            type="radio"
                            id="private"
                            name="visibility"
                            className="mr-2"
                            checked={visibility === "private"}
                            onChange={() => setVisibility("private")}
                        />
                        <label htmlFor="private" className="text-gray-800 dark:text-gray-600">Private - Only specific people</label>
                    </div>
                </div>
                <p className="mb-4 text-gray-500">Channels are where conversations happen around a topic. Use a name that is easy to find and understand.</p>
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <input type="checkbox" id="inviteExternal" className="mr-2" />
                        <label htmlFor="inviteExternal" className="text-gray-800 dark:text-gray-600">Invite external people</label>
                    </div>
                    <button disabled={!channelName} onClick={handleCreateChannel} className={`${!channelName && 'bg-gray-400 cursor-not-allowed'} px-4 py-2 text-white bg-blue-500 rounded-md`}>
                        {loading? <RiLoader4Line /> : "Save"}
                    </button>
                </div>
                <div className="flex items-center justify-center w-full py-4">
                    {error && <p className="text-sm italic text-red-500">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default Modal;
