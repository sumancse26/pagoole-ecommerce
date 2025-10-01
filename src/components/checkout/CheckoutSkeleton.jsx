// components/checkout/OrderSummarySkeleton.jsx (Example File Name)

import React from 'react';

const OrderSummarySkeleton = () => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Page Title Placeholder */}
            <div className="animate-pulse mb-6">
                <div className="h-8 w-1/4 bg-gray-200 rounded"></div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Column: Product List & Delivery/Payment Details (approx 60-70% width) */}
                <div className="lg:w-8/12 space-y-6">
                    {/* Section 1: Order Items Header */}
                    <div className="animate-pulse p-4 bg-white rounded-lg shadow-sm">
                        <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
                    </div>

                    {/* Section 2: Order Item Card Placeholder (Repeatable) */}
                    <div className="animate-pulse p-4 bg-white rounded-lg shadow-sm">
                        <div className="flex items-center space-x-4">
                            {/* Image Placeholder */}
                            <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                            {/* Product Info */}
                            <div className="flex-grow space-y-2">
                                <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                                <div className="h-3 w-1/2 bg-gray-100 rounded"></div>
                            </div>
                            {/* Price */}
                            <div className="h-5 w-1/6 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                    {/* Repeat the item card for multiple products */}
                    <div className="animate-pulse p-4 bg-white rounded-lg shadow-sm">
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                            <div className="flex-grow space-y-2">
                                <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                                <div className="h-3 w-1/2 bg-gray-100 rounded"></div>
                            </div>
                            <div className="h-5 w-1/6 bg-gray-200 rounded"></div>
                        </div>
                    </div>

                    {/* Section 3: Delivery/Payment Details Placeholder */}
                    <div className="animate-pulse p-6 bg-white rounded-lg shadow-sm space-y-4">
                        <div className="h-5 w-1/3 bg-gray-200 rounded"></div>
                        <div className="h-4 w-full bg-gray-100 rounded"></div>
                        <div className="h-4 w-full bg-gray-100 rounded"></div>
                        <div className="h-4 w-2/3 bg-gray-100 rounded"></div>
                    </div>
                </div>

                {/* Right Column: Summary Card (approx 30-40% width) */}
                <div className="lg:w-4/12 flex-shrink-0">
                    <div className="animate-pulse p-6 bg-white rounded-lg shadow-md space-y-4 sticky top-4">
                        {/* Title */}
                        <div className="h-6 w-1/2 bg-gray-200 rounded mb-4"></div>

                        {/* Subtotal Line */}
                        <div className="flex justify-between">
                            <div className="h-4 w-1/3 bg-gray-100 rounded"></div>
                            <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                        </div>

                        {/* Shipping Line */}
                        <div className="flex justify-between">
                            <div className="h-4 w-1/4 bg-gray-100 rounded"></div>
                            <div className="h-4 w-1/6 bg-gray-200 rounded"></div>
                        </div>

                        {/* Separator */}
                        <div className="h-px bg-gray-200"></div>

                        {/* Total Line */}
                        <div className="flex justify-between font-bold">
                            <div className="h-5 w-1/3 bg-gray-200 rounded"></div>
                            <div className="h-5 w-1/3 bg-gray-300 rounded"></div>
                        </div>

                        {/* Action Button Placeholder */}
                        <div className="h-10 w-full bg-green-300 rounded-lg mt-4"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSummarySkeleton;
