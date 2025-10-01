const SkeletonCard = ({ loadNumbers }) => {
    return (
        <>
            {loadNumbers.map((num, indx) => (
                <div key={indx} className="border border-gray-200 rounded-lg shadow-sm w-full">
                    <div className="bg-gray-200 h-48 rounded-t-lg animate-pulse"></div>
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className="h-4 bg-gray-200 rounded w-3/5 animate-pulse"></div>
                            <div className="rounded-full bg-gray-200 h-6 w-6 animate-pulse"></div>
                        </div>
                        <div className="h-3 bg-gray-200 rounded w-2/5 mb-4 animate-pulse"></div>
                        <div className="flex items-center justify-between mb-4">
                            <div className="h-5 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                            <div className="h-5 bg-gray-200 rounded w-1/12 animate-pulse"></div>
                        </div>
                        <div className="h-10 bg-green-400 rounded animate-pulse"></div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default SkeletonCard;
