'use client';

import AddToCart from '@components/buttons/AddToCart';
import CartList from '@components/addToCart/CartList';
import { useSession } from 'next-auth/react';
import { getAddToCartList } from '@/services/addToCart';
import { useState } from 'react';

const ProductInfo = ({ prodInfo }) => {
    const [sidebar, setSidebar] = useState(false);
    const [cartList, setCartList] = useState([]);

    const { data: session, status } = useSession();
    console.log('prodInfo', prodInfo);
    const sidebarHandler = async (val) => {
        if (session?.user) {
            const res = await getAddToCartList();
            const cartListData = res?.cart_items || 0;
            const list = (cartListData?.length && cartListData?.map((item) => ({ ...item, isRemoving: false }))) || [];

            setCartList(list);
        }
        setSidebar(val);
    };

    const handleRemoveItem = async () => {
        setSidebar(false);
    };

    return (
        <div className="lg:w-2/3 flex-col gap-5">
            {prodInfo?.length &&
                prodInfo.map((prodItem, prodIndex) => (
                    <div
                        key={prodIndex}
                        className="flex flex-col sm:flex-row h-auto sm:h-[300px] gap-5 bg-white rounded-xl shadow-sm p-4 border border-gray-100 mb-5">
                        <img
                            src={prodItem?.products?.file_server?.base_url}
                            alt="Blue Dress For Woman"
                            className="w-full sm:w-[25%] h-48 sm:h-auto rounded-lg object-contain aspect-square sm:aspect-auto"
                        />

                        <div className="w-full">
                            <div className="mb-4 sm:mb-6">
                                <span className="text-base sm:text-xl font-bold tracking-wider text-emerald-600 uppercase">
                                    {prodItem.vendors?.store_name || ''}
                                </span>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 mb-1 sm:mb-2">
                                    {prodItem?.products?.slug || ''}
                                </h1>

                                <div className="flex items-center mb-2 sm:mb-4">
                                    <div className="flex text-amber-400 mr-2">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className="w-4 h-4 sm:w-5 sm:h-5 fill-current"
                                                viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="text-gray-500 text-xs sm:text-sm">(21 reviews)</span>
                                </div>

                                <div className="flex items-center justify-between mb-4 sm:mb-6">
                                    <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                                        TK. {prodItem?.price || 0}
                                    </span>
                                    <div className="flex gap-1 items-center">
                                        <span className="text-base sm:text-lg text-gray-400 line-through ml-2 sm:ml-3">
                                            TK. {prodItem?.products?.mrp || 0}
                                        </span>
                                        <span className="bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-semibold px-2 sm:px-2.5 py-0.5 rounded-full ml-1 sm:ml-3">
                                            0% OFF
                                        </span>
                                    </div>
                                </div>

                                <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                                    {prodItem?.products?.description || ''}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-2">
                                <AddToCart
                                    vendorProdId={prodItem?.id}
                                    hideQty={false}
                                    cartListHandler={sidebarHandler} // Corrected prop name to match AddToCart component's expectation
                                />
                            </div>
                        </div>
                    </div>
                ))}

            <div className="fixed top-0 right-0 z-50 h-full transform transition-transform duration-300 ease-in-out">
                {sidebar && <CartList cartList={cartList} closeCart={handleRemoveItem} showCrossIcon={true} />}
            </div>
        </div>
    );
};

export default ProductInfo;
