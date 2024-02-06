'use client';

import { IoIosClose } from "react-icons/io";
import { useGeneralContext } from "../../context/GeneralContext";
import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useAuthContext } from "../../context/AuthContext";
import { RiLoader4Line } from "react-icons/ri";
import { useParams } from "next/navigation";

const WorkspaceModal = () => {
    const { showWorkspaceModal, setShowWorkspaceModal } = useGeneralContext();
    const { user } = useAuthContext();
    const axiosInstance = useAxiosPrivate()

    const params = useParams()
    const workspaceId = params.workspaceId

    const [workspaceName, setWorkspaceName] = useState('')
    const [workspaceDescription, setWorkspaceDescription] = useState('')
    const [loading, setLoading] = useState(false)
    const [successMsg, setSuccessMsg] = useState('')
    const [error, setError] = useState() as any

    const handleCreateWorkspace = async() => {
        // Make an api call to create workspace
        
        if(!workspaceName && !workspaceDescription){
            setError("Please enter all the fields")
        };

        try {
            setLoading(true)
            const createWorkspaceData = {
                name: workspaceName,
                description: workspaceDescription,
                created_by: user?.id,
            }
            const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/workspace/create`, createWorkspaceData)
            const responseData = response.data

            if(responseData.status === "success"){
                setSuccessMsg(responseData?.message)
            }
            console.log(responseData)
        } catch (error) {
            setError(error)
            console.log("CREATING SPACE ERROR", error)
        } finally{
            setLoading(false)
        }
    }

    return (
        <div className={`${showWorkspaceModal === false ? 'hidden' : ''} fixed z-50 flex items-center inset-0 justify-center w-full h-full bg-black backdrop-blur-md bg-opacity-20`}>
            <div className="w-[448px] dark:bg-[var(--dark-theme-bg-color)] bg-white rounded-md p-8">
                <div className="flex justify-between w-full">
                    <h2 className="mb-4 text-lg font-semibold">Create New Worspace</h2>
                    <IoIosClose className="cursor-pointer" onClick={()=>setShowWorkspaceModal(false)} size={20}/>
                </div>
                
                <div className="relative flex flex-col gap-4 mb-4">
                    <div>
                        <label htmlFor="name" className="text-gray-600">Name:</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="ninjas"
                            value={workspaceName}
                            onChange={(e) => setWorkspaceName(e.target.value)}
                            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500`}
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="text-gray-600">Description:</label>
                        <input
                            type="text"
                            id="description"
                            placeholder="Workspace for coding..."
                            value={workspaceDescription}
                            onChange={(e) => setWorkspaceDescription(e.target.value)}
                            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500`}
                        />
                    </div>
                </div>
                
                <div className="flex justify-end">
                    <button disabled={!workspaceName} onClick={handleCreateWorkspace} className={`${!workspaceName && 'bg-gray-400 cursor-not-allowed'} px-4 py-2 text-white bg-blue-500 rounded-md`}>
                        {loading? <RiLoader4Line className="animate-spin" size={22}/> : "Create"}
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

export default WorkspaceModal;
