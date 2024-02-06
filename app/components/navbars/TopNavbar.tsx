import React from 'react'
import { IoTimeOutline } from "react-icons/io5";
import { GoQuestion } from "react-icons/go";
import { BiSolidUserRectangle } from "react-icons/bi";
import ToggleButton from '../ToggleButton';
import UserMenu from '../UserMenu';

const TopNavbar = () => {
    return (
        <div className='h-[44px] z-40 bg-[#350D36] dark:bg-[var(--dark-theme-bg-color)] w-full overflow-hidden fixed'>
            <div className='relative flex items-center justify-center w-full h-full'>
                <section className='flex items-center justify-center w-1/2 gap-3'>
                    <IoTimeOutline className='text-2xl text-white'/>
                    <div className='bg-[#5D3D5E] dark:bg-[#535558] p-2 w-full h-[26px] flex items-center rounded-md cursor-pointer hover:bg-[#644565] text-[#F8F6F8] text-sm font-thin'>Search Computing</div>
                </section>
                <div className='absolute flex items-center gap-4 right-3'>
                    <ToggleButton />
                    <GoQuestion className='text-xl text-white'/>
                    <div className='h-full rounded-sm w-7'>
                        <BiSolidUserRectangle className='w-full h-full text-white' />
                        <div className='absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopNavbar