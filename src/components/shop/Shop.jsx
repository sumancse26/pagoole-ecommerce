'use client';

import { useState, useEffect } from 'react';
import Dropdown from '@components/SearchableDropdown';
import Link from 'next/link';
import { vendorListByLocationAction } from '@app/actions/vendorAction.js';

const ProductListing = ({ vendorList, locationList }) => {
    const [viewMode, setViewMode] = useState('grid');
    const [sortOption, setSortOption] = useState('order');
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);

    const [filteredVendors, setFilteredVendors] = useState([]);

    const searchVendorHandler = (e) => {
        const searchTerm = e?.toString()?.toLowerCase();

        if (searchTerm?.length > 0 && searchTerm) {
            setFilteredVendors(
                vendorList?.filter((item) => {
                    return Object.entries(item)
                        .reduce(
                            (result, [, value]) => (!(value instanceof Object) ? (result += ` ${value}`) : result),
                            ''
                        )
                        .toLowerCase()
                        .includes(searchTerm);
                })
            );
        } else {
            setFilteredVendors(vendorList);
        }
    };

    useEffect(() => {
        searchVendorHandler('');
    }, []);

    const getSelectedLocation = async (val) => {
        try {
            const res = await vendorListByLocationAction(val.id);
            setFilteredVendors(res.vendor_list || []);
        } catch (err) {
            throw new Error(err);
        }
    };

    return (
        <section className="py-8">
            <div className="container mx-auto px-4">
                {/* Header with sorting options */}
                <div className="flex flex-col md:flex-row justify-end items-center mb-8 gap-5 ">
                    <div className="p-2 w-full">
                        <input
                            onInput={(e) => searchVendorHandler(e.target.value)}
                            type="text"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Search vendors ......"
                        />
                    </div>

                    <div className="mb-4 md:mb-0 w-full">
                        <Dropdown
                            options={locationList}
                            onSelect={getSelectedLocation}
                            labelKey={'full_address'}
                            placeholder={'Search or select location .....'}
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
                    {filteredVendors.map((vn) => (
                        <ProductCard key={vn.id} vendor={vn} viewMode={viewMode} />
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

const ProductCard = ({ vendor, viewMode }) => {
    return (
        <div
            className={`bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
                viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
            }`}>
            <div
                className={`relative h-32 w-full m-1 overflow-hidden rounded-lg  ${
                    viewMode === 'list' ? 'md:w-1/3 border-r border-gray-200' : 'border-b border-gray-200'
                }`}>
                {vendor.store_logo && (
                    <Link href={{ pathname: '/shop-wise-product', query: { vendor_id: vendor.id } }}>
                        <img
                            src={vendor.store_logo}
                            alt={vendor.store_name}
                            className={`w-full h-full object-contain ${viewMode === 'list' ? 'md:h-32' : 'h-32'}`}
                        />
                    </Link>
                )}
            </div>

            <div className={`p-4 flex-col flex-1  ${viewMode === 'list' ? 'md:w-2/3' : ''}`}>
                <Link href={{ pathname: '/shop-wise-product', query: { vendor_id: vendor.id } }} className="flex-grow">
                    <h3 className="font-semibold text-lg mb-1 hover:text-green-600 transition-colors">
                        {/* <Link href={{ pathname: '/shop-wise-product', query: { vendor_id: vendor.id } }}> */}
                        {vendor.store_name || ''}
                        {/* </Link> */}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4">{vendor.store_description}</p>

                    <div className="flex items-center mb-2">
                        <div className="flex items-center">
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg
                                        key={star}
                                        className={`h-4 w-4 ${
                                            star * 20 <= vendor.rating ? 'text-yellow-400' : 'text-gray-300'
                                        }`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-xs text-gray-500 ml-1">({vendor.reviewCount || 0})</span>
                        </div>
                    </div>
                </Link>

                <div className="flex flex-wrap gap-2 mt-2">
                    <Link
                        href={{ pathname: '/shop-wise-product', query: { vendor_id: vendor.id } }}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                        </svg>
                        View Products
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductListing;
