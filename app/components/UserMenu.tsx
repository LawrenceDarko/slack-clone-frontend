'use client';

import { useState, useCallback } from 'react';
import { AiOutlineMenu } from 'react-icons/ai'
import MenuItem from './navbars/MenuItem';
import { BiSolidUserRectangle } from 'react-icons/bi';


const UserMenu = () => {

    const [isOpen, setIsOpen] = useState(false)

    // const toggleOpen = useCallback(() => {
    //     setIsOpen((value) => !value);
    //     console.log(isOpen)
    // }, [],)
    const toggleOpen = () => {
        setIsOpen(!isOpen)
    }
    

    return (
        <div className='relative h-full'>
            <div onClick={toggleOpen} className='h-full rounded-sm w-7'>
                <BiSolidUserRectangle className='w-full h-full text-white' />
                <div className='absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full'></div>
            </div>
            {isOpen && (
                <div className='absolute z-50 rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
                    <div className='flex flex-col cursor-pointer'>
                        <>
                            <MenuItem onClick={() => {}} label='Logout' />
                            <MenuItem onClick={() => {}} label='Sign up' />
                        </>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserMenu