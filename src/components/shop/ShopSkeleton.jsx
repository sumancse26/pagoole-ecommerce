// components/vendor/VendorListSkeleton.jsx (Example File Name)

import React from 'react';

// --- Vendor Card Skeleton ---
const VendorCardSkeleton = () => (
    <div className="animate-pulse bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden p-4">
        <div className="flex items-start space-x-4">
            {/* Vendor Logo Placeholder */}
            <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0"></div>

            {/* Info Placeholder */}
            <div className="flex-grow space-y-3 pt-1">
                {/* Vendor Name */}
                <div className="h-5 w-3/4 bg-gray-300 rounded"></div>
                {/* Location/Category */}
                <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
            </div>

            {/* Rating/Action Placeholder */}
            <div className="h-4 w-10 bg-gray-200 rounded mt-1"></div>
        </div>

        {/* Action Button Placeholder */}
        <div className="mt-4 h-9 w-full bg-gray-200 rounded-lg"></div>
    </div>
);

// --- Main Page Skeleton ---
const VendorListSkeleton = ({ count = 6 }) => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Top Bar / Search & Filter Section */}
            <div className="mb-8 flex flex-col md:flex-row gap-4 animate-pulse">
                {/* Left Side: Search Bar Placeholder */}
                <div className="md:w-1/3 h-10 bg-gray-200 rounded-lg"></div>

                {/* Right Side: Category/View Toggles Placeholder */}
                <div className="md:w-2/3 flex justify-end space-x-4">
                    <div className="h-10 w-24 bg-gray-200 rounded-lg"></div>
                    <div className="h-10 w-24 bg-gray-200 rounded-lg"></div>
                </div>
            </div>

            {/* Vendor Grid Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {[...Array(count)].map((_, index) => (
                    <VendorCardSkeleton key={index} />
                ))}
            </div>

            {/* Pagination Placeholder */}
            <div className="animate-pulse flex justify-center space-x-3">
                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            </div>
        </div>
    );
};

export default VendorListSkeleton;
