'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { doSocialLogin } from '@/app/actions/authAction';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { createAddToCart } from '@/services/addToCart';

const AddToCart = ({ vendorProdId, hideQty = false, cartListHandler = () => {} }) => {
    const [qty, setQty] = useState(1);
    const [sidebar, setSidebar] = useState(false);

    const { data: session, status } = useSession();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const addToCartHandler = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const data = {
            vendorProdId,
            quantity: qty
        };
        if (status === 'authenticated') {
            const res = await createAddToCart(data);
            router.refresh();
            cartListHandler(true);
            alert('Added to cart');
        }
        if (status === 'unauthenticated') {
            const fullPath = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;

            const result = await doSocialLogin('google', fullPath);
        }
    };

    const qtyHandler = (val) => {
        if (val === 'decrement' && qty > 1) {
            setQty((prevQty) => prevQty - 1);
        } else if (val === 'increment') {
            setQty((prevQty) => prevQty + 1);
        }
    };

    return (
        <>
            <div className="w-full flex gap-3">
                {!hideQty && (
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button
                            onClick={() => qtyHandler('decrement')}
                            className="px-4 py-3 text-gray-500 hover:text-emerald-600 hover:bg-gray-50 transition-colors"
                            aria-label="Decrease quantity">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                            </svg>
                        </button>
                        <input
                            type="text"
                            value={qty}
                            className="w-12 text-center border-x border-gray-200 py-2 outline-none text-gray-900 font-medium"
                            readOnly
                        />
                        <button
                            onClick={() => qtyHandler('increment')}
                            className="px-4 py-3 text-gray-500 hover:text-emerald-600 hover:bg-gray-50 transition-colors"
                            aria-label="Increase quantity">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                    </div>
                )}

                <button
                    onClick={(e) => addToCartHandler(e)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md flex items-center justify-center w-[100%]">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                    Add to Cart
                </button>
            </div>
        </>
    );
};

export default AddToCart;
