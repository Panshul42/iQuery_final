'use client';
import { useState, useEffect } from 'react';

export default function Loading() {
    const messages = [
        'Analyzing your question...',
        'Gathering thoughts...',
        'Finding meaningful explanations...',
        'Adding a few touches...',
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
        }, 1600); // Change message every 2 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [messages]);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-4 border-t-black border-white rounded-full animate-spin"></div>
            <p className="mt-5 text-white text-lg">{currentMessage}</p>
        </div>
    );
}
