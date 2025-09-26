'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { deleteWish } from '@/services/wishList';
import { useRouter } from 'next/navigation';

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

const CartListTable = ({ showWishList, wishList, closeWish }) => {
    const [cartItems, setCartItems] = useState([]);
    const [showWish, setShowWish] = useState(false);

    const router = useRouter();

    useEffect(() => {
        setCartItems(wishList);

        return () => {};
    }, [wishList]);

    useEffect(() => {
        setShowWish(showWishList);

        return () => {};
    }, [showWishList]);

    const handleRemoveItem = async (id) => {
        try {
            await deleteWish(id);
            router.refresh();
            setCartItems(
                cartItems?.length && cartItems?.map((item) => (item.id === id ? { ...item, isRemoving: true } : item))
            );

            setTimeout(() => {
                setCartItems((currentItems) => currentItems?.filter((item) => item.id !== id));
            }, 500);
        } catch (err) {
            throw new Error(err.message);
        }
    };

    const closeWishModal = () => {
        closeWish();
    };

    if (showWish && cartItems?.length === 0) {
        return (
            <div className="text-center py-20 bg-white rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-700">Your Cart is Empty</h2>
                <p className="text-gray-500 mt-3">There are no items to display.</p>
            </div>
        );
    }

    return (
        <div>
            <div className="relative w-[360px]">
                <div className=" rounded-xlflex flex-col ">
                    <div>
                        <div className="flex items-center justify-between p-4 border-b border-gray-300">
                            <h6 className="font-bold text-gray-500">Wish List</h6>

                            <div className="relative h-6 w-6" onClick={closeWishModal}>
                                <div className="absolute inset-y-0 left-1/2 w-0.5 bg-gray-600 transform -translate-x-1/2 rotate-45"></div>
                                <div className="absolute inset-y-0 left-1/2 w-0.5 bg-gray-600 transform -translate-x-1/2 -rotate-45"></div>
                            </div>
                        </div>

                        <table className="w-full text-sm text-left block">
                            {/* --- Table Header --- */}
                            <thead className="text-xs text-gray-600 uppercase ">
                                <tr className="border-b border-gray-300">
                                    <th className="w-6/12 px-6 py-3 font-semibold">Product</th>
                                    <th className="w-2/12 px-6 py-3 font-semibold text-right">Price</th>
                                    <th className="w-2/12 px-1 py-3 text-right"></th>
                                </tr>
                            </thead>

                            {/* --- Table Body --- */}
                            <tbody className="divide-y divide-gray-300 h-[600px] overflow-y-auto block">
                                {cartItems?.length > 0 &&
                                    cartItems?.map((item, indx) => (
                                        <tr
                                            key={indx}
                                            className={`
                                               transition-opacity duration-500 ease-out last:border-b last:border-gray-300
                                               ${item.isRemoving ? 'opacity-0' : 'opacity-100'}
                                           `}>
                                            <td className="px-6 py-1 w-6/12">
                                                <div className="font-semibold text-gray-900">
                                                    {item.vendor_products?.products?.prod_name || ''}
                                                </div>
                                            </td>
                                            <td className="w-2/12 px-6 py-1 text-right text-gray-600 text-right">
                                                {item?.vendor_products?.price?.toFixed(2) || 0}
                                            </td>

                                            <td className="w-2/12 px-1 py-1 text-right">
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveItem(item.id)}
                                                    className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-gray-100 transition-colors duration-200"
                                                    aria-label={`Remove ${item.name}`}>
                                                    <TrashIcon />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Link
                href="/wish-list"
                className="absolute bottom-0  !w-[100%] left-0 right-0 flex-1 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md  sm:w-auto flex items-center justify-center mt-5">
                <svg
                    className="w-5 h-5 mr-1 mt-1"
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
                Go to Wish List
            </Link>
        </div>
    );
};

export default CartListTable;
