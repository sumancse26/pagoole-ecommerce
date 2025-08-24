'use client';

import { useEffect, useState } from 'react';
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
