'use client';

import { IoIosClose } from "react-icons/io";
import { useGeneralContext } from "../../context/GeneralContext";
import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useAuthContext } from "../../context/AuthContext";
import { RiLoader4Line } from "react-icons/ri";
import { useParams } from "next/navigation";
import Select, { StylesConfig } from 'react-select';


interface ColourOption {
    label: string;
    value: string;
}

const customStyles: StylesConfig<ColourOption> = {
    control: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    border: '1px solid #e2e8f0', // Match the border color of the input
    borderRadius: '0.375rem', // Match the border radius of the input
    padding: '0.5rem', // Match the padding of the input
    }),
    option: (styles, { isDisabled, isFocused, isSelected }) => {
    const backgroundColor = isSelected ? '#3490dc' : isFocused ? 'rgba(52, 144, 220, 0.1)' : 'white';
    const color = isSelected ? 'white' : 'black';

    return {
        ...styles,
        backgroundColor: isDisabled ? undefined : backgroundColor,
        color: isDisabled ? '#ccc' : color,
        cursor: isDisabled ? 'not-allowed' : 'default',
        ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled ? (isSelected ? backgroundColor : 'rgba(52, 144, 220, 0.3)') : undefined,
        },
    };
    },
    input: (styles: any) => ({
    ...styles,
    height: 'auto', // Adjust the height if needed
    }),
    placeholder: (styles: any) => ({
    ...styles,
    color: '#ccc',
    }),
    singleValue: (styles: any) => ({
    ...styles,
    color: '#000', // Match the text color of the input
    }),
};


const AddPeopleModal = () => {
    const { addPeopleModal, setAddPeopleModal, worksapceUsers } = useGeneralContext();
    const { user } = useAuthContext();
    const axiosInstance = useAxiosPrivate()

    const params = useParams()
    const space_id = params.roomId

    const [inviteEmail, setInviteEmail] = useState("");
    const [loading, setLoading] = useState(false)
    const [successMsg, setSuccessMsg] = useState('')
    const [error, setError] = useState() as any
    const [selectedUsers, setSelectedUsers] = useState<ColourOption[]>([]);

    const workspaceUsersEmails: any = []
    worksapceUsers?.map((user: any) => {
        workspaceUsersEmails.push({
            value: user?.user?.email,
            label: user?.user?.email,
        })
    })

    // console.log("WORKSPACE SELECTED USERS", selectedUsers)

    const handleAddPoeple = async() => {
        // Make an api call to add people
        // setAddPeopleModal(false)
        
        if(!user && !space_id) return;

        try {
            const emails = selectedUsers.map((user: any) => user.value)
            // console.log("Emails", emails)
            setLoading(true)
            const addPeopleData = {
                userEmails: emails,
                space_id: space_id,
            }
            const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/channels/add-private-channel-users`, addPeopleData)
            const responseData = response.data

            if(responseData.status === "success"){
                setSuccessMsg(responseData.message)
            }
            
            console.log("ADD TO PRIVATE CHANNEL RESPONSE:", responseData)
        } catch (error) {
            setError(error)
            console.log("ADD TO PRIVATE CHANNEL ERROR", error)
        } finally{
            setLoading(false)
        }
    }

    return (
        <div className={`${addPeopleModal === false ? 'hidden' : ''} fixed z-50 flex items-center inset-0 justify-center w-full h-full bg-black backdrop-blur-md bg-opacity-20`}>
            <div className="w-[448px] bg-white dark:bg-[var(--dark-theme-bg-color)] rounded-md p-8">
                <div className="flex justify-between w-full">
                    <h2 className="mb-4 text-lg font-semibold">Add People</h2>
                    <IoIosClose className="cursor-pointer" onClick={()=>setAddPeopleModal(false)} size={20}/>
                </div>

                <div className="relative mb-4">
                <label htmlFor="inviteEmail" className="text-gray-600">Email:</label>
                    <Select
                        isMulti
                        name="colors"
                        options={workspaceUsersEmails}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        styles={customStyles}
                        value={selectedUsers}
                        onChange={(selectedOptions) => setSelectedUsers(selectedOptions as ColourOption[])}
                    />
                </div>
                
                <div className="flex justify-end">
                    <button disabled={!selectedUsers} onClick={handleAddPoeple} className={`${!selectedUsers && 'bg-gray-400 cursor-not-allowed'} px-4 py-2 text-white bg-blue-500 rounded-md`}>
                        {loading? <RiLoader4Line className="animate-spin" size={22}/> : "Done"}
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

export default AddPeopleModal;
