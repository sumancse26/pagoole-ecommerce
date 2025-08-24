import Link from 'next/link';
import Cart from '@components/addToCart/CartList';
import { getAddToCartList } from '@/services/addToCart';
import { getWishList } from '@/services/wishList';
import Wish from '../wishlist/Wish';
import { auth } from '@/auth';

const HeaderComp = async () => {
    const session = await auth();

    let cartList = [];
    let wishList = [];

    if (session?.user) {
        const res = await getAddToCartList();
        const cartListData = res?.cart_items || 0;
        cartList = (cartListData?.length && cartListData?.map((item) => ({ ...item, isRemoving: false }))) || [];

        const wish = await getWishList();
        wishList = wish.wish_lists || [];
    }

    return (
        <header className="bg-white shadow sticky top-0 z-40">
            {/* Green Top Bar */}
            <div className="bg-green-600">
                <div className="container mx-auto px-4 py-3 flex flex-wrap md:flex-nowrap items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/">
                            <span className="ml-14 text-2xl font-extrabold bg-gradient-to-r from-white via-lime-300 to-green-100 bg-clip-text text-transparent drop-shadow-md">
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
                        <Link href="/shop">
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
                                    {wishList?.length || 0}
                                </span>
                            </Link>
                            {/* Dropdown */}
                            <div className="absolute hidden group-hover:block top-10 right-0 bg-white shadow-md text-black rounded-md z-50 p-3">
                                <Wish wishList={wishList} />
                                <Link
                                    href="/wish-list"
                                    className="!w-[100%] flex-1 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md  sm:w-auto flex items-center justify-center mt-3">
                                    <svg className="h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                    Go to Wish List
                                </Link>
                            </div>
                        </div>

                        {/* Cart */}
                        <div className="relative group">
                            <Link href="#" className="p-2 hover:text-lime-200" aria-label="Cart">
                                {/* Shopping Cart SVG */}
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8m0 0a2 2 0 104 0m-4 0H17m0 0a2 2 0 104 0m-4 0h-1.4"
                                    />
                                </svg>
                                <span className="absolute -top-1.5 -right-1.5 text-xs bg-white text-green-700 font-bold rounded-full px-1.5">
                                    {cartList?.length || 0}
                                </span>
                            </Link>
                            {/* Dropdown */}
                            <div className="absolute hidden group-hover:block top-10 right-0 bg-white shadow-md text-black rounded-md z-50 p-3">
                                <Cart cartList={cartList} />
                                <Link
                                    href="/add-to-cart"
                                    className="!w-[100%] flex-1 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md  sm:w-auto flex items-center justify-center mt-3">
                                    <svg className="h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                    Go to Cart Details
                                </Link>
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
