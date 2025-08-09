import Link from 'next/link';

// The component is now an async function to potentially fetch data, and it accepts `searchParams` as a prop.
const Product = async ({ prodType, productList, searchParams }) => {
    // The active tab is now read directly from the URL query parameters.
    // We default to 'arrival' if no tab is specified in the URL.
    const activeTab = searchParams?.tab || 'arrival';

    // The product filtering logic that was implicitly handled by state
    // would now be handled here or in the parent component before passing `productList`.
    // For demonstration, this logic is assumed to be handled before this component renders.

    return (
        <>
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    {prodType !== 'all' && (
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                            <div className="mb-4 md:mb-0">
                                <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
                                <p className="text-gray-600">Our most popular products based on sales</p>
                            </div>
                            <div className="flex overflow-x-auto pb-2 md:pb-0">
                                <div className="flex space-x-1 bg-gray-200 rounded-lg p-1">
                                    {/* Each button is now a Link that changes the URL query parameter */}
                                    <Link
                                        href="?tab=arrival"
                                        className={`px-4 py-2 text-sm rounded-md whitespace-nowrap ${
                                            activeTab === 'arrival'
                                                ? 'bg-white shadow-sm text-green-600'
                                                : 'text-gray-700 hover:text-gray-900'
                                        }`}
                                        scroll={false} // Optional: prevents scrolling to the top on tab change
                                    >
                                        New Arrival
                                    </Link>
                                    <Link
                                        href="?tab=sellers"
                                        className={`px-4 py-2 text-sm rounded-md whitespace-nowrap ${
                                            activeTab === 'sellers'
                                                ? 'bg-white shadow-sm text-green-600'
                                                : 'text-gray-700 hover:text-gray-900'
                                        }`}
                                        scroll={false}>
                                        Best Sellers
                                    </Link>
                                    <Link
                                        href="?tab=featured"
                                        className={`px-4 py-2 text-sm rounded-md whitespace-nowrap ${
                                            activeTab === 'featured'
                                                ? 'bg-white shadow-sm text-green-600'
                                                : 'text-gray-700 hover:text-gray-900'
                                        }`}
                                        scroll={false}>
                                        Featured
                                    </Link>
                                    <Link
                                        href="?tab=special"
                                        className={`px-4 py-2 text-sm rounded-md whitespace-nowrap ${
                                            activeTab === 'special'
                                                ? 'bg-white shadow-sm text-green-600'
                                                : 'text-gray-700 hover:text-gray-900'
                                        }`}
                                        scroll={false}>
                                        Special Offer
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {productList?.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-sm transition-shadow group">
                                <div className="relative h-64 w-full overflow-hidden rounded-lg">
                                    <img
                                        src={product.products?.file_server?.base_url}
                                        alt={product.products?.file_server?.name}
                                        className="h-full w-full object-contain transition-all duration-300 ease-in-out group-hover:scale-105"
                                    />
                                    {product?.discount && (
                                        <span className="absolute top-4 left-4 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded shadow">
                                            -{product?.discount || 0}%
                                        </span>
                                    )}
                                    <div className="absolute inset-0 bg-white/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-center justify-center space-x-2 pointer-events-none group-hover:pointer-events-auto">
                                        {/* NOTE: These buttons will need to be their own Client Components if they have onClick handlers */}
                                        <button
                                            className="bg-white w-10 h-10 rounded-full shadow flex items-center justify-center text-gray-700 hover:bg-green-600 hover:text-white transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
                                            title="Add to Wishlist">
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M4.318 6.318a4.5 4.5 0 010 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                                />
                                            </svg>
                                        </button>
                                        <button
                                            className="bg-white w-10 h-10 rounded-full shadow flex items-center justify-center text-gray-700 hover:bg-green-600 hover:text-white transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 delay-200"
                                            title="Add to Cart">
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8m0 0a2 2 0 104 0m-4 0H17m0 0a2 2 0 104 0m-4 0h-1.4"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-medium text-gray-900 mb-1 hover:text-green-600 transition-colors">
                                                <Link href={`/products/${product.id}`}>
                                                    {product.products?.slug || ''}
                                                </Link>
                                            </h3>
                                            <span className="text-xs text-gray-500">
                                                {product.products?.categories?.category_name || ''} (
                                                {product.products?.brands?.name || ''})
                                            </span>
                                            <p className="text-xs text-gray-500">{product.vendors?.store_name || ''}</p>
                                        </div>
                                        {/* NOTE: This button will also need to be a Client Component if it requires an onClick handler */}
                                        <button className="text-gray-400 hover:text-green-600">
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="font-bold text-gray-900">{product.price?.toFixed(2)}</span>
                                            {product.products?.mrp && (
                                                <del className="text-sm text-gray-500 ml-1">
                                                    {product.products?.mrp?.toFixed(2)}
                                                </del>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-10">
                        <button className="inline-block px-6 py-3 border border-green-600 text-green-600 font-medium rounded-lg hover:bg-green-600 hover:text-white transition-colors">
                            View All Products
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Product;
