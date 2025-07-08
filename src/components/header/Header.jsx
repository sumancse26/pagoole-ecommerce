'use client';

import Link from 'next/link';
import { useState } from 'react';

const HeaderComp = () => {
    const [categoriesOpen, setCategoriesOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const categories = [
        { name: "Women's Fashion", icon: '👚', subcategories: ['Dresses', 'Tops', 'Sweaters', 'Jackets'] },
        { name: "Men's Fashion", icon: '👔', subcategories: ['Shirts', 'Pants', 'Suits', 'Outerwear'] },
        { name: 'Jewelry & Watches', icon: '💍', subcategories: ['Necklaces', 'Earrings', 'Bracelets', 'Watches'] },
        { name: 'Bags & Accessories', icon: '👜', subcategories: ['Handbags', 'Backpacks', 'Wallets', 'Belts'] },
        { name: 'Footwear', icon: '👠', subcategories: ['Sneakers', 'Boots', 'Sandals', 'Heels'] },
        { name: 'Beauty & Health', icon: '💄', subcategories: ['Skincare', 'Makeup', 'Haircare', 'Fragrances'] }
    ];

    return (
        <>
            <header className="bg-white shadow-sm sticky top-0 z-40">
                {/* Top Header */}
                <div className="hidden md:block bg-gray-900 text-gray-100 py-2 text-sm">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap items-center justify-between">
                            <div className="flex items-center space-x-6">
                                <div className="flex items-center">
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    <span>Free Shipping Over $250</span>
                                </div>
                                <div className="flex items-center">
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                    </svg>
                                    <span>24/7 Customer Support</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                    <span className="mr-2">Download App:</span>
                                    <a href="#" className="text-gray-300 hover:text-white transition-colors mr-2">
                                        <svg
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                                        </svg>
                                    </a>
                                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                        <svg
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
                                        </svg>
                                    </a>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <select className="bg-transparent border-none focus:ring-0 text-sm">
                                        <option value="en">English</option>
                                        <option value="fr">French</option>
                                        <option value="es">Spanish</option>
                                    </select>
                                    <span className="text-gray-400">|</span>
                                    <select className="bg-transparent border-none focus:ring-0 text-sm">
                                        <option value="USD">USD</option>
                                        <option value="EUR">EUR</option>
                                        <option value="GBP">GBP</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Middle Header */}
                <div className="py-4 border-b border-gray-300 px-15">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between">
                            <div className="flex">
                                <a className="flex items-center" href="/">
                                    <svg
                                        className="w-8 h-8 text-green-600"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="ml-2 text-xl font-bold text-gray-800">Shopwise</span>
                                </a>
                            </div>

                            <div className="hidden md:flex mx-8 justify-content-center">
                                <form className="flex justify-content-center">
                                    <div className="flex">
                                        <input
                                            className="flex-grow h-12 w-[400px] px-4 rounded border-t border-b border-s border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                                            placeholder="Search for products..."
                                            required
                                            type="search"
                                        />
                                        <button
                                            type="submit"
                                            className="h-12 px-6 bg-green-600 text-white font-medium rounded-r-lg hover:bg-green-700 transition-colors">
                                            Search
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="hidden md:flex items-center">
                                    <div className="w-11 h-8 rounded-full bg-green-200 flex items-center justify-center mr-2">
                                        <svg
                                            className="w-5 h-5 text-green-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            />
                                        </svg>
                                    </div>
                                    <div className="font-medium md:w-full">
                                        <div className="text-xs md:w-full text-gray-500">Call Support</div>
                                        <div className="font-medium md:w-full">123-456-7890</div>
                                    </div>
                                </div>

                                <button
                                    className="md:hidden p-2 text-gray-500 hover:text-gray-700"
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Header */}
                <div className="bg-white shadow-sm px-15">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between py-3">
                            <div className="relative w-64 hidden lg:block">
                                <button
                                    onClick={() => setCategoriesOpen(!categoriesOpen)}
                                    className="w-full px-4 py-3 bg-green-600 text-white text-left flex items-center justify-between rounded-lg">
                                    <span className="flex items-center">
                                        <svg
                                            className="w-5 h-5 mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                        </svg>
                                        <span>All Categories</span>
                                    </span>
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                                {categoriesOpen && (
                                    <div className="absolute left-0 right-0 z-50 bg-white shadow-xl rounded-b-lg mt-1 divide-y divide-gray-100">
                                        {categories?.map((category, index) => (
                                            <div key={index} className="group relative">
                                                <a className="flex items-center px-4 py-3 hover:bg-gray-50" href="#">
                                                    <span className="mr-3">{category.icon}</span>
                                                    <span>{category.name}</span>
                                                    <span className="ml-auto">
                                                        <svg
                                                            className="w-4 h-4 text-gray-400"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M9 5l7 7-7 7"
                                                            />
                                                        </svg>
                                                    </span>
                                                </a>
                                                <div className="hidden group-hover:block absolute left-full top-0 w-64 bg-white shadow-lg rounded-lg ml-1 z-10">
                                                    <div className="p-4">
                                                        <h4 className="font-medium text-gray-900 mb-2">
                                                            {category.name}
                                                        </h4>
                                                        <ul className="space-y-2">
                                                            {category.subcategories.map((subcat, i) => (
                                                                <li key={i}>
                                                                    <a
                                                                        className="text-gray-600 hover:text-green-600"
                                                                        href="#">
                                                                        {subcat}
                                                                    </a>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <nav className="hidden lg:flex items-center space-x-6">
                                <div className="group relative">
                                    <a
                                        href="#"
                                        className="text-gray-700 hover:text-green-600 font-medium py-3 px-1 border-b-2 border-transparent hover:border-green-600 transition-colors">
                                        Home
                                    </a>
                                    <div className="hidden group-hover:block absolute left-0 mt-0 w-48 bg-white shadow-lg rounded-b-lg z-10">
                                        <ul className="py-1">
                                            <li>
                                                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                                    Fashion 1
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                                    Fashion 2
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                                    Electronics
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <a
                                    href="#"
                                    className="text-gray-700 hover:text-green-600 font-medium py-3 px-1 border-b-2 border-transparent hover:border-green-600 transition-colors">
                                    Shop
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-700 hover:text-green-600 font-medium py-3 px-1 border-b-2 border-transparent hover:border-green-600 transition-colors">
                                    Products
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-700 hover:text-green-600 font-medium py-3 px-1 border-b-2 border-transparent hover:border-green-600 transition-colors">
                                    Pages
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-700 hover:text-green-600 font-medium py-3 px-1 border-b-2 border-transparent hover:border-green-600 transition-colors">
                                    Blog
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-700 hover:text-green-600 font-medium py-3 px-1 border-b-2 border-transparent hover:border-green-600 transition-colors">
                                    Contact
                                </a>
                            </nav>

                            <div className="flex items-center space-x-4">
                                <a href="#" className="p-2 text-gray-500 hover:text-green-600 relative">
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                        />
                                    </svg>
                                    <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        3
                                    </span>
                                </a>
                                <div className="group relative">
                                    <a href="#" className="p-2 text-gray-500 hover:text-green-600 relative">
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                            />
                                        </svg>
                                        <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            2
                                        </span>
                                    </a>
                                    <div className="hidden group-hover:block absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg z-10">
                                        <div className="p-4 border-b">
                                            <h4 className="font-medium text-gray-900">Shopping Cart</h4>
                                        </div>
                                        <ul className="divide-y divide-gray-100">
                                            <li className="flex items-center p-4">
                                                <button className="text-gray-400 hover:text-red-500 mr-2">
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M6 18L18 6M6 6l12 12"
                                                        />
                                                    </svg>
                                                </button>
                                                <img
                                                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                                                    alt="Product"
                                                    className="w-12 h-12 object-cover rounded mr-3"
                                                />
                                                <div className="flex-1">
                                                    <a
                                                        href="#"
                                                        className="text-sm font-medium text-gray-900 hover:text-green-600">
                                                        Running Shoes
                                                    </a>
                                                    <div className="text-sm text-gray-500">1 x $78.00</div>
                                                </div>
                                            </li>
                                            <li className="flex items-center p-4">
                                                <button className="text-gray-400 hover:text-red-500 mr-2">
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M6 18L18 6M6 6l12 12"
                                                        />
                                                    </svg>
                                                </button>
                                                <img
                                                    src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                                                    alt="Product"
                                                    className="w-12 h-12 object-cover rounded mr-3"
                                                />
                                                <div className="flex-1">
                                                    <a
                                                        href="#"
                                                        className="text-sm font-medium text-gray-900 hover:text-green-600">
                                                        Denim Jacket
                                                    </a>
                                                    <div className="text-sm text-gray-500">1 x $81.00</div>
                                                </div>
                                            </li>
                                        </ul>
                                        <div className="p-4 border-t">
                                            <div className="flex justify-between mb-4">
                                                <span className="font-medium">Subtotal:</span>
                                                <span className="font-medium">$159.00</span>
                                            </div>
                                            <div className="flex space-x-2">
                                                <a
                                                    href="#"
                                                    className="flex-1 text-center py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
                                                    View Cart
                                                </a>
                                                <a
                                                    href="#"
                                                    className="flex-1 text-center py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                                                    Checkout
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <a href="#" className="p-2 text-gray-500 hover:text-green-600">
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden bg-white shadow-lg">
                        <div className="container mx-auto px-4 py-3">
                            <div className="mb-4">
                                <form className="flex">
                                    <input
                                        type="search"
                                        placeholder="Search..."
                                        className="flex-grow px-4 py-2 border rounded-l-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                    <button className="px-4 py-2 bg-green-600 text-white rounded-r-lg">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        </svg>
                                    </button>
                                </form>
                            </div>
                            <nav className="space-y-2">
                                <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-lg">
                                    Home
                                </a>
                                <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-lg">
                                    Shop
                                </a>
                                <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-lg">
                                    Products
                                </a>
                                <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-lg">
                                    Pages
                                </a>
                                <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-lg">
                                    Blog
                                </a>
                                <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-lg">
                                    Contact
                                </a>
                            </nav>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
};

export default HeaderComp;
