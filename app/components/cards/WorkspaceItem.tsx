import React from 'react'
import { HiArrowNarrowRight } from 'react-icons/hi';

interface WorkspaceItemProps {
    spaceName: string;
    numOfMembers?: Number | any;
}

const WorkspaceItem: React.FC<WorkspaceItemProps> = ({spaceName, numOfMembers}) => {
    return (
        <section className='flex justify-between w-full h-20 p-3 border-b cursor-pointer'>
            <div className='flex items-center justify-center gap-2'>
                <div className='h-[95%] w-16 rounded-md bg-gray-200 flex justify-center items-center text-4xl font-bold'>{spaceName && spaceName[0]}</div>
                <div>
                    <p>{spaceName}</p>
                    <p className='text-xs'>{numOfMembers} members</p>
                </div>
            </div>
            <div className='flex items-center justify-center'>
                <HiArrowNarrowRight className="text-2xl"/>
            </div>
        </section>
    )
}

export default WorkspaceItem