'use client';

import { useState, useEffect } from 'react';

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

const CartPage = ({ cartList }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        setCartItems(cartList);
        return () => {};
    }, [cartList]);

    const qtyHandler = (val, item) => {
        if (val === 'decrement' && item.qty > 1) {
            const currentList = cartItems.map((fl) => {
                if (fl.id == item.id) {
                    fl.qty = fl.qty - 1;
                }

                return fl;
            });
            setCartItems(currentList);
        } else if (val === 'increment') {
            const currentList = cartItems.map((fl) => {
                if (fl.id == item.id) {
                    fl.qty = fl.qty + 1;
                }

                return fl;
            });
            setCartItems(currentList);
        }
    };

    const removeProduct = (data) => {
        //cart item should be removed from db

        const currentList = cartItems.filter((fl) => fl.id != data.id);
        setCartItems(currentList);
    };

    const cartSUbTotal = () => {
        return cartItems.reduce((prev, cur) => {
            const total = Number(cur.qty) * Number(cur.vendor_products?.price);

            return (prev += total);
        }, 0);
    };

    return (
        <div className="py-12 px-4 md:px-10 bg-gray-50 text-gray-900">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold mb-8 text-green-600">Shopping Cart</h1>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border border-gray-200">
                        <thead className="bg-green-100 text-green-700 uppercase">
                            <tr>
                                <th className="p-3 w-16"></th>
                                <th className="p-3">Product</th>
                                <th className="p-3">Price</th>
                                <th className="p-3">Quantity</th>
                                <th className="p-3">Total</th>
                                <th className="p-3">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems?.map((item, i) => (
                                <tr key={i} className="border-t border-gray-200">
                                    <td className="p-3">
                                        <img
                                            src={item.vendor_products?.products?.file_server?.base_url}
                                            alt={item.vendor_products?.products?.file_server?.base_url}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    </td>
                                    <td className="p-3 font-medium text-green-700">
                                        {item.vendor_products?.products?.prod_name || ''}
                                    </td>
                                    <td className="p-3">TK. {item.vendor_products?.price || 0}</td>
                                    <td className="p-3">
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
                                    <td className="p-3 font-semibold">
                                        {Number(item.qty) * Number(item.vendor_products?.price) || 0}
                                    </td>

                                    <td
                                        onClick={() => removeProduct(item)}
                                        className="p-3 hover:text-red-700 cursor-pointer">
                                        <TrashIcon />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Coupon & Update Cart */}
                <div className="mt-8 flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex items-center border border-gray-300 rounded overflow-hidden w-full md:w-1/2 focus-within:border-green-500">
                        <input
                            type="text"
                            placeholder="Enter Coupon Code..."
                            className="w-full px-4 py-2 focus:outline-none focus:border-green-500"
                        />
                        <button className="bg-green-600 text-white px-4 py-2 hover:bg-green-700">Apply</button>
                    </div>
                    <button className="border border-green-600 text-green-600 px-6 py-2 rounded hover:bg-green-600 hover:text-white">
                        Update Cart
                    </button>
                </div>

                {/* Cart Totals */}
                <div className="mt-12 grid md:grid-cols-2 gap-10">
                    <div>
                        <h2 className="text-lg font-semibold mb-3">Calculate Shipping</h2>
                        <form className="space-y-3">
                            <select className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-green-500">
                                <option>Choose Country</option>
                                <option>Bangladesh</option>
                                <option>India</option>
                            </select>
                            <input
                                type="text"
                                placeholder="State / Country"
                                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-green-500"
                            />
                            <input
                                type="text"
                                placeholder="Postcode / ZIP"
                                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-green-500"
                            />
                            <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
                                Update Totals
                            </button>
                        </form>
                    </div>

                    <div className="border border-gray-300 p-6 rounded">
                        <h2 className="text-lg font-semibold mb-3">Cart Totals</h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span>Cart Subtotal</span>
                                <span>TK. {cartSUbTotal()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span className="text-green-600">Free Shipping</span>
                            </div>
                            <div className="flex justify-between font-bold text-base">
                                <span>Total</span>
                                <span>TK. {cartSUbTotal()}</span>
                            </div>
                        </div>
                        <button className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
