'use client';

import Wish from '../wishlist/Wish';
import Cart from '@components/addToCart/CartList';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// 1. UserDropdown now accepts dashboardHandler as a prop.
const UserDropdown = ({ session, closeMenu, dashboardHandler }) => {
    if (!session || !session.user) {
        return (
            <div className="absolute right-0 mt-3 w-48 bg-white text-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-100 z-50">
                <Link
                    href="/login"
                    onClick={closeMenu}
                    className="block px-4 py-2 hover:bg-gray-50 transition duration-150 ease-in-out text-sm font-medium">
                    Sign In / Register
                </Link>
            </div>
        );
    }

    return (
        <div className="absolute right-0 mt-3 w-48 bg-white text-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-100 z-50">
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                <p className="text-sm font-semibold truncate">{session.user.name || 'My Account'}</p>
            </div>

            <Link
                href="/"
                onClick={closeMenu}
                className="flex items-center px-4 py-2 hover:bg-gray-100 transition duration-150 ease-in-out text-sm">
                <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                Profile
            </Link>

            <button
                onClick={dashboardHandler}
                className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 transition duration-150 ease-in-out text-sm">
                <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                Dashboard
            </button>

            <div className="border-t border-gray-100 my-1"></div>

            <button
                onClick={() => {
                    signOut({ callbackUrl: '/' });
                    closeMenu();
                }}
                className="flex items-center w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition duration-150 ease-in-out text-sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3v-4a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
                Sign Out
            </button>
        </div>
    );
};

const HeaderIcon = ({ cartItemList = [], wishItemList = [] }) => {
    const { data: session } = useSession();
    const [cartList, setCartList] = useState([]);
    const [wishList, setWishList] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [showWishList, setShowWishList] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const containerRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        setCartList(cartItemList);
    }, [cartItemList]);

    useEffect(() => {
        setWishList(wishItemList);
    }, [wishItemList]);

    const closeAllModals = () => {
        setShowWishList(false);
        setShowCart(false);
        setShowUserMenu(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                closeAllModals();
            }
        };

        if (showCart || showWishList || showUserMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showCart, showWishList, showUserMenu]);

    // ... (Icon handlers remain the same) ...
    const cartIconHandler = () => {
        setShowCart((prev) => !prev);
        setShowWishList(false);
        setShowUserMenu(false);
    };

    const wishListHandler = () => {
        setShowWishList((prev) => !prev);
        setShowCart(false);
        setShowUserMenu(false);
    };

    const userMenuHandler = () => {
        setShowUserMenu((prev) => !prev);
        setShowCart(false);
        setShowWishList(false);
    };

    const dashboardHandler = () => {
        if (!session?.user) {
            closeAllModals();
            return;
        }

        const roles = [0, 1];

        if (roles.includes(session.user.role)) {
            router.push('/dashboard');
        } else {
            router.push('/order');
        }

        closeAllModals();
    };

    return (
        <div className="flex items-center gap-[20px] text-white mt-3" ref={containerRef}>
            {/* Wishlist */}
            <div className="relative">
                <button
                    className="cursor-pointer p-0 hover:text-lime-200"
                    aria-label="Wishlist"
                    onClick={wishListHandler}
                    title="Wish List">
                    {/* Heart SVG */}
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
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                    <span className="absolute -top-3 -right-2.5 text-xs bg-white text-red-700 font-bold rounded-full px-1.5">
                        {wishList?.length || 0}
                    </span>
                </button>
                {/* Dropdown */}
                {showWishList && (
                    <div className="absolute md:top-[40px] md:-right-[100px] w-[300px] bg-white shadow-xl shadow-lg text-black rounded-md z-50 p-3">
                        <Wish showWishList={showWishList} wishList={wishList} closeWish={closeAllModals} />
                    </div>
                )}
            </div>

            {/* Cart */}
            <div className="relative">
                <button
                    className="cursor-pointer p-0 hover:text-lime-200"
                    aria-label="Cart"
                    onClick={cartIconHandler}
                    title="Cart List">
                    {/* Shopping Cart SVG */}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8m0 0a2 2 0 104 0m-4 0H17m0 0a2 2 0 104 0m-4 0h-1.4"
                        />
                    </svg>
                    <span className="absolute -top-3 -right-5 text-xs bg-white text-red-700 font-bold rounded-full px-1.5">
                        {cartList?.length || 0}
                    </span>
                </button>

                {/* Dropdown */}
                {showCart && (
                    <div className="absolute md:top-[40px] md:-right-[60px] w-[300px] bg-white shadow-xl shadow-lg text-black rounded-md z-50 p-3">
                        <Cart showCart={showCart} cartList={cartList} closeCart={closeAllModals} showCrossIcon={true} />
                    </div>
                )}
            </div>

            {/* User Icon with Dropdown */}
            <div className="relative">
                <button
                    className="cursor-pointer p-0 ms-1 hover:text-lime-200 focus:outline-none"
                    aria-label="Account"
                    onClick={userMenuHandler}
                    title="Account Menu">
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
                </button>
                {/* 4. Pass dashboardHandler down to UserDropdown */}
                {showUserMenu && (
                    <UserDropdown session={session} closeMenu={closeAllModals} dashboardHandler={dashboardHandler} />
                )}
            </div>
        </div>
    );
};

export default HeaderIcon;
