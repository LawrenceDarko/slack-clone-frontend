'use client'
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const TextEditor = () => {
    const [value, setValue] = useState('');
    // console.log(value)

    const handleSend = () => {
        // Here, you can implement the logic for sending the content
        // For example, you could send the 'value' to a server or perform any other actions.
        console.log('Sending:', value);
      };
    
return (
    <div className='relative'>
        <ReactQuill className='w-full h-24' theme="snow" value={value} onChange={setValue} />
        <button
            className="absolute px-4 py-2 text-white bg-[#007A5A] rounded bottom-2 right-2"
            onClick={handleSend}
        >
            Send
        </button>
    </div>
)
}

export default TextEditor