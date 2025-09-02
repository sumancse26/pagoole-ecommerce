import Link from 'next/link';
import WishListIcon from '../products/ProductIcon';
const RelatedProduct = async ({ productList }) => {
    return (
        <div>
            {productList?.length > 0 && (
                <h2 className="text-xl font-bold text-gray-900 mb-5 mt-5">You Might Also Like</h2>
            )}

            <div className=" w-full ">
                {productList?.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex">
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
                                                <p className="text-xs text-gray-500">
                                                    {product.vendors?.store_name || ''}
                                                </p>
                                            </div>
                                            {/* NOTE: This button will also need to be a Client Component if it requires an onClick handler */}
                                            <WishListIcon productInfo={product} />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className=" w-full flex items-center justify-between">
                                                <span className="font-bold text-gray-900">
                                                    {product.price?.toFixed(2)}
                                                </span>
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
        </div>
    );
};

export default RelatedProduct;
