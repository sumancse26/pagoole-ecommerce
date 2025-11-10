'use client';

import Link from 'next/link';
import { getAddToCartList } from '@/services/addToCart';
import { getWishList } from '@/services/wishList';
import HeaderIcons from './HeaderIcon';
// import { auth } from '@/auth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { setSharedData } from '@/hooks/useSharedData';
import { getSearchedProducts } from '@/services/product.js';
import { useEffect, useState } from 'react'; 

const HeaderComp = () => {
    const [searchStringData, setSearchStringData] = useState('');
    // const session = await auth();
    const router = useRouter();
    const { data: session, status } = useSession();

    let cartList = [];
    let wishList = [];

    useEffect(()=> {
        if (session?.user) {
        fetchData();
    }
    }, [])

    const fetchData = async () => {
        try {
            const res = await getAddToCartList();
            const cartListData = res?.cart_items || 0;
            cartList = (cartListData?.length && cartListData?.map((item) => ({ ...item, isRemoving: false }))) || [];

            const wish = await getWishList();
            wishList = wish.wish_lists || [];
        } catch (err) {
            console.error(err.message);
        }
    };

    const fetchSearchProductHandler = async () => {
        try {
            const res = await getSearchedProducts(searchStringData);

            setSharedData({ isSearch: true, list: res.product_list });

            router.push('/');
        } catch (err) {
            console.error(err.message);
        }
    };

    const homeBtnHandler = () => {
        setSharedData({ isSearch: false, list: [] });
        setSearchStringData(' ');
        router.push('/');
    };

    const searchProduct = (e) => {
        e.preventDefault();
        fetchSearchProductHandler();
    };

    return (
        <header className="bg-white shadow sticky top-0 z-45">
            {/* Green Top Bar */}
            <div className="bg-green-600">
                <div className="mx-auto px-4 py-1 flex flex-wrap md:flex-nowrap items-center justify-between gap-[85px]">
                    {/* Logo */}
                    <div className="flex items-center gap-3 justify-center cursor-pointer ml-14 text-2xl font-extrabold bg-gradient-to-r from-white via-lime-300 to-green-100 bg-clip-text text-transparent drop-shadow-md">
                                <div className="text-3xl font-bold mb-4">
                                    <span className="text-red-600">P</span>
                                    <span className="text-blue-600">a</span>
                                    <span className="text-green-500">g</span>
                                    <span className="text-yellow-500">o</span>
                                    <span className="text-green-500">o</span>
                                    <span className="text-blue-600">l</span>
                                    <span className="text-red-600">e</span>
                                </div> 
                        {/* <span
                            onClick={homeBtnHandler}
                            className="cursor-pointer ml-14 text-2xl font-extrabold bg-gradient-to-r from-white via-lime-300 to-green-100 bg-clip-text text-transparent drop-shadow-md">
                            Pagoole Shop
                        </span> */}
                    </div>

                    <div className="hidden md:flex flex-1 justify-center">
                        <form className="w-full relative flex items-center gap-3" onSubmit={searchProduct}>
                            {/* Search Input */}
                            <div className="relative flex-1 px-2">
                                <input
                                    type="search"
                                    placeholder="Search for products..."
                                    className="w-full h-12 pl-5 pr-12 rounded-full text-gray-800 placeholder-gray-500 bg-white border border-green-500 shadow focus:ring-2 focus:ring-green-500 focus:outline-none transition"
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
                                    className="px-3 bg-[#ff686e] text-white px-4 py-2 rounded-lg font-medium tracking-[2px] whitespace-nowrap"
                                    aria-label="Go to Shop Order homepage">
                                    Shop Order
                                </button>
                            </Link>
                        </form>
                    </div>
                    <div className="flex gap-5">
                        <Link className="block md:hidden" href="/shop">
                            <button
                                type="button"
                                className="px-4 py-2 bg-[#ff686e] text-white rounded-lg font-medium tracking-[2px] whitespace-nowrap"
                                aria-label="Go to Shop Order homepage">
                                Shop Order
                            </button>
                        </Link>

                        {/* Icons */}
                        <HeaderIcons cartItemList={cartList} wishItemList={wishList} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderComp;
