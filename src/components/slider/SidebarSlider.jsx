'use client';

import { useState } from 'react';
import Link from 'next/link';

const SidebarSlider = () => {
    const [isOpen, setIsOpen] = useState(true);

    const categories = [
        { name: 'Electronics', icon: <span className="material-icons">devices</span> },
        { name: 'Fashion', icon: <span className="material-icons">checkroom</span> },
        { name: 'Home & Garden', icon: <span className="material-icons">home</span> }
    ];

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="fixed top-8 left-4 z-50 p-2 bg-green-600 text-white rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Sidebar — this element is part of layout flow */}
            <div
                className={`transition-all duration-300 h-full overflow-y-auto bg-white shadow-lg ${
                    isOpen ? 'w-80' : 'w-0'
                }`}>
                <div className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'} px-4`}>
                    <div className="p-4 font-normal text-lg">All Categories</div>
                    <div className="divide-y divide-gray-100">
                        {categories.map((category, index) => (
                            <div key={index} className="group relative">
                                <Link className="flex items-center px-4 py-3 hover:bg-gray-100" href="#">
                                    <span className="mr-3">{category.icon}</span>
                                    <span>{category.name}</span>
                                    <span className="ml-auto">
                                        <svg
                                            className="w-4 h-4 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </span>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SidebarSlider;
