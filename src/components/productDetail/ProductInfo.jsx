'use client';

import AddToCart from '@components/buttons/AddToCart';
import CartList from '@components/addToCart/CartList';
import { useSession } from 'next-auth/react';
import { getAddToCartList } from '@/services/addToCart';
import { useState } from 'react';

const ProductInfo = ({ prodInfo }) => {
    const [sidebar, setSidebar] = useState(false);
    const [cartList, setCartList] = useState([]);
    const [displayImage, setDisplayImage] = useState(prodInfo[0]?.products?.product_images?.[0]?.file_name);
    const [selectedProduct, setSelectedProduct] = useState(prodInfo[0]);

    const { data: session, status } = useSession();

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

    const productChangeHandler = (prodItem, e) => {
        e.stopPropagation();
        setSelectedProduct(prodItem);
    };

    return (
        <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col sm:flex-row gap-5">
                {/* Images */}
                <div className="md:w-2/4">
                    <h1 className="text-2xl font-bold text-emerald-600 mb-2">
                        {selectedProduct.products?.prod_name || ''}
                    </h1>

                    <img
                        src={displayImage}
                        alt="Image"
                        className="w-full h-64 object-contain border border-gray-300 rounded-lg shadow-sm mb-3"
                    />

                    {/* Thumbnails */}
                    <div className="flex gap-2">
                        {prodInfo?.length &&
                            prodInfo?.[0]?.products?.product_images?.map((prodImg, imgKey) => (
                                <img
                                    key={imgKey}
                                    src={prodImg.file_name}
                                    alt="thumb"
                                    onClick={() => setDisplayImage(prodImg.file_name)}
                                    className="w-20 h-16 object-contain border border-gray-300 rounded"
                                />
                            ))}
                    </div>
                </div>

                {/* Price & Sellers */}
                <div className="md:w-3/4 p-6 max-w-5xl mx-auto">
                    <h2 className="text-lg font-bold text-emerald-600 mb-2">Price in Bangladesh</h2>
                    <p className="text-sm text-gray-700 mb-6">
                        The lowest price of {selectedProduct.products?.prod_name || ''} in Bangladesh is
                        <span className="font-semibold text-emerald-600">Tk {selectedProduct.price || 0}</span> only.
                        Buy from Dhaka at low price in
                        <span className="text-emerald-600 font-medium underline cursor-pointer ml-1">
                            Pagoole Discount Shop
                        </span>
                        . There is currently <span className='text-red-600'>{prodInfo?.length || 0}</span> sellers.
                    </p>
                       {
                        prodInfo.filter(fl=>fl.activeProd == true)?.length > 0 && (
                            <h5 className="text-normal text-emerald-600 bg-emerald-200 py-1 ps-2">This Product</h5>
                        )
                       } 
                    
                     {prodInfo?.length &&
                        prodInfo.filter(fl=>fl.activeProd == true)?.map((prodItem, prodIndex) => (
                            <div
                                key={prodIndex}
                                className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 mb-5 flex items-start justify-between">
                                <div
                                    className="flex items-start gap-3 w-2/4"
                                    onClick={(e) => productChangeHandler(prodItem, e)}>
                                    <img
                                        src={prodItem.products.brands?.brand_logo}
                                        alt="Seller Logo"
                                        className="w-12 h-12 object-contain"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-gray-800">
                                            {prodItem.vendors?.store_name || ''}
                                        </h3>
                                        
                                        <p className="text-sm text-gray-500"> {prodItem.vendors?.address || ''}</p>
                                        <span className='text-bold text-blue-600'>{prodItem.vendors?.users?.phone || ''}</span>
                                        <div className="flex text-yellow-400 mt-1">
                                            {[...Array(4)].map((_, i) => (
                                                <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="w-1/4 flex justify-center">
                                    <AddToCart
                                        vendorProdId={prodItem?.id}
                                        hideQty={false}
                                        cartListHandler={sidebarHandler}
                                    />
                                </div>

                                <div className="w-1/4 text-right">
                                    <p className="text-2xl font-bold text-emerald-600">৳ {prodItem.price || 0}</p>

                                    <div className="flex items-center justify-end gap-2 mt-1">
                                        <span className="line-through text-gray-400 text-sm">
                                            ৳ {prodItem?.products?.mrp || 0}
                                        </span>
                                        <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-semibold">
                                            0% OFF
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {
                        prodInfo.filter(fl=>fl.activeProd == false)?.length > 0 && (
                            <h5 className="text-normal text-orange-400 bg-orange-200 py-1 ps-2">Other Products</h5>
                        )
                       } 
                    {prodInfo?.length &&
                        prodInfo.filter(fl=>fl.activeProd == false)?.map((prodItem, prodIndex) => (
                            <div
                                key={prodIndex}
                                className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 mb-5 flex items-start justify-between">
                                <div
                                    className="flex items-start gap-3 w-2/4"
                                    onClick={(e) => productChangeHandler(prodItem, e)}>
                                    <img
                                        src={prodItem.products.brands?.brand_logo}
                                        alt="Seller Logo"
                                        className="w-12 h-12 object-contain"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-gray-800">
                                            {prodItem.vendors?.store_name || ''}
                                        </h3>
                                        
                                        <p className="text-sm text-gray-500"> {prodItem.vendors?.address || ''}</p>
                                        <span className='text-bold text-blue-600'>{prodItem.vendors?.users?.phone || ''}</span>
                                        <div className="flex text-yellow-400 mt-1">
                                            {[...Array(4)].map((_, i) => (
                                                <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="w-1/4 flex justify-center">
                                    <AddToCart
                                        vendorProdId={prodItem?.id}
                                        hideQty={false}
                                        cartListHandler={sidebarHandler}
                                    />
                                </div>

                                <div className="w-1/4 text-right">
                                    <p className="text-2xl font-bold text-emerald-600">৳ {prodItem.price || 0}</p>

                                    <div className="flex items-center justify-end gap-2 mt-1">
                                        <span className="line-through text-gray-400 text-sm">
                                            ৳ {prodItem?.products?.mrp || 0}
                                        </span>
                                        <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-semibold">
                                            0% OFF
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            {/* Fixed Sidebar */}
            {sidebar && (
                <div className="fixed top-[55] right-0 z-50  transform transition-transform duration-300 ease-in-out bg-green-100">
                    <CartList cartList={cartList} closeCart={handleRemoveItem} showCrossIcon={true} />
                </div>
            )}
        </div>
    );
};

export default ProductInfo;
