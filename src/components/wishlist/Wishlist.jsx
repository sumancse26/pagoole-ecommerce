'use client';

import { useState, useEffect } from 'react';
// import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { doSocialLogin } from '@/app/actions/authAction';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { createAddToCart } from '@/services/addToCart';

// --- ICONS ---
const TrashIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-5 w-5">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
    </svg>
);
const CartIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-4 w-4">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.343 1.087-.835l1.821-6.831M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
    </svg>
);

export default function WishlistPage({ wishList }) {
    const [wishlistItems, setWishlistItems] = useState([]);

    const { data: session, status } = useSession();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        setWishlistItems(wishList?.map((item) => ({ ...item, qty: 1, isRemoving: false })));

        return () => {};
    }, [wishList]);

    const qtyHandler = (val, item) => {
        if (val === 'decrement' && item.qty > 1) {
            console.log(item, wishlistItems);
            const currentList = wishlistItems.map((fl) => {
                if (fl.id == item.id) {
                    fl.qty = fl.qty - 1;
                }

                return fl;
            });
            setWishlistItems(currentList);
        } else if (val === 'increment') {
            const currentList = wishlistItems.map((fl) => {
                if (fl.id == item.id) {
                    fl.qty = fl.qty + 1;
                }

                return fl;
            });
            setWishlistItems(currentList);
        }
    };

    const addToCartHandler = async (item) => {
        const data = {
            vendorProdId: item.vendor_products?.id,
            quantity: item.qty
        };
        if (status === 'authenticated') {
            const res = await createAddToCart(data);
            router.refresh();
            alert('Added to cart');
        }
        if (status === 'unauthenticated') {
            const fullPath = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;

            const result = await doSocialLogin('google', fullPath);
        }
    };

    const handleRemoveItem = (id) => {
        setWishlistItems((items) => items.map((item) => (item.id === id ? { ...item, isRemoving: true } : item)));
        setTimeout(() => {
            setWishlistItems((currentItems) => currentItems.filter((item) => item.id !== id));
        }, 500); // Must match transition duration
    };

    return (
        <div className="py-16 px-4 md:px-10 bg-gray-50 text-gray-800 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-10">Your Wishlist</h1>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="text-xs text-gray-500 uppercase bg-gray-50/70">
                                <tr>
                                    <th scope="col" className="px-6 py-4 font-semibold text-left">
                                        Product
                                    </th>

                                    <th scope="col" className="px-6 py-4 font-semibold text-right">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-4 font-semibold text-center">
                                        Quantity
                                    </th>
                                    <th scope="col" className="px-6 py-4 font-semibold text-center">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-4 font-semibold text-center">
                                        Action
                                    </th>
                                    <th scope="col" className="px-4 py-4">
                                        <span className="sr-only">Remove</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {wishlistItems.map((item, index) => (
                                    <tr
                                        key={item.id}
                                        className={`
                                            transition-all duration-500 ease-in-out
                                            ${
                                                item.isRemoving
                                                    ? 'opacity-0 -translate-x-8'
                                                    : 'opacity-100 translate-x-0'
                                            }
                                        `}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-4">
                                                <img
                                                    src={item.vendor_products?.products?.file_server?.base_url}
                                                    alt={item.vendor_products?.products?.prod_name}
                                                    className="h-16 w-16 rounded-lg object-cover"
                                                />
                                                <div>
                                                    <div className="font-semibold text-gray-900">
                                                        {item.vendor_products?.products?.prod_name}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right font-medium">
                                            {item.vendor_products?.price?.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 text-right font-medium flex justify-center">
                                            <div className="flex items-center justify-center border border-green-300 rounded-md overflow-hidden w-28 bg-white">
                                                <button
                                                    onClick={() => qtyHandler('decrement', item)}
                                                    className="w-8 h-8 text-lg text-green-600 hover:bg-green-100">
                                                    −
                                                </button>
                                                <input
                                                    type="text"
                                                    value={item.qty}
                                                    readOnly
                                                    className="w-12 text-center border-x border-green-300 outline-none focus:ring-0 focus:border-green-500"
                                                />
                                                <button
                                                    onClick={() => qtyHandler('increment', item)}
                                                    className="w-8 h-8 text-lg text-green-600 hover:bg-green-100">
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {item.vendor_products?.stock_qty ? (
                                                <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                                                    In Stock
                                                </span>
                                            ) : (
                                                <span className="inline-block bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                                                    Out of Stock
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => addToCartHandler(item)}
                                                disabled={!item.vendor_products?.stock_qty}
                                                className="flex items-center justify-center gap-2 bg-green-700 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                                <CartIcon />
                                                Add to Cart
                                            </button>
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <button
                                                onClick={() => handleRemoveItem(item.id)}
                                                className="p-2 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                                aria-label={`Remove ${item.name}`}>
                                                <TrashIcon />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {wishlistItems.length === 0 && (
                            <div className="text-center py-20">
                                <h2 className="text-xl font-semibold text-gray-600">Your Wishlist is Empty</h2>
                                <p className="text-gray-400 mt-2">Items you save for later will appear here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
