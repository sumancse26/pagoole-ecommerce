'use client';

import { useEffect, useState } from 'react';
import { addToWishList } from '@/services/wishList';
import { useSession } from 'next-auth/react';
import { doSocialLogin } from '@/app/actions/authAction';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

const ProductIcon = ({ productInfo, pathFrom }) => {
    const [product, setProduct] = useState();

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
                disabled={productInfo.disable_wish}
                onClick={(e) => addWishListHandler(e)}
                className={`text-red-400 rounded-full shadow ${
                    productInfo.disable_wish ? '' : 'hover:bg-red-600 hover:text-white transition-all duration-300'
                } p-2`}
                title={`${productInfo.disable_wish ? 'Already added' : 'Add to Wish List'}`}>
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
            </button>
        </>
    );
};

export default ProductIcon;
