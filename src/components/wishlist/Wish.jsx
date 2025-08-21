'use client';

import { useState, useEffect } from 'react';

//import Image from 'next/image';

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

const CartListTable = ({ wishList }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        setCartItems(wishList);
        return () => {};
    }, [wishList]);

    const handleRemoveItem = (id) => {
        setCartItems(
            cartItems?.length && cartItems?.map((item) => (item.id === id ? { ...item, isRemoving: true } : item))
        );

        setTimeout(() => {
            setCartItems((currentItems) => currentItems?.filter((item) => item.id !== id));
        }, 500);
    };

    if (cartItems?.length === 0) {
        return (
            <div className="text-center py-20 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-700">Your Cart is Empty</h2>
                <p className="text-gray-500 mt-3">There are no items to display.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-lg">
            <table className="w-full text-sm text-left">
                {/* --- Table Header --- */}
                <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 border-b border-gray-200">
                    <tr>
                        <th scope="col" className="px-6 py-4 font-semibold">
                            Product
                        </th>

                        <th scope="col" className="px-6 py-4 font-semibold text-right">
                            Price
                        </th>
                        <th scope="col" className="px-1 py-4">
                            <span className="sr-only">Remove</span>
                        </th>
                    </tr>
                </thead>

                {/* --- Table Body --- */}
                <tbody className="h-[200px] divide-y divide-gray-200 overflow-y-scroll">
                    {cartItems?.length &&
                        cartItems?.map((item, indx) => (
                            <tr
                                key={indx}
                                className={`
                                    transition-opacity duration-500 ease-out
                                    ${item.isRemoving ? 'opacity-0' : 'opacity-100'}
                                `}>
                                <td className="px-6 py-4">
                                    <div className="font-semibold text-gray-900">{item.products?.prod_name || ''}</div>
                                </td>

                                {/* --- Quantity & Price Cells --- */}
                                <td className="px-6 py-4 text-center font-medium text-gray-700">
                                    {item.products?.mrp || 0}
                                </td>

                                <td className="px-1 py-4 text-center">
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
    );
};

export default CartListTable;
