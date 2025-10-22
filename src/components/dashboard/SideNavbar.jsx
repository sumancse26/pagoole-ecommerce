'use client';
import Header from './DashboardHeader';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const Nav = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { data: session, status } = useSession();

    const logoHandlerBtn = () => {
        setSidebarOpen(() => !sidebarOpen);
    };
    return (
        <div>
            <Header logoHandler={logoHandlerBtn} />
            <div
                className={`nav-sidebar-wrapper fixed border-r border-gray-300 shadow-lg w-64 h-full top-[67px] left-0 bg-white transition-all duration-600 ease-in-out z-50 ${
                    sidebarOpen ? 'nav-slider' : ''
                }`}>
                {/* Navigation Items */}
                <div className="overflow-y-auto h-[calc(100%-4rem)] custom-scrollbar">
                    <nav className="px-4 py-6">
                        <ul className="space-y-2">
                            {/* Dashboard */}
                            <li>
                                <Link
                                    href="/dashboard"
                                    className="flex items-center p-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group">
                                    <svg
                                        className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                        />
                                    </svg>
                                    <span className="ml-3 font-medium">Dashboard</span>
                                    <span className="ml-auto">
                                        <svg
                                            className="w-4 h-4 text-gray-400 dark:text-gray-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </span>
                                </Link>
                            </li>

                            {/* Product */}
                            <li>
                                <Link
                                    href="/dashboard/product"
                                    className="flex items-center p-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group">
                                    <svg
                                        className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                        />
                                    </svg>
                                    <span className="ml-3 font-medium">Product</span>
                                    <span className="ml-auto">
                                        <svg
                                            className="w-4 h-4 text-gray-400 dark:text-gray-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </span>
                                </Link>
                            </li>

                            {/* Vendors */}
                            {session?.user?.role == 0 && (
                                <li>
                                    <Link
                                        href="/dashboard/vendor"
                                        className="flex items-center justify-between p-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group">
                                        <div className="flex items-center space-x-3">
                                            {/* 🏬 Vendor / Store Icon */}
                                            <svg
                                                className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M3 9l1-5h16l1 5M4 9h16v11H4V9zm4 11v-5h8v5"
                                                />
                                            </svg>

                                            <span className="font-medium">Vendor</span>
                                        </div>

                                        {/* → Arrow Icon */}
                                        <svg
                                            className="w-4 h-4 text-gray-400 dark:text-gray-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </Link>
                                </li>
                            )}

                            {/* Order */}
                            <li>
                                <Link
                                    href="/dashboard/order"
                                    className="flex items-center justify-between p-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group">
                                    <div className="flex items-center space-x-3">
                                        {/* 🛍️ Order / Shopping Bag Icon */}
                                        <svg
                                            className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 2l1 5h10l1-5m-1 5H6a2 2 0 00-2 2v11a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2zM9 13a3 3 0 006 0"
                                            />
                                        </svg>

                                        <span className="font-medium">Order</span>
                                    </div>

                                    {/* → Arrow Icon */}
                                    <svg
                                        className="w-4 h-4 text-gray-400 dark:text-gray-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </Link>
                            </li>

                            {/* Report */}
                            {/* <li>
                                <Link
                                    href="/dashboard/report"
                                    className="flex items-center p-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group">
                                    <svg
                                        className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                    <span className="ml-3 font-medium">Report</span>
                                    <span className="ml-auto">
                                        <svg
                                            className="w-4 h-4 text-gray-400 dark:text-gray-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </span>
                                </Link>
                            </li> */}
                        </ul>
                    </nav>
                </div>

                {/* Custom scrollbar styles */}
                <style jsx>{`
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 6px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: #f1f1f1;
                        border-radius: 10px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: #c1c1c1;
                        border-radius: 10px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                        background: #a1a1a1;
                    }
                    .dark .custom-scrollbar::-webkit-scrollbar-track {
                        background: #374151;
                    }
                    .dark .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: #4b5563;
                    }
                    .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                        background: #6b7280;
                    }

                    @media (max-width: 1025px) {
                        .nav-sidebar-wrapper {
                            left: -300px;
                        }
                        .nav-slider {
                            left: 0;
                        }
                    }
                `}</style>
            </div>
        </div>
    );
};

export default Nav;

// lg:fixed hidden md:left-[-100%]  lg:block xl:block 2xl:block left-0 top-0 h-full w-64 bg-white shadow-lg dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out
