'use client';

import { useEffect, useState } from 'react';
import { addToWishList } from '@/services/wishList';
import { useSession } from 'next-auth/react';
import { doSocialLogin } from '@/app/actions/authAction';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

const ProductIcon = ({ productInfo, from }) => {
    const [product, setProduct] = useState(productInfo);
    const [wish, setWish] = useState([]);

    const { data: session, status } = useSession();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const addWishListHandler = async (e) => {
        try {
            e.preventDefault();
            e.stopPropagation();

            const prodId = product.id;

            if (status === 'authenticated') {
                const res = await addToWishList({ vendor_prod_id: prodId });

                router.refresh();
                setProduct((val) => ({ ...val, disable_wish: true }));
                alert('Added to wish list');
            }
            if (status === 'unauthenticated') {
                const fullPath = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;

                const result = await doSocialLogin('google', fullPath);
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <>
            <button
                disabled={product.disable_wish}
                onClick={(e) => addWishListHandler(e)}
                className={`relative group/wish p-2 rounded-full shadow 
    text-red-400 hover:bg-red-600 hover:text-white transition-all duration-300
    ${product.disable_wish ? 'cursor-not-allowed' : ''}`}
                aria-label={product.disable_wish ? 'Added to Wishlist' : 'Add to Wishlist'}>
                {/* Heart Icon */}
                <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                </svg>

                {/* Tooltip */}
                <span
                    className={`absolute  -left-1/2 -translate-x-1/2 bottom-full mb-2 w-max 
               px-2 py-1 rounded-lg text-xs font-semibold text-white shadow-md
               opacity-0 group-hover/wish:opacity-100 transition
               ${product.disable_wish ? 'bg-gray-500' : 'bg-green-600'}`}>
                    {product.disable_wish ? 'Added to Wishlist' : 'Add to Wishlist'}
                </span>
            </button>
        </>
    );
};

export default ProductIcon;
