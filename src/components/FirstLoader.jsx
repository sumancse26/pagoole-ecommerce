'use client';

import { useState, useEffect } from 'react';

const FirstLoader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
            setTimeout(() => setShowPopup(true), 2000);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {isLoading && (
                <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
                    <div className="flex space-x-2">
                        <div className="w-4 h-4 rounded-full bg-green-500 animate-bounce"></div>
                        <div
                            className="w-4 h-4 rounded-full bg-green-500 animate-bounce"
                            style={{ animationDelay: '0.2s' }}></div>
                        <div
                            className="w-4 h-4 rounded-full bg-green-500 animate-bounce"
                            style={{ animationDelay: '0.4s' }}></div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FirstLoader;
