'use client';

import { useSession } from 'next-auth/react';
import { doSocialLogin } from '@/app/actions/authAction';
import { usePathname, useSearchParams } from 'next/navigation';

const AddToCart = () => {
    const { data: session, status } = useSession();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const addToCartHandler = async () => {
        if (status === 'authenticated') {
            alert('Added to cart');
            console.log('cokkie', session);
        }
        if (status === 'unauthenticated') {
            const fullPath = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;

            const result = await doSocialLogin('google', fullPath);
        }
    };
    return (
        <button
            onClick={addToCartHandler}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md w-full sm:w-auto flex items-center justify-center">
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
    );
};

export default AddToCart;
