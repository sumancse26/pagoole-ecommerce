import Link from 'next/link';
import ProductIcon from './ProductIcon';
const Product = async ({ prodType, productList, searchParams }) => {
    const activeTab = searchParams?.tab || 'arrival';
    console.log(productList);
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
                                        scroll={false}>
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
                                </div>
                                <div className="p-4">
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
                                        <div className="flex gap-3">
                                            <ProductIcon productInfo={product} />
                                        </div>
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
