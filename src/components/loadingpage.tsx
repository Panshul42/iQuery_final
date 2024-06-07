'use client';
import { useState, useEffect } from 'react';

export default function Loading() {
    const messages = [
        'Analyzing your paper through the magic of iQuery...',
        'Writing an executive summary...',
        'Generating big brain insights...',
        'Getting ready to answer your questions...',
        'Almost there...',
    ];

    const [currentMessage, setCurrentMessage] = useState(messages[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessage(prevMessage => {
                const currentIndex = messages.indexOf(prevMessage);
                const nextIndex = (currentIndex + 1) % messages.length;
                return messages[nextIndex];
            });
        }, 1500); // Change message every 2 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [messages]);

    return (
        <div className="flex flex-col items-center justify-center editpt3">
            <div className="w-10 h-10 border-4 border-t-black border-white rounded-full animate-spin"></div>
            <p className="mt-5 text-white text-lg">{currentMessage}</p>
        </div>
    );
}
