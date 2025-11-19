"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { setSharedData } from '@/hooks/useSharedData';
import { getSearchedProducts } from '@/services/product';

export default function HeaderClient({ isMobile = false }) {
    const [searchStringData, setSearchStringData] = useState('');
    const router = useRouter();

    const fetchSearchProductHandler = async () => {
        const res = await getSearchedProducts(searchStringData);

        setSharedData({ isSearch: true, list: res.product_list });

        router.push('/');
    };

    const searchProduct = (e) => {
        e.preventDefault();
        fetchSearchProductHandler();
    };

    if (isMobile) {
        return (
            <form className="w-full relative flex items-center gap-3" onSubmit={searchProduct}>
                <div className="relative flex-1 px-2">
                    <input
                        type="search"
                        placeholder="Search for products..."
                        className="w-full h-10 pl-5 pr-12 rounded-full text-gray-800 placeholder-gray-500 bg-white border border-green-500 shadow focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                        aria-label="Search products"
                        required
                        onChange={(e) => setSearchStringData(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="absolute right-[35px] top-1/2 transform -translate-y-1/2 text-green-600 hover:text-green-800"
                        aria-label="Search">
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                            />
                        </svg>
                    </button>
                </div>


                <Link href="/shop">
                    <button
                        type="button"
                        className="cursor-pointer px-3 bg-[#ff686e] text-white py-[5px] rounded-lg font-medium tracking-[2px]"
                    >
                        Shop Order
                    </button>
                </Link>
            </form>
        );
    }

    return (
        <div className="hidden md:flex flex-1 justify-center">
            <form className="w-full relative flex items-center gap-3" onSubmit={searchProduct}>
                <div className="relative flex-1 px-2">
                    <input
                        type="search"
                        placeholder="Search for products..."
                        className="w-full h-10 pl-5 pr-12 rounded-full text-gray-800 placeholder-gray-500 bg-white border border-green-500 shadow"
                        required
                        onChange={(e) => setSearchStringData(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="absolute right-[35px] top-1/2 transform -translate-y-1/2 text-green-600 hover:text-green-800"
                    >
                        🔍
                    </button>
                </div>

                <Link href="/shop">
                    <button
                        type="button"
                        className="cursor-pointer px-3 bg-[#ff686e] text-white py-[5px] rounded-lg font-medium tracking-[2px]"
                    >
                        Shop Order
                    </button>
                </Link>
            </form>
        </div>
    );
}
