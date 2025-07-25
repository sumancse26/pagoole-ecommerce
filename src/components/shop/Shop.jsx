'use client';

import { useState } from 'react';
import Dropdown from '@components/SearchableDropdown';

const ProductListing = () => {
    const [viewMode, setViewMode] = useState('grid');
    const [sortOption, setSortOption] = useState('order');
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);

    // Sample product data
    const products = [
        {
            id: 1,
            name: 'Blue Dress For Woman',
            price: 45.0,
            originalPrice: 55.25,
            discount: 35,
            rating: 80,
            reviewCount: 21,
            image: '/assets/images/product_img1.jpg',
            colors: ['#87554B', '#333333', '#DA323F'],
            isNew: false,
            isHot: false,
            isSale: false,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim.'
        },
        {
            id: 2,
            name: 'Blue Dress For Woman',
            price: 45.0,
            originalPrice: 55.25,
            discount: 35,
            rating: 80,
            reviewCount: 21,
            image: '/assets/images/product_img1.jpg',
            colors: ['#87554B', '#333333', '#DA323F'],
            isNew: false,
            isHot: false,
            isSale: false,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim.'
        },
        {
            id: 3,
            name: 'Blue Dress For Woman',
            price: 45.0,
            originalPrice: 55.25,
            discount: 35,
            rating: 80,
            reviewCount: 21,
            image: '/assets/images/product_img1.jpg',
            colors: ['#87554B', '#333333', '#DA323F'],
            isNew: false,
            isHot: false,
            isSale: false,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim.'
        }
        // Add other products similarly...
    ];

    const locationList = [
        { id: 1, name: 'New York', country: 'USA' },
        { id: 2, name: 'Los Angeles', country: 'USA' },
        { id: 3, name: 'Chicago', country: 'USA' }
    ];

    const getSelectedLocation = (val) => {
        console.log(val);
    };

    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                {/* Header with sorting options */}
                <div className="flex flex-col md:flex-row justify-end items-center mb-8 gap-5">
                    <div className="mb-4 md:mb-0">
                        <Dropdown
                            options={locationList}
                            onSelect={getSelectedLocation}
                            labelKey={'name'}
                            valueKey={'country'}
                            placeholder={'Search or select location'}
                        />
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded ${
                                    viewMode === 'grid' ? 'bg-green-100 text-green-700' : 'text-gray-500'
                                }`}
                                aria-label="Grid view">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                                    />
                                </svg>
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded ${
                                    viewMode === 'list' ? 'bg-green-100 text-green-700' : 'text-gray-500'
                                }`}
                                aria-label="List view">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Product List */}
                <div
                    className={`${
                        viewMode === 'grid'
                            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                            : 'space-y-6'
                    }`}>
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} viewMode={viewMode} />
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-8">
                    <nav className="flex items-center space-x-1">
                        <button
                            className="px-3 py-1 rounded-md hover:bg-green-50 text-gray-600 hover:text-green-700"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}>
                            Previous
                        </button>

                        {[1, 2, 3].map((page) => (
                            <button
                                key={page}
                                className={`px-3 py-1 rounded-md ${
                                    currentPage === page
                                        ? 'bg-green-600 text-white'
                                        : 'hover:bg-green-50 text-gray-600 hover:text-green-700'
                                }`}
                                onClick={() => setCurrentPage(page)}>
                                {page}
                            </button>
                        ))}

                        <button
                            className="px-3 py-1 rounded-md hover:bg-green-50 text-gray-600 hover:text-green-700"
                            onClick={() => setCurrentPage(currentPage + 1)}>
                            Next
                        </button>
                    </nav>
                </div>
            </div>
        </section>
    );
};

const ProductCard = ({ product, viewMode }) => {
    return (
        <div
            className={`bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
                viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
            }`}>
            <div className={`relative ${viewMode === 'list' ? 'md:w-1/3' : ''}`}>
                <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-cover ${viewMode === 'list' ? 'md:h-64' : 'h-64'}`}
                />

                {/* Product badges */}
                <div className="absolute top-2 left-2 space-y-1">
                    {product.isNew && (
                        <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">New</span>
                    )}
                    {product.isHot && (
                        <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">Hot</span>
                    )}
                    {product.isSale && (
                        <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">Sale</span>
                    )}
                </div>

                {/* Quick actions */}
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <div className="flex space-x-2">
                        <button className="bg-white p-2 rounded-full hover:bg-green-100 hover:text-green-700 transition-colors">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                        </button>
                        <button className="bg-white p-2 rounded-full hover:bg-green-100 hover:text-green-700 transition-colors">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                />
                            </svg>
                        </button>
                        <button className="bg-white p-2 rounded-full hover:bg-green-100 hover:text-green-700 transition-colors">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </button>
                        <button className="bg-white p-2 rounded-full hover:bg-green-100 hover:text-green-700 transition-colors">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className={`p-4 ${viewMode === 'list' ? 'md:w-2/3' : ''}`}>
                <h3 className="font-semibold text-lg mb-1 hover:text-green-600 transition-colors">
                    <a href="#">{product.name}</a>
                </h3>

                <div className="flex items-center mb-2">
                    <div className="flex items-center">
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                    key={star}
                                    className={`h-4 w-4 ${
                                        star * 20 <= product.rating ? 'text-yellow-400' : 'text-gray-300'
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
                    </div>
                </div>

                <div className="mb-3">
                    <span className="text-green-600 font-semibold">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                        <span className="text-gray-400 text-sm line-through ml-2">
                            ${product.originalPrice.toFixed(2)}
                        </span>
                    )}
                    {product.discount && (
                        <span className="bg-green-100 text-green-800 text-xs font-semibold ml-2 px-1.5 py-0.5 rounded">
                            {product.discount}% Off
                        </span>
                    )}
                </div>

                {viewMode === 'list' && <p className="text-gray-600 text-sm mb-4">{product.description}</p>}

                <div className="flex items-center space-x-2 mb-4">
                    {product.colors.map((color, index) => (
                        <span
                            key={index}
                            className="w-4 h-4 rounded-full border border-gray-200 cursor-pointer"
                            style={{ backgroundColor: color }}
                            title={`Color ${index + 1}`}
                        />
                    ))}
                </div>

                <div className="flex flex-wrap gap-2">
                    <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                        Add to Cart
                    </button>

                    {viewMode === 'list' && (
                        <>
                            <button className="p-2 text-gray-500 hover:text-green-600 rounded-md hover:bg-green-50 transition-colors">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                    />
                                </svg>
                            </button>
                            <button className="p-2 text-gray-500 hover:text-green-600 rounded-md hover:bg-green-50 transition-colors">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>
                            <button className="p-2 text-gray-500 hover:text-green-600 rounded-md hover:bg-green-50 transition-colors">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductListing;
