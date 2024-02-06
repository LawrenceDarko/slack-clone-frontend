'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { BsSun } from "react-icons/bs";
import { IoMoonSharp } from "react-icons/io5";


const ToggleButton = () => {
    const { theme, setTheme } = useTheme()

    console.log(theme)

    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    if (!mounted) {
        return null
    }

    return (
        <button
            aria-label='Toggle Dark Mode'
            type='button'
            className='flex items-center justify-center p-2 transition-colors rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-700'
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
            {theme === 'dark' ? (
                <BsSun className='w-5 h-5 text-orange-300' />
            ) : (
                <IoMoonSharp className='w-5 h-5 text-white' />
            )}
        </button>
    )
}

export default ToggleButton