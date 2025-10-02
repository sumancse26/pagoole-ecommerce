import React from 'react';

/**
 * Renders a skeleton loading state for the Product List table component.
 * Mimics the structure of the header, table rows (with 9 columns), and footer
 * using Tailwind CSS's animate-pulse utility.
 *
 * @param {number} rowCount - The number of skeleton rows to display in the table body.
 */
const ProductListSkeleton = ({ rowCount = 5 }) => {
    // Defines the proportional widths for the text placeholders in the table columns
    const columnWidths = [
        'w-6', // SL
        'w-10 h-10', // IMAGE (Square)
        'w-32', // NAME
        'w-24', // CATEGORY
        'w-16', // PRICE (TK)
        'w-10', // STOCK
        'w-8', // VAT (%)
        'w-16', // DISCOUNT (TK)
        'w-16' // ACTION (for action buttons container)
    ];

    return (
        <div className="flex flex-col animate-fadeIn">
            <div className="m-2 overflow-x-auto">
                <div className="p-2 min-w-full inline-block align-middle">
                    <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-2xl shadow-md overflow-hidden">
                        {/* 1. HEADER SKELETON */}
                        <div className="px-4 sm:px-6 py-4 flex flex-col gap-3 md:flex-row md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                            {/* Title/Description Area */}
                            <div className="w-full md:w-auto">
                                <div className="animate-pulse">
                                    <div className="h-6 bg-gray-200 dark:bg-neutral-600 rounded w-48 mb-2"></div>
                                    <div className="h-3 bg-gray-200 dark:bg-neutral-600 rounded w-64"></div>
                                </div>
                            </div>

                            {/* Search & Button Area */}
                            <div className="w-full md:w-[50%] flex flex-col sm:flex-row gap-3 md:justify-center md:items-center md:mx-auto animate-pulse">
                                {/* Search Input Placeholder */}
                                <div className="relative flex-grow">
                                    <div className="py-2.5 px-3 ps-10 block w-full bg-gray-200 dark:bg-neutral-700 rounded-lg h-10"></div>
                                </div>
                                {/* Add Product Button Placeholder */}
                                <div className="w-full sm:w-32 h-10 bg-green-400 dark:bg-green-600 rounded-lg"></div>
                            </div>
                        </div>

                        {/* 2. TABLE SKELETON */}
                        <div className="overflow-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700 text-sm">
                                {/* Table Head - Showing structure but with a slight placeholder effect */}
                                <thead className="bg-gray-50 dark:bg-neutral-700">
                                    <tr>
                                        {[
                                            'SL',
                                            'IMAGE',
                                            'NAME',
                                            'CATEGORY',
                                            'PRICE (TK)',
                                            'STOCK',
                                            'VAT (%)',
                                            'DISCOUNT (TK)',
                                            'ACTION'
                                        ].map((header, index) => (
                                            <th
                                                key={index}
                                                className={`px-3 py-3 text-xs uppercase tracking-wider text-gray-400 dark:text-neutral-500 font-semibold ${
                                                    index === 0 ? 'text-center' : 'text-start'
                                                } ${
                                                    index !== 8
                                                        ? 'border-r border-gray-200 dark:border-neutral-600'
                                                        : ''
                                                }`}>
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                {/* Table Body - Animated Rows */}
                                <tbody className="divide-y divide-gray-100 dark:divide-neutral-700">
                                    {Array.from({ length: rowCount }).map((_, rowIndex) => (
                                        <tr key={rowIndex} className="animate-pulse">
                                            {columnWidths.map((widthClass, colIndex) => (
                                                <td
                                                    key={colIndex}
                                                    className={`px-3 py-2 ${
                                                        colIndex === 0 ? 'text-center' : 'text-start'
                                                    } ${
                                                        colIndex !== 8
                                                            ? 'border-r border-gray-200 dark:border-neutral-700'
                                                            : ''
                                                    }`}>
                                                    {colIndex === 1 ? (
                                                        // Image Placeholder
                                                        <div
                                                            className={`${widthClass} rounded-md bg-gray-200 dark:bg-neutral-700`}></div>
                                                    ) : colIndex === 8 ? (
                                                        // Action Buttons Placeholder
                                                        <div className="flex items-center justify-center gap-2">
                                                            <div className="w-7 h-7 bg-gray-200 dark:bg-neutral-700 rounded-full"></div>
                                                            <div className="w-7 h-7 bg-gray-200 dark:bg-neutral-700 rounded-full"></div>
                                                        </div>
                                                    ) : (
                                                        // Text Placeholder
                                                        <div
                                                            className={`${widthClass} h-4 bg-gray-200 dark:bg-neutral-700 rounded`}></div>
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* 3. FOOTER SKELETON */}
                        <div className="px-4 sm:px-6 py-4 flex flex-col gap-3 md:flex-row md:justify-between md:items-center border-t border-gray-200 dark:border-neutral-700 animate-pulse">
                            {/* Result Count Placeholder */}
                            <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-20"></div>

                            {/* Pagination Buttons Placeholder */}
                            <div className="inline-flex gap-2">
                                <div className="h-8 w-16 bg-gray-200 dark:bg-neutral-700 rounded-lg"></div>
                                <div className="h-8 w-16 bg-gray-200 dark:bg-neutral-700 rounded-lg"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductListSkeleton;
