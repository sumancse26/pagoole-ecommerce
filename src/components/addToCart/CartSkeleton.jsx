import React from 'react';

// Utility component for the pulsing gray line placeholders
const SkeletonLine = ({ width = 'w-full', height = 'h-4', className = '' }) => (
    <div className={`bg-gray-200 rounded-md ${width} ${height} ${className}`}></div>
);

// Skeleton component for a single quantity button group
const QuantityControlSkeleton = () => (
    <div className="flex items-center space-x-1">
        <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
        <div className="w-8 h-6 bg-gray-200 rounded-lg"></div>
        <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
    </div>
);

const CartSkeleton = () => {
    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 font-inter min-h-screen bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Main Title */}
                <SkeletonLine width="w-48" height="h-6" className="mb-8" />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
                    {/* Left Column: Cart Items (2/3 width on large screens) */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Shop Header Skeleton */}
                        <div className="flex items-center space-x-3 pb-2 border-b border-gray-100">
                            <SkeletonLine width="w-4" height="h-4" className="rounded-sm" />
                            <SkeletonLine width="w-24" height="h-5" />
                        </div>

                        {/* Individual Cart Item Skeleton (Single Item shown in original image) */}
                        {[1, 2, 3, 4].map((CartSkeleton, indx) => (
                            <div key={indx} className="p-4 border border-gray-100 rounded-xl shadow-sm space-y-3">
                                <div className="flex justify-between items-center">
                                    {/* Product Info (Left) */}
                                    <div className="flex items-center space-x-4">
                                        <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0"></div>
                                        <div className="space-y-2">
                                            <SkeletonLine width="w-40" height="h-5" />
                                            <SkeletonLine width="w-20" height="h-3" />
                                        </div>
                                    </div>

                                    {/* Price and Quantity (Right) */}
                                    <div className="flex items-center space-x-6">
                                        <div className="text-right space-y-1 hidden sm:block">
                                            <SkeletonLine width="w-12" height="h-4" />
                                            <SkeletonLine width="w-16" height="h-3" />
                                        </div>
                                        <QuantityControlSkeleton />
                                        <SkeletonLine width="w-16" height="h-5" /> {/* Total Price */}
                                    </div>
                                </div>

                                {/* Actions/Stock line */}
                                <div className="flex justify-end space-x-4 items-center pt-2 border-t border-gray-50/0">
                                    <SkeletonLine width="w-20" height="h-3" />
                                    <SkeletonLine width="w-5" height="h-5" className="rounded-full" />
                                    <SkeletonLine width="w-5" height="h-5" className="rounded-full" />
                                </div>
                            </div>
                        ))}

                        {/* You might duplicate the item skeleton if a user has multiple items,
                but one is sufficient to represent the structure. */}
                    </div>

                    {/* Right Column: Order Summary (1/3 width on large screens) */}
                    <div className="lg:col-span-1 p-6 bg-white border border-gray-100 rounded-xl shadow-lg h-fit space-y-5">
                        {/* Summary Title */}
                        <SkeletonLine width="w-32" height="h-6" className="mb-4" />

                        {/* Subtotal */}
                        <div className="flex justify-between items-center">
                            <SkeletonLine width="w-20" height="h-4" />
                            <SkeletonLine width="w-12" height="h-4" />
                        </div>

                        {/* Delivery Fee */}
                        <div className="flex justify-between items-center">
                            <SkeletonLine width="w-24" height="h-4" />
                            <SkeletonLine width="w-12" height="h-4" />
                        </div>

                        {/* Voucher Input */}
                        <div className="flex space-x-2 pt-2 pb-4">
                            <SkeletonLine width="w-full" height="h-10" />
                            <SkeletonLine width="w-20" height="h-10" className="!bg-green-500" />
                        </div>

                        {/* Total */}
                        <div className="flex justify-between items-center border-t border-gray-200 pt-5">
                            <SkeletonLine width="w-16" height="h-5" />
                            <SkeletonLine width="w-16" height="h-5" />
                        </div>

                        {/* Checkout Button */}
                        <SkeletonLine width="w-full" height="h-12" className="!bg-green-400 mt-6" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartSkeleton;
