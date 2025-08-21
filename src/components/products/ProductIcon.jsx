'use client';

import { useEffect, useState } from 'react';
import { addToWishList } from '@/services/wishList';
import { createAddToCart } from '@/services/addToCart';
import { useSession } from 'next-auth/react';
import { doSocialLogin } from '@/app/actions/authAction';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

const ProductIcon = ({ productInfo }) => {
    const [product, setProduct] = useState();

    const { data: session, status } = useSession();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        setProduct(productInfo);

        return () => {};
    }, [productInfo]);

    const addWishListHandler = async () => {
        try {
            const prodId = product.products?.id;

            if (status === 'authenticated') {
                const res = await addToWishList({ prod_id: prodId });
                router.refresh();
                alert('Added to cart');
            }
            if (status === 'unauthenticated') {
                const fullPath = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;

                const result = await doSocialLogin('google', fullPath);
            }
        } catch (err) {
            throw new Error(err.message);
        }
    };

    const addToCartHandler = async () => {
        const data = {
            vendorProdId: product.id,
            quantity: 1
        };
        if (status === 'authenticated') {
            const res = await createAddToCart(data);
            router.refresh();
            alert('Added to cart');
        }
        if (status === 'unauthenticated') {
            const fullPath = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;

            const result = await doSocialLogin('google', fullPath);
        }
    };

    return (
        <>
            <button
                onClick={addWishListHandler}
                className="text-gray-400 rounded-full shadow hover:bg-green-600 hover:text-white transition-all duration-300 p-2"
                title="Add to Wish List">
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
            <button
                onClick={addToCartHandler}
                className="text-gray-400 hover:text-green-600 rounded-full shadow hover:bg-green-600 hover:text-white transition-all duration-300 p-2"
                title="Add to Cart">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8m0 0a2 2 0 104 0m-4 0H17m0 0a2 2 0 104 0m-4 0h-1.4"
                    />
                </svg>
            </button>
        </>
    );
};

export default ProductIcon;
