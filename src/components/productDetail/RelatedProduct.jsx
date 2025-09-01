import Link from 'next/link';

const RelatedProduct = async ({ productList }) => {
    return (
        <div className="lg:w-1/3 w-full">
            {/* Make full width on smaller screens */}
            {productList?.length > 0 && (
                <>
                    <h2 className="text-xl font-bold text-gray-900 mb-5">You Might Also Like</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                        {productList?.map((product) => (
                            <div
                                key={product.id}
                                className="flex gap-2 h-[150px] bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-sm transition-shadow group">
                                <img
                                    src={product.products?.file_server?.base_url}
                                    alt={product.products?.file_server?.name}
                                    className="w-[150px] object-contain transition-all duration-300 ease-in-out group-hover:scale-105 p-3"
                                />
                                <div className="p-2">
                                    {product?.discount && (
                                        <span className="absolute top-4 left-4 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded shadow">
                                            Discount-{product?.discount || 0}%
                                        </span>
                                    )}
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-medium text-gray-900 mb-1 hover:text-green-600 transition-colors">
                                                <Link
                                                    href={{
                                                        pathname: '/products',
                                                        query: { product_id: product.products?.id }
                                                    }}>
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
                </>
            )}
        </div>
    );
};

export default RelatedProduct;
