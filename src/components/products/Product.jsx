'use client';

import { useState } from 'react';
import Link from 'next/link';
const Product = ({ prodType, productList }) => {
    const [activeTab, setActiveTab] = useState('arrival');

    return (
        <>
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    {prodType !== 'all' && (
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                            <div className="mb-4 md:mb-0">
                                <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
                                <p className="text-gray-600">Our most popular products based on sales</p>
                            </div>
                            <div className="flex overflow-x-auto pb-2 md:pb-0">
                                <div className="flex space-x-1 bg-gray-200 rounded-lg p-1">
                                    <button
                                        className={`px-4 py-2 text-sm rounded-md whitespace-nowrap ${
                                            activeTab === 'arrival'
                                                ? 'bg-white shadow-sm text-green-600'
                                                : 'text-gray-700 hover:text-gray-900'
                                        }`}
                                        onClick={() => setActiveTab('arrival')}>
                                        New Arrival
                                    </button>
                                    <button
                                        className={`px-4 py-2 text-sm rounded-md whitespace-nowrap ${
                                            activeTab === 'sellers'
                                                ? 'bg-white shadow-sm text-green-600'
                                                : 'text-gray-700 hover:text-gray-900'
                                        }`}
                                        onClick={() => setActiveTab('sellers')}>
                                        Best Sellers
                                    </button>
                                    <button
                                        className={`px-4 py-2 text-sm rounded-md whitespace-nowrap ${
                                            activeTab === 'featured'
                                                ? 'bg-white shadow-sm text-green-600'
                                                : 'text-gray-700 hover:text-gray-900'
                                        }`}
                                        onClick={() => setActiveTab('featured')}>
                                        Featured
                                    </button>
                                    <button
                                        className={`px-4 py-2 text-sm rounded-md whitespace-nowrap ${
                                            activeTab === 'special'
                                                ? 'bg-white shadow-sm text-green-600'
                                                : 'text-gray-700 hover:text-gray-900'
                                        }`}
                                        onClick={() => setActiveTab('special')}>
                                        Special Offer
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {productList.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-sm transition-shadow group">
                                <div className="relative h-64 w-full overflow-hidden rounded-lg">
                                    {/* Image */}

                                    <img
                                        src={product.products?.file_server?.base_url}
                                        alt={product.products?.file_server?.name}
                                        className="h-full w-full object-contain transition-all duration-300 ease-in-out group-hover:scale-105"
                                    />

                                    {/* Discount Badge */}
                                    {product?.discount && (
                                        <span className="absolute top-4 left-4 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded shadow">
                                            -{product?.discount || 0}%
                                        </span>
                                    )}

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-white/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-center justify-center space-x-2 pointer-events-none group-hover:pointer-events-auto">
                                        {/* Wishlist Button */}
                                        <button
                                            className="bg-white w-10 h-10 rounded-full shadow flex items-center justify-center text-gray-700 hover:bg-green-600 hover:text-white transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
                                            title="Add to Wishlist">
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M4.318 6.318a4.5 4.5 0 010 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                                />
                                            </svg>
                                        </button>

                                        {/* Cart Button */}
                                        <button
                                            className="bg-white w-10 h-10 rounded-full shadow flex items-center justify-center text-gray-700 hover:bg-green-600 hover:text-white transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 delay-200"
                                            title="Add to Cart">
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8m0 0a2 2 0 104 0m-4 0H17m0 0a2 2 0 104 0m-4 0h-1.4"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-medium text-gray-900 mb-1 hover:text-green-600 transition-colors">
                                                <Link href={`/products/${product.id}`}>
                                                    {product.products?.slug || ''}
                                                </Link>
                                            </h3>
                                            <span className="text-xs text-gray-500">
                                                {product.products?.categories?.category_name || ''} (
                                                {product.products?.brands?.name || ''})
                                            </span>
                                        </div>
                                        <button className="text-gray-400 hover:text-green-600">
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
                                    </div>
                                    {/* <div className="mb-3">
                                        <div className="flex items-center">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <svg
                                                    key={star}
                                                    className={`w-4 h-4 ${
                                                        star <= Math.floor(product.rating / 20)
                                                            ? 'text-yellow-400'
                                                            : 'text-gray-300'
                                                    }`}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                            <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                                        </div>
                                    </div> */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="font-bold text-gray-900">{product.price?.toFixed(2)}</span>
                                            {product.products?.mrp && (
                                                <del className="text-sm text-gray-500 ml-1">
                                                    {product.products?.mrp?.toFixed(2)}
                                                </del>
                                            )}
                                        </div>
                                        {/* <div className="flex space-x-1">
                                            {product.colors.map((color, i) => (
                                                <span
                                                    key={i}
                                                    className={`w-4 h-4 rounded-full border border-gray-200 ${
                                                        i === 0 ? 'ring-2 ring-offset-1 ring-green-500' : ''
                                                    }`}
                                                    style={{ backgroundColor: color }}></span>
                                            ))}
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-10">
                        <Link
                            href="/shop"
                            className="inline-block px-6 py-3 border border-green-600 text-green-600 font-medium rounded-lg hover:bg-green-600 hover:text-white transition-colors">
                            View All Products
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Product;
