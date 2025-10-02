const OrderTableSkeleton = () => {
    return (
        <div className="p-4 sm:p-6 bg-white rounded-2xl shadow-lg animate-pulse">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-green-600">
                    <div className="bg-green-200 rounded-full w-8 h-8"></div>
                    <div className="h-6 w-32 bg-gray-200 rounded"></div>
                </div>
                <div className="relative w-[60%]">
                    <div className="h-10 w-full bg-gray-200 rounded-lg ps-10"></div>
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3">
                        <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                    </div>
                </div>
            </div>

            {/* Table Skeleton */}
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full text-xs sm:text-sm text-left">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                        <tr>
                            {['SL', 'Inv No', 'Inv By', 'Total', 'Collection', 'Status', 'Action'].map((header, i) => (
                                <th key={i} className="px-4 sm:px-5 py-3 font-semibold border-r">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {[...Array(4)].map((_, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition">
                                {[...Array(7)].map((_, i) => (
                                    <td key={i} className="px-4 sm:px-5 py-4">
                                        <div className="h-4 bg-gray-200 rounded w-full max-w-[90%]"></div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-xs sm:text-sm text-gray-600 gap-3">
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                <div className="flex items-center gap-2">
                    <div className="px-4 py-1 rounded-full bg-green-100 w-20 h-8"></div>
                    <div className="px-4 py-1 rounded-full bg-green-100 w-20 h-8"></div>
                </div>
            </div>
        </div>
    );
};

export default OrderTableSkeleton;
