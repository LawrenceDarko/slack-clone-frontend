'use client'
import React, { useRef, useEffect } from 'react';

const ScrollToView = () => {
    const chatRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollIntoView({
                behavior: "smooth"
            });
        }
    }, []);
    
    return (
        <div ref={chatRef}></div>
    );
}

export default ScrollToView;
