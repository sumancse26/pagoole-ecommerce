'use client';

import { useEffect, useState } from 'react';
import { addToWishList } from '@/services/wishList';
import { useSession } from 'next-auth/react';
import { doSocialLogin } from '@/app/actions/authAction';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

const ProductIcon = ({ productInfo, pathFrom }) => {
    const [product, setProduct] = useState(productInfo);

    const { data: session, status } = useSession();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        setProduct(productInfo);

        return () => {};
    }, [productInfo]);

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
            throw new Error(err.message);
        }
    };

    return (
        <>
            <button
                disabled={product.disable_wish}
                onClick={(e) => addWishListHandler(e)}
                className={`group relative text-red-400 rounded-full shadow ${
                    product.disable_wish ? '' : 'hover:bg-red-600 hover:text-white transition-all duration-300'
                } p-2`}
                aria-label="Remove Item">
                <svg
                    className="w-5 h-5"
                    fill="none"
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
                <span className="w-[max-content] opacity-0 group-hover:opacity-100 absolute left-1/2 -translate-x-1/2 bottom-full mb-2 text-xs bg-green-700 text-white py-1 px-2 rounded shadow transition font-bold">
                    {product.disable_wish ? 'Added to Wishlist' : 'Add to Wishlist'}
                </span>
            </button>
        </>
    );
};

export default ProductIcon;
