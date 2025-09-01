'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProductIcon from './ProductIcon';
import AddToCart from '../buttons/AddToCart.jsx';
import { useSession } from 'next-auth/react';
import { getAddToCartList } from '@/services/addToCart';
import CartList from '@components/addToCart/CartList';

const Product = ({ prodType, fromWhere, productList, searchParams }) => {
    const [sidebar, setSidebar] = useState(false);
    const [cartList, setCartList] = useState([]);

    const { data: session, status } = useSession();
    const activeTab = searchParams?.tab || 'arrival';

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
        <>
            <div>
                <section className={`bg-gray-50 ${fromWhere == 'vendor' ? 'pt-40' : 'pt-10'}`}>
                    <div className="container mx-auto px-4">
                        {fromWhere == 'vendor' && (
                            <div className="fixed top-14 right-0  flex items-center justify-center gap-3 bg-white py-3 px-4 sm:px-6 md:px-8 lg:px-10 w-full">
                                <img
                                    src={productList[0]?.vendors?.store_logo}
                                    alt="store image"
                                    className="h-16 w-16 sm:h-20 sm:w-20 object-contain rounded-full"
                                />
                                <span className="text-lg sm:text-xl font-bold text-green-700 text-center">
                                    {productList[0]?.vendors?.store_name || ''}
                                </span>
                            </div>
                        )}
                        {prodType !== 'all' && (
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                                <div className="mb-4 md:mb-0">
                                    <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
                                    <p className="text-gray-600">Our most popular products based on sales</p>
                                </div>
                                <div className="flex overflow-x-auto pb-2 md:pb-0">
                                    <div className="flex space-x-1 bg-gray-200 rounded-lg p-1">
                                        {/* Each button is now a Link that changes the URL query parameter */}
                                        <Link
                                            href="?tab=arrival"
                                            className={`px-4 py-2 text-sm rounded-md whitespace-nowrap ${
                                                activeTab === 'arrival'
                                                    ? 'bg-white shadow-sm text-green-600'
                                                    : 'text-gray-700 hover:text-gray-900'
                                            }`}
                                            scroll={false}>
                                            New Arrival
                                        </Link>
                                        <Link
                                            href="?tab=sellers"
                                            className={`px-4 py-2 text-sm rounded-md whitespace-nowrap ${
                                                activeTab === 'sellers'
                                                    ? 'bg-white shadow-sm text-green-600'
                                                    : 'text-gray-700 hover:text-gray-900'
                                            }`}
                                            scroll={false}>
                                            Best Sellers
                                        </Link>
                                        <Link
                                            href="?tab=featured"
                                            className={`px-4 py-2 text-sm rounded-md whitespace-nowrap ${
                                                activeTab === 'featured'
                                                    ? 'bg-white shadow-sm text-green-600'
                                                    : 'text-gray-700 hover:text-gray-900'
                                            }`}
                                            scroll={false}>
                                            Featured
                                        </Link>
                                        <Link
                                            href="?tab=special"
                                            className={`px-4 py-2 text-sm rounded-md whitespace-nowrap ${
                                                activeTab === 'special'
                                                    ? 'bg-white shadow-sm text-green-600'
                                                    : 'text-gray-700 hover:text-gray-900'
                                            }`}
                                            scroll={false}>
                                            Special Offer
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {productList?.map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-sm transition-shadow group">
                                    <Link
                                        href={{
                                            pathname: '/products',
                                            query: { product_id: product.products?.id }
                                        }}>
                                        <div className="relative h-64 w-full overflow-hidden rounded-lg">
                                            <img
                                                src={product.products?.file_server?.base_url}
                                                alt={product.products?.file_server?.name}
                                                className="h-full w-full object-contain transition-all duration-300 ease-in-out group-hover:scale-105"
                                            />
                                            {product?.discount && (
                                                <span className="absolute top-4 left-4 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded shadow">
                                                    -{product?.discount || 0}%
                                                </span>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="font-medium text-gray-900 mb-1 hover:text-green-600 transition-colors">
                                                        {product.products?.slug || ''}
                                                    </h3>
                                                    <span className="text-xs text-gray-500">
                                                        {product.products?.categories?.category_name || ''} (
                                                        {product.products?.brands?.name || ''})
                                                    </span>
                                                    <p className="text-xs text-gray-500">
                                                        {product.vendors?.store_name || ''}
                                                    </p>
                                                </div>
                                                <div className="flex gap-3">
                                                    <ProductIcon productInfo={product} />
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="font-bold text-gray-900">
                                                    TK. {product.price?.toFixed(2)}
                                                </span>
                                                {product.products?.mrp && (
                                                    <del className="text-sm text-gray-500 ml-1">
                                                        TK. {product.products?.mrp?.toFixed(2)}
                                                    </del>
                                                )}
                                            </div>
                                            {fromWhere == 'vendor' && (
                                                <div className="mt-4">
                                                    <AddToCart
                                                        vendorProdId={product?.id}
                                                        hideQty={true}
                                                        cartListHandler={sidebarHandler}
                                                        className="w-[100%]"
                                                    />
                                                </div>
                                            )}
                                            {fromWhere != 'vendor' && (
                                                <div className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center mt-4">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4 mr-1"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth={2}>
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                        />
                                                    </svg>
                                                    View Product Details
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-10 mb-7">
                            <button className="inline-block px-6 py-3 border border-green-600 text-green-600 font-medium rounded-lg hover:bg-green-600 hover:text-white transition-colors">
                                View All Products
                            </button>
                        </div>
                    </div>
                </section>

                <div className="fixed top-0 right-0 z-50 h-full transform transition-transform duration-300 ease-in-out">
                    {sidebar && <CartList cartList={cartList} closeCart={handleRemoveItem} showCrossIcon={true} />}
                </div>
            </div>
        </>
    );
};

export default Product;
