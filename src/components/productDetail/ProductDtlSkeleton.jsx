const ProductPageSkeleton = () => {
    const Line = ({ width = 'w-full', height = 'h-4', className = '' }) => (
        <div className={`bg-gray-200 rounded-lg ${width} ${height} ${className}`}></div>
    );

    const Button = () => <div className="h-10 w-28 bg-gray-200 rounded-full"></div>;

    const SellerCardSkeleton = () => (
        <div className="p-4 border border-gray-100 rounded-xl mb-4 flex justify-between items-center shadow-sm">
            {/* Seller Info (Left) */}
            <div className="flex items-start space-x-3">
                <Line width="w-10" height="h-10" className="rounded-full flex-shrink-0" />
                <div>
                    <Line width="w-32" height="h-4" className="mb-1" />
                    <Line width="w-48" height="h-3" />
                </div>
            </div>
            {/* Price & Qty/Button (Right) */}
            <div className="flex items-center space-x-6">
                <Line width="w-20" height="h-6" />
                <Button />
            </div>
        </div>
    );

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 font-inter">
            {/* 1. Header/Title Placeholder */}
            <div className="max-w-7xl mx-auto mb-6">
                <Line width="w-20" height="h-4" className="mb-4" />
                <Line width="w-40" height="h-8" />
            </div>

            {/* 2. Main Product Section */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
                {/* Left Column: Image Gallery (1/3 width on large screens) */}
                <div className="lg:col-span-1">
                    {/* Main Image Placeholder */}
                    <div className="aspect-square bg-gray-200 rounded-xl mb-4 shadow-md"></div>

                    {/* Thumbnail Gallery Placeholder */}
                    <div className="flex space-x-3 overflow-hidden justify-center">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-lg border-2 border-transparent hover:border-blue-400"></div>
                        ))}
                    </div>
                </div>

                {/* Right Columns: Details and Purchase Info (2/3 width on large screens) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Product Price/Description Snippet */}
                    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
                        <Line width="w-1/3" height="h-5" className="mb-2" />
                        <Line width="w-full" height="h-4" className="mb-1" />
                        <Line width="w-11/12" height="h-4" />
                    </div>

                    {/* Seller Cards */}
                    <SellerCardSkeleton />
                    <SellerCardSkeleton />
                </div>
            </div>

            {/* 3. Tabs Section */}
            <div className="max-w-7xl mx-auto mt-12 mb-6 border-b border-gray-200 animate-pulse">
                <div className="flex space-x-6 sm:space-x-10 -mb-px">
                    <Line width="w-24" height="h-6" className="border-b-2 border-blue-500 rounded-t-lg !bg-white" />
                    <Line width="w-28" height="h-6" className="text-gray-500 rounded-t-lg" />
                    <Line width="w-20" height="h-6" className="text-gray-500 rounded-t-lg" />
                    <Line width="w-24" height="h-6" className="text-gray-500 rounded-t-lg hidden sm:block" />
                </div>
            </div>

            {/* 4. Product Details Content Area */}
            <div className="max-w-7xl mx-auto pt-6 space-y-4 animate-pulse">
                {/* Product Details Title */}
                <Line width="w-48" height="h-6" className="mb-4" />

                {/* Description Paragraph */}
                <Line width="w-full" height="h-4" />
                <Line width="w-full" height="h-4" />
                <Line width="w-11/12" height="h-4" />

                {/* Features List Title */}
                <Line width="w-24" height="h-5" className="mt-8" />

                {/* Features List Items (bullet points) */}
                <div className="space-y-3 pt-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center space-x-3">
                            <Line width="w-3" height="h-3" className="rounded-full flex-shrink-0" />
                            <Line width={`${80 - i * 5}%`} height="h-4" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductPageSkeleton;
