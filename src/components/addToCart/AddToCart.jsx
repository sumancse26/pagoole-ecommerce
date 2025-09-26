'use client';

import { useEffect, useState } from 'react';
import ProductIcon from '../products/ProductIcon';
import { useRouter } from 'next/navigation';
import { deleteCartItem } from '@/services/addToCart';

const CartItem = ({ item, updateQtyHandler, onRemove, onToggleSelect }) => {
    return (
        <div className="flex flex-col sm:flex-row items-center p-2 bg-white border-b border-gray-200">
            <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-green-600 rounded mb-4 sm:mb-0 sm:mr-4"
                value=""
                checked={!!item.checked}
                onChange={(e) => onToggleSelect({ ...item, checked: e.target.checked })}
            />
            <div className="flex-grow flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
                <div className="flex gap-2 w-full sm:w-[60%]">
                    <img
                        src={item.vendor_products?.products?.product_images?.[0]?.file_name}
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
                            <ProductIcon productInfo={item} />
                            <button
                                className="group relative text-gray-400 bg-gray-100 p-2 rounded-full text-red-500  hover:text-red-500 hover:bg-gray-300 transition"
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
                    <div className="flex flex-col items-start sm:items-end">
                        <p>
                            Total: <span className="text-green-700 font-bold">{item.item_total}</span>
                        </p>
                        <div className="flex items-center mt-2">
                            <button
                                className="px-3 py-1 bg-green-500 text-white rounded-l hover:bg-green-600"
                                onClick={() => updateQtyHandler('decrement', item)}
                                disabled={item.qty <= 1}>
                                -
                            </button>
                            <span className="px-3 py-1 bg-green-100 border-t border-b border-green-200 text-gray-800">
                                {item.qty}
                            </span>
                            <button
                                className="px-3 py-1 bg-green-500 text-white rounded-r hover:bg-green-600"
                                onClick={() => updateQtyHandler('increment', item)}>
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function CartPage({ cartList, wishList }) {
    const [items, setItems] = useState(cartList);
    const [shippingFee, setShippingFee] = useState(60);

    const router = useRouter();

    useEffect(() => {
        disableWishHandler();

        return () => {};
    }, [cartList]);

    const disableWishHandler = () => {
        const currentList = items.map((fl) => {
            if (fl.vendor_info) {
                return {
                    ...fl,
                    items: fl.items.map((it) => {
                        const filteredWish = wishList.find((wh) => wh.vendor_prod_id == it.vendor_prod_id);

                        return {
                            ...it,
                            disable_wish: !!filteredWish,
                            checked: false
                        };
                    })
                };
            }
            return { ...fl };
        });

        setItems((pre) => currentList);
    };

    const qtyHandler = (val, item) => {
        if (val === 'decrement' && item.qty > 1) {
            const currentList = items.map((fl) => {
                if (fl.vendor_info && fl.vendor_info.id && item.vendor_products?.vendors?.id == fl.vendor_info.id) {
                    fl.items = fl.items.map((it) => {
                        if (it.vendor_products && it.id == item.id) {
                            it.qty = Math.max(0, (it.qty || 0) - 1);
                            it.item_total = (it.qty || 0) * (it.vendor_products.price || 0);
                        }
                        return it;
                    });
                }
                return fl;
            });
            setItems(currentList);
        } else if (val === 'increment') {
            const currentList = items.map((fl) => {
                if (fl.vendor_info && fl.vendor_info.id && item.vendor_products?.vendors?.id == fl.vendor_info.id) {
                    fl.items = fl.items.map((it) => {
                        if (it.vendor_products && it.id == item.id) {
                            it.qty = Math.max(0, (it.qty || 0) + 1);
                            it.item_total = (it.qty || 0) * (it.vendor_products.price || 0);
                        }
                        return it;
                    });
                }
                return fl;
            });
            setItems(currentList);
        }
    };

    const cartSubTotal = () =>
        items.reduce(
            (totalSum, { items: vendorItems = [] }) =>
                totalSum +
                vendorItems.reduce(
                    (groupSum, item) =>
                        item.checked ? groupSum + (+item.vendor_products?.price || 0) * (+item.qty || 0) : groupSum,
                    0
                ),
            0
        );

    const cartTotal = () => {
        return cartSubTotal() + calculateTotalDeliveryFee();
    };

    const isProceed = () => {
        return items.some((out) => out.items.some((it) => it.checked));
    };

    const handleToggleSelect = (item) => {
        const currentList = items.map((fl) => {
            if (fl.vendor_info && fl.vendor_info.id && item.vendor_products?.vendors?.id == fl.vendor_info.id) {
                fl.items = fl.items.map((it) => {
                    if (it.vendor_products && it.id == item.id) {
                        it.checked = item.checked;
                    }
                    return it;
                });
            }
            return fl;
        });
        setItems(currentList);
    };

    const handleSelectAll = (vendorGroup, checked) => {
        const currentList = items.map((fl) => {
            if (fl.vendor_info && fl.vendor_info.id && vendorGroup.vendor_info?.id == fl.vendor_info.id) {
                fl.items = fl.items.map((it) => {
                    it.checked = checked;
                    return it;
                });
            }

            return fl;
        });
        setItems(currentList);
    };

    const handleRemoveItem = async (item) => {
        try {
            await deleteCartItem(item.id);
            router.refresh();
            const currentList = items.map((fl) => {
                if (fl.vendor_info && item.vendor_products?.vendors?.id == fl.vendor_info.id) {
                    fl.items = fl.items?.filter((it) => it.id != item.id);
                }
                return fl;
            });
            setItems(currentList);
        } catch (err) {
            throw new Error(err.message);
        }
    };

    const productToProcedHandler = () => {
        const currentList = items.map((fl) => ({
            ...fl,
            items: fl.items.filter((it) => it.checked)
        }));

        return currentList;
    };

    const proceedBtnHandler = async () => {
        const data = await productToProcedHandler();

        const now = Date.now();
        const item = {
            checkout_info: data,
            expiry: now + 10 * 60 * 1000
        };
        localStorage.setItem('checkout_data', JSON.stringify(item));
        router.push('/checkout');
    };

    const calculateTotalDeliveryFee = () => {
        const vendors = items.filter((vendor) => vendor?.items?.some((product) => product.checked));
        return shippingFee * vendors?.length || 0;
    };

    return (
        <div className="container mx-auto px-4 py-6 md:px-6 lg:px-8">
            <h1 className="font-bold text-gray-600 py-6 text-2xl">Your Shopping Cart</h1>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-[70%] space-y-6">
                    {items.length === 0 ? (
                        <div className="text-center py-10 text-gray-600">Your cart is empty.</div>
                    ) : (
                        items.map((vendorGroup) => (
                            <div
                                key={vendorGroup.vendor_info.id}
                                className="vendor-section mb-6 bg-white shadow-md rounded-lg overflow-hidden">
                                <div className="bg-gray-100 p-4 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center gap-7">
                                    <div className="flex items-center gap-2">
                                        <input
                                            onChange={(e) => handleSelectAll(vendorGroup, e.target.checked)}
                                            type="checkbox"
                                            className="form-checkbox h-5 w-5 text-green-600 rounded"
                                        />
                                        <span className="mr-2 text-gray-700 text-sm font-bold">Select All</span>
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">
                                        Shop:
                                        <span className="font-bold text-green-700 ps-3">
                                            {vendorGroup.vendor_info.store_name}
                                        </span>
                                    </h2>
                                </div>

                                <div className="vendor-items">
                                    {Array.isArray(vendorGroup.items) && vendorGroup.items.length > 0 ? (
                                        vendorGroup.items.map((item) => (
                                            <CartItem
                                                key={item.id}
                                                item={item}
                                                updateQtyHandler={qtyHandler}
                                                onRemove={handleRemoveItem}
                                                onToggleSelect={handleToggleSelect}
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

                <div className="w-full max-w-full lg:w-[30%]">
                    <div className="bg-white p-4 lg:p-6 rounded-lg shadow h-fit lg:sticky lg:top-6">
                        <h2 className="font-bold text-gray-600 py-6 text-2xl">Order Summary</h2>
                        <div className="flex justify-between text-gray-700 mb-2 text-sm sm:text-base">
                            <span>Subtotal</span>
                            <span>৳ {cartSubTotal()}</span>
                        </div>
                        <div className="flex justify-between text-gray-700 mb-2 text-sm sm:text-base">
                            <span>Delivery Fee</span>
                            <span>৳ {calculateTotalDeliveryFee() || 0}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 mb-4 w-full">
                            <input
                                type="text"
                                placeholder="Enter Voucher Code"
                                className="flex-1 border border-green-600 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                            />
                            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm sm:text-base">
                                APPLY
                            </button>
                        </div>
                        <div className="flex justify-between font-bold text-gray-800 text-lg mb-4">
                            <span>Total</span>
                            <span>৳ {cartTotal()}</span>
                        </div>

                        <button
                            disabled={!isProceed()}
                            onClick={proceedBtnHandler}
                            className={`block w-full bg-green-600 text-white p-3 rounded-lg font-medium text-center hover:bg-green-700 transition text-sm sm:text-base ${
                                !isProceed() ? 'opacity-50 cursor-not-allowed' : ''
                            }`}>
                            PROCEED TO CHECKOUT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
