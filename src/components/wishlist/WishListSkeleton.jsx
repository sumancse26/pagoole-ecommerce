const WishListItemSkeleton = () => (
    <div className="flex items-center p-4 border-b border-gray-200 animate-pulse bg-white">
        {/* Checkbox Placeholder */}
        <div className="w-4 h-4 mr-4 bg-gray-200 rounded"></div>

        {/* Product Image Placeholder */}
        <div className="w-16 h-16 mr-4 bg-gray-200 rounded-lg flex-shrink-0"></div>

        {/* Product Info Placeholder */}
        <div className="flex-grow space-y-2">
            {/* Product Name */}
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
            {/* Price */}
            <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
            {/* Vendor Name */}
            <div className="h-3 w-1/2 bg-gray-100 rounded"></div>
        </div>

        {/* Actions Placeholder (Add to Cart / Remove) */}
        <div className="flex flex-col items-end space-y-2 ml-4 flex-shrink-0">
            {/* Remove Button */}
            <div className="h-4 w-12 bg-gray-200 rounded"></div>
            {/* Add to Cart Button */}
            <div className="h-8 w-24 bg-gray-300 rounded-lg"></div>
        </div>
    </div>
);

const WishListSkeleton = ({ count = 5 }) => {
    return (
        <div className="shadow rounded-xl overflow-hidden bg-white">
            {/* Header/Title Placeholder */}
            <div className="p-4 border-b border-gray-100">
                <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
            </div>

            {/* List of Skeleton Items */}
            {[...Array(count)].map((_, index) => (
                <WishListItemSkeleton key={index} />
            ))}
        </div>
    );
};

export default WishListSkeleton;
