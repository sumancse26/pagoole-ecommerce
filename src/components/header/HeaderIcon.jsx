'use client';

import Wish from '../wishlist/Wish';
import Cart from '@components/addToCart/CartList';
import Link from 'next/link';
import { useEffect, useState } from 'react';
// import { getAddToCartList } from '@/services/addToCart';
// import { getWishList } from '@/services/wishList';
import { useSession } from 'next-auth/react';

const HeaderIcon = ({ cartItemList = [], wishItemList = [] }) => {
    const [cartList, setCartList] = useState([]);
    const [wishList, setWishList] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [showWishList, setShowWishList] = useState(false);

    useEffect(() => {
        setCartList(cartItemList);
        return () => {};
    }, [cartItemList]);

    useEffect(() => {
        setWishList(wishItemList);
        return () => {};
    }, [wishItemList]);

    //const { data: session, status } = useSession();

    // useEffect(() => {
    //     console.log('session', status, session);
    //     if (status === 'authenticated') {
    //         fetchCartList();
    //         fetchWishList();
    //     }

    //     return () => {};
    // }, [status]);

    // const fetchCartList = async () => {
    //     try {
    //         const res = await getAddToCartList();
    //         const cartListData = res?.cart_items || 0;
    //         const list = (cartListData?.length && cartListData?.map((item) => ({ ...item, isRemoving: false }))) || [];

    //         console.log('list', list);
    //         setCartList(list || []);
    //     } catch (err) {
    //         throw new Error(err.message);
    //     }
    // };

    // const fetchWishList = async () => {
    //     try {
    //         const wish = await getWishList();
    //         const list = wish.wish_lists || [];
    //         setWishList(list || []);
    //     } catch (err) {
    //         throw new Error(err.message);
    //     }
    // };

    const handleRemoveItem = () => {
        setShowCart(false);
    };

    const cartIconHandler = () => {
        setShowCart((prev) => !prev);
    };

    const wishListHandler = () => {
        setShowWishList((prev) => !prev);
    };

    const closeWishModal = () => {
        setShowWishList(false);
    };
    return (
        <>
            <div className="flex items-center gap-5 text-white">
                {/* Wishlist */}
                <div className="relative group">
                    <button
                        className="p-0 hover:text-lime-200"
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
                        <div className="w-100 absolute  group-hover:block md:top-[40px] md:-right-[100px] bg-green-100 shadow-md text-black rounded-md z-50 p-3">
                            <Wish showWishList={showWishList} wishList={wishList} closeWish={closeWishModal} />
                        </div>
                    )}
                </div>

                {/* Cart */}
                <div className="relative group">
                    <button
                        className="p-0 hover:text-lime-200"
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
                        <div className="w-100 absolute  group-hover:block md:top-[40px] md:-right-[60px] bg-green-100 shadow-md shadow-lg text-black rounded-md z-50 p-3">
                            <Cart
                                showCart={showCart}
                                cartList={cartList}
                                closeCart={handleRemoveItem}
                                showCrossIcon={true}
                            />
                        </div>
                    )}
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
        </>
    );
};

export default HeaderIcon;
