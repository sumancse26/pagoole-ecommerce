'use client';

import { useState, useEffect } from 'react';
import AddToCart from '../buttons/AddToCart';

const CartItem = ({ item, updateQtyHandler, onRemove, onToggleSelect }) => {
    return (
        <div className="flex flex-col sm:flex-row items-center p-2 bg-white border-b border-gray-200">
            <div className="flex-grow flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
                <div className="flex gap-2 w-full sm:w-[60%]">
                    <img
                        src={item.vendor_products?.products?.file_server?.base_url}
                        alt="Product"
                        className="w-20 h-20 object-cover mr-4 rounded"
                    />
                    <div>
                        <h3 className="text-gray-800 font-semibold">
                            {item.vendor_products?.products?.prod_name || ''} {item.vendor_products?.vendors.id}
                        </h3>

                        <p className="text-sm text-gray-500">{item.vendor_products?.products?.brands?.name || ''}</p>

                        {item.endDate && <p className="text-xs text-red-500">Ends at {item.endDate}</p>}
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between w-full sm:w-[40%] mt-4 sm:mt-0">
                    <div className="flex flex-col items-start sm:items-end mb-4 sm:mb-0">
                        <div className="text-lg font-bold text-green-600">৳ {item.vendor_products?.price || 0}</div>

                        <div className="text-sm text-gray-400 line-through">
                            ৳ {item.vendor_products?.products?.mrp || 0}
                        </div>

                        <p className="text-sm text-gray-600 mt-2">Stock: {item.vendor_products?.stock_qty || 0}</p>
                        <div className="flex items-center space-x-2 mt-2">
                            <button className="text-gray-400 hover:text-red-500" onClick={() => onRemove(item)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center sm:items-center ">
                        <AddToCart vendorProdId={item.vendor_prod_id} hideQty={true} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function WishlistPage({ wishList }) {
    const [wishlistItems, setWishlistItems] = useState(wishList);

    useEffect(() => {
        setWishlistItems(wishList?.map((item) => ({ ...item, qty: 1, isRemoving: false })));

        return () => {};
    }, [wishList]);

    const handleRemoveItem = (item) => {
        const currentList = wishlistItems.map((fl) => {
            if (fl.vendor_info && item.vendor_products?.vendors?.id == fl.vendor_info.id) {
                fl.items = fl.items?.filter((it) => it.id != item.id);
            }
            return fl;
        });
        setWishlistItems(currentList);
    };

    return (
        <div className="container mx-auto px-4 py-6 md:px-6 lg:px-8">
            <h1 className="font-bold text-gray-600 py-6 text-2xl">Your Wish List</h1>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-[80%] space-y-6">
                    {wishlistItems.length === 0 ? (
                        <div className="text-center py-10 text-gray-600">Your cart is empty.</div>
                    ) : (
                        wishlistItems.map((vendorGroup) => (
                            <div
                                key={vendorGroup.vendor_info.id}
                                className="vendor-section mb-6 bg-white shadow-md rounded-lg overflow-hidden">
                                <div className="bg-gray-100 p-4 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                                    <h2 className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">
                                        Shop:
                                        <span className="font-bold text-green-700 ps-3">
                                            {vendorGroup?.vendor_info?.store_name}
                                        </span>
                                    </h2>
                                </div>

                                <div className="vendor-items">
                                    {Array.isArray(vendorGroup.items) && vendorGroup.items.length > 0 ? (
                                        vendorGroup.items.map((item) => (
                                            <CartItem
                                                key={item.id}
                                                item={item}
                                                updateQtyHandler={() => {}}
                                                onRemove={handleRemoveItem}
                                                onToggleSelect={() => {}}
                                            />
                                        ))
                                    ) : (
                                        <div className="p-4 text-gray-500">No items from this vendor.</div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
