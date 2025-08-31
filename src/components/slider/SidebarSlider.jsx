'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const SidebarSlider = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const categories = [
        { name: 'Electronics', icon: <span className="material-icons">devices</span> },
        { name: 'Fashion', icon: <span className="material-icons">checkroom</span> },
        { name: 'Home & Garden', icon: <span className="material-icons">home</span> }
    ];

    const searchCategoryHandler = (e) => {
        const searchTerm = e?.toString()?.toLowerCase();

        if (searchTerm?.length > 0 && searchTerm) {
            setFilteredCategories(
                categories?.filter((item) => {
                    return Object.entries(item)
                        .reduce(
                            (result, [, value]) => (!(value instanceof Object) ? (result += ` ${value}`) : result),
                            ''
                        )
                        .toLowerCase()
                        .includes(searchTerm);
                })
            );
        } else {
            setFilteredCategories(categories);
        }
    };

    useEffect(() => {
        searchCategoryHandler('');
    }, []);

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="fixed top-[7px] left-4 z-50 p-2 bg-green-500 text-white rounded-lg cursor-pointer">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Sidebar — this element is part of layout flow */}
            <div
                className={`sticky top-[70px] transition-all duration-300 h-full overflow-y-auto bg-white shadow-lg  ${
                    isOpen ? 'w-80' : 'w-0'
                }`}>
                <div
                    className={`pt-5 transition-opacity duration-300 ${
                        isOpen ? 'opacity-100 z-index-[999999]' : 'opacity-0'
                    } px-4`}>
                    <div className="px-4 pb-2 font-normal text-lg border-b border-gray-200 ">All Categories</div>

                    <div className="p-2 ">
                        <input
                            onInput={(e) => searchCategoryHandler(e.target.value)}
                            type="text"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Search categories"
                        />
                    </div>
                    <div className="divide-y divide-gray-100">
                        {filteredCategories.map((category, index) => (
                            <div key={index} className="group relative">
                                <Link className="flex items-center px-4 py-3 hover:bg-green-100" href="#">
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
