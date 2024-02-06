'use client';

import { IoIosClose } from "react-icons/io";
import { useGeneralContext } from "../../context/GeneralContext";
import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useAuthContext } from "../../context/AuthContext";
import { RiLoader4Line } from "react-icons/ri";
import { useParams } from "next/navigation";

const InviteModal = () => {
    const { showInviteModal, setShowInviteModal } = useGeneralContext();
    const { user } = useAuthContext();
    const axiosInstance = useAxiosPrivate()

    const params = useParams()
    const workspaceId = params.workspaceId

    const [inviteEmail, setInviteEmail] = useState("");
    const [loading, setLoading] = useState(false)
    const [successMsg, setSuccessMsg] = useState('')
    const [error, setError] = useState() as any

    const handleSendInvite = async() => {
        // Make an api call to send invite
        // setShowInviteModal(false)
        
        if(!user && !workspaceId) return;

        try {
            setLoading(true)
            const inviteData = {
                email: inviteEmail,
                workspace_id: workspaceId,
            }
            const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/send-invitation`, inviteData)
            const responseData = response.data

            if(responseData.status === "success"){
                setSuccessMsg(responseData.message)
            }
            
            console.log("INVITE RESPONSE:", responseData)
        } catch (error) {
            setError(error)
            console.log("SENDING INVITE ERROR", error)
        } finally{
            setLoading(false)
        }
    }

    return (
        <div className={`${showInviteModal === false ? 'hidden' : ''} fixed z-50 flex items-center inset-0 justify-center w-full h-full bg-black backdrop-blur-md bg-opacity-20`}>
            <div className="w-[448px] bg-white dark:bg-[var(--dark-theme-bg-color)] rounded-md p-8">
                <div className="flex justify-between w-full">
                    <h2 className="mb-4 text-lg font-semibold">Invite Users</h2>
                    <IoIosClose className="cursor-pointer" onClick={()=>setShowInviteModal(false)} size={20}/>
                </div>
                
                <div className="relative mb-4">
                    <label htmlFor="inviteEmail" className="text-gray-600">Email:</label>
                    <input
                        type="text"
                        id="inviteEmail"
                        placeholder="johndoe@example.com"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 dark:bg-[#222529]`}
                    />
                </div>
                
                <div className="flex justify-end">
                    <button disabled={!inviteEmail} onClick={handleSendInvite} className={`${!inviteEmail && 'bg-gray-400 cursor-not-allowed'} px-4 py-2 text-white bg-blue-500 rounded-md`}>
                        {loading? <RiLoader4Line className="animate-spin" size={22}/> : "Invite"}
                    </button>
                </div>
                <div className="flex items-center justify-center w-full py-4">
                    {error && <p className="text-sm italic text-red-500">{error}</p>}
                    {successMsg && <p className="text-sm italic text-green-500">{successMsg}</p>}
                </div>
            </div>
        </div>
    );
};

export default InviteModal;
