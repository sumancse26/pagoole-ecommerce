'use client';

import Link from 'next/link';

const HeaderComp = () => {
    return (
        <header className="bg-white shadow sticky top-0 z-40">
            {/* Green Top Bar */}
            <div className="bg-green-600">
                <div className="container mx-auto px-4 py-3 flex flex-wrap md:flex-nowrap items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/">
                            <span className="ml-11 text-2xl font-extrabold bg-gradient-to-r from-white via-lime-300 to-green-100 bg-clip-text text-transparent drop-shadow-md">
                                Pagoole Shop
                            </span>
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <div className="hidden md:flex flex-1 justify-center">
                        <form className="w-full max-w-3xl relative">
                            <input
                                type="search"
                                placeholder="Search for products..."
                                className="w-full h-12 pl-5 pr-12 rounded-full text-gray-800 placeholder-gray-500 bg-white border border-green-500 shadow focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                                aria-label="Search products"
                                required
                            />
                            <button
                                type="submit"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 hover:text-green-800"
                                aria-label="Search">
                                {/* Magnifying glass SVG */}
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
                        </form>
                    </div>

                    <div className="flex items-center me-2">
                        <Link href="/">
                            <button
                                className="
                                    bg-gradient-to-r
                                    from-green-300
                                    via-lime-400
                                    to-green-500 
                                    text-white
                                    drop-shadow-lg
                                    py-2
                                    px-4
                                    rounded-lg
                                    transition
                                    duration-300
                                    hover:from-green-300
                                    hover:via-green-400
                                    hover:to-green-500
                                    hover:drop-shadow-xl
                                    focus:outline-none
                                    focus:ring-4
                                    focus:ring-green-400
                                    focus:ring-opacity-50
                                    cursor-pointer
                                    border border-green-500 
                                    font-semibold
                                "
                                aria-label="Go to Shop Order homepage">
                                Shop Order
                            </button>
                        </Link>
                    </div>

                    {/* Icons */}
                    <div className="flex items-center gap-5 text-white">
                        {/* Wishlist */}
                        <div className="relative group">
                            <Link href="#" className="p-2 hover:text-lime-200" aria-label="Wishlist">
                                {/* Heart SVG */}
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                                <span className="absolute -top-1.5 -right-1.5 text-xs bg-white text-green-700 font-bold rounded-full px-1.5">
                                    3
                                </span>
                            </Link>
                            {/* Dropdown */}
                            <div className="absolute hidden group-hover:block top-10 right-0 w-64 bg-white shadow-md text-black rounded-md z-50">
                                <div className="p-4 text-sm">Your wishlist items will appear here.</div>
                            </div>
                        </div>

                        {/* Cart */}
                        <div className="relative group">
                            <Link href="#" className="p-2 hover:text-lime-200" aria-label="Cart">
                                {/* Shopping Cart SVG */}
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                    />
                                </svg>
                                <span className="absolute -top-1.5 -right-1.5 text-xs bg-white text-green-700 font-bold rounded-full px-1.5">
                                    5
                                </span>
                            </Link>
                            {/* Dropdown */}
                            <div className="absolute hidden group-hover:block top-10 right-0 w-64 bg-white shadow-md text-black rounded-md z-50">
                                <div className="p-4 text-sm">Your cart is currently empty.</div>
                            </div>
                        </div>

                        {/* User Icon */}
                        <Link href="#" className="p-2 hover:text-lime-200" aria-label="Account">
                            {/* User SVG */}
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderComp;
