'use client';

import { useState, useEffect } from 'react';
import AddToCart from '../buttons/AddToCart';
import { deleteWish } from '@/services/wishList';
import { useRouter } from 'next/navigation';
import CartList from '@components/addToCart/CartList';
import { getAddToCartList } from '@/services/addToCart';
import { useSession } from 'next-auth/react';

const CartItem = ({ item, updateQtyHandler, onRemove, onToggleSelect, sidebarHandler }) => {
    return (
        <div className="flex flex-col sm:flex-row items-center p-2 bg-white border-b border-gray-200">
            <div className="flex-grow flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
                <div className="flex gap-2 w-full sm:w-[60%]">
                    <img
                        src={item.vendor_products?.products?.product_images?.[0]?.file_name}
                        alt="Product"
                        className="w-20 h-20 object-cover mr-4 rounded"
                    />
                    <div>
                        <h3 className="text-gray-800 font-semibold">
                            {item.vendor_products?.products?.prod_name || ''}
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
                            <button
                                className="group relative text-red-400 bg-gray-100 hover:text-red-500 hover:bg-gray-300 p-2 rounded-full transition"
                                aria-label="Remove Item"
                                onClick={() => onRemove(item)}>
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
                                <span className="opacity-0 group-hover:opacity-100 absolute left-1/2 -translate-x-1/2 bottom-full mb-2 text-xs bg-green-700 text-white py-1 px-2 rounded shadow transition font-bold">
                                    Remove
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center sm:items-center ">
                        <AddToCart vendorProdId={item.vendor_prod_id} hideQty={true} cartListHandler={sidebarHandler} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function WishlistPage({ wishList }) {
    const [wishlistItems, setWishlistItems] = useState(wishList);
    const [cartList, setCartList] = useState(wishList);
    const [sidebar, setSidebar] = useState(false);

    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        setWishlistItems(wishList?.map((item) => ({ ...item, qty: 1, isRemoving: false })));

        return () => {};
    }, [wishList]);

    const handleRemoveItem = async (item) => {
        try {
            await deleteWish(item.id);
            router.refresh();

            setWishlistItems((prev) =>
                prev.map((fl) =>
                    fl.vendor_info?.id === item.vendor_products?.vendors?.id
                        ? {
                              ...fl,
                              items: fl.items.filter((it) => it.id !== item.id)
                          }
                        : fl
                )
            );
        } catch (err) {
            console.error('Failed to remove wishlist item:', err);
            throw err;
        }
    };

    const sidebarHandler = async (val) => {
        if (session?.user) {
            const res = await getAddToCartList();
            const cartListData = res?.cart_items || 0;
            const list = (cartListData?.length && cartListData?.map((item) => ({ ...item, isRemoving: false }))) || [];

            setCartList(list);
        }
        setSidebar(val);
    };

    const closeCart = async () => {
        setSidebar(false);
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
                                                sidebarHandler={sidebarHandler}
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
            {sidebar && (
                <div className="fixed top-[55] right-0 z-50 h-full transform transition-transform duration-300 ease-in-out">
                    <CartList cartList={cartList} closeCart={closeCart} showCrossIcon={true} />
                </div>
            )}
        </div>
    );
}
