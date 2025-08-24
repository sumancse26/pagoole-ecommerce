import Link from 'next/link';
import { relatedProductAction } from '@app/actions/productAction';
import AddToCart from '@components/buttons/AddToCart';
import Image from 'next/image';

const RelatedProductCard = ({ product }) => (
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
                        {product.products?.categories?.category_name || ''} ({product.products?.brands?.name || ''})
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
                        <del className="text-sm text-gray-500 ml-1">{product.products?.mrp?.toFixed(2)}</del>
                    )}
                </div>
            </div>
        </div>
    </div>
);

const ProductDetails = async ({ prodInfo }) => {
    let relatedProducts = [];
    if (prodInfo?.length) {
        const result = await relatedProductAction(prodInfo?.[0]);
        relatedProducts = result.related_products;
    }

    return (
        <>
            <main className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="flex mb-5 gap-5">
                    <div className="lg:w-2/3 flex-col gap-5">
                        {prodInfo?.length &&
                            prodInfo.map((prodItem, prodIndex) => (
                                <div
                                    key={prodIndex}
                                    className="flex h-[300px] gap-5 bg-white rounded-xl shadow-sm p-4 border border-gray-100 mb-5">
                                    <img
                                        src={prodItem?.products?.file_server?.base_url}
                                        alt="Blue Dress For Woman"
                                        className="w-[25%] h-auto rounded-lg object-contain aspect-square"
                                    />

                                    <div className="w-full">
                                        <div className="mb-6">
                                            <span className="text-xl font-bold tracking-wider text-emerald-600 uppercase">
                                                {prodItem.vendors?.store_name || ''}
                                            </span>
                                            <h1 className="text-3xl font-bold text-gray-900 mt-1 mb-2">
                                                {prodItem?.products?.slug || ''}
                                            </h1>

                                            <div className="flex items-center mb-4">
                                                <div className="flex text-amber-400 mr-2">
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg
                                                            key={i}
                                                            className="w-5 h-5 fill-current"
                                                            viewBox="0 0 20 20">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                                <span className="text-gray-500 text-sm">(21 reviews)</span>
                                            </div>

                                            <div className="flex items-center justify-between mb-6">
                                                <span className="text-3xl font-bold text-gray-900">
                                                    TK. {prodItem?.price || 0}
                                                </span>
                                                <div className="flex gap-1">
                                                    <span className="text-lg text-gray-400 line-through ml-3">
                                                        TK. {prodItem?.products?.mrp || 0}
                                                    </span>
                                                    <span className="bg-emerald-100 text-emerald-800 text-sm font-semibold px-2.5 py-0.5 rounded-full ml-3">
                                                        0% OFF
                                                    </span>
                                                </div>
                                            </div>

                                            <p className="text-gray-600 mb-6 leading-relaxed">
                                                {prodItem?.products?.description || ''}
                                            </p>
                                        </div>

                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-2">
                                            <AddToCart vendorProdId={prodItem?.id} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className="lg:w-1/3">
                        {relatedProducts?.length > 0 && (
                            <>
                                <h2 className="text-xl font-bold text-gray-900 mb-5">You Might Also Like</h2>
                                <div className="gap-4">
                                    {relatedProducts?.map((product) => (
                                        <RelatedProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Product Description Tabs (Full-width below main columns) */}
                <div className="mt-6 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                    <div className="border-b border-gray-100">
                        <nav className="flex -mb-px">
                            {['Description', 'Additional Info', 'Reviews (21)', 'Shipping'].map((tab, index) => (
                                <button
                                    key={tab}
                                    className={`py-4 px-6 font-medium text-sm ${
                                        index === 0
                                            ? 'text-emerald-600 border-b-2 border-emerald-600'
                                            : 'text-gray-500 hover:text-gray-700 border-transparent'
                                    }`}>
                                    {tab}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="p-8">
                        <div className="prose max-w-none text-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
                            <p className="mb-4">
                                Our Blue Elegant Dress is crafted from premium organic cotton with a focus on
                                sustainability and comfort. The dress features a flattering A-line silhouette that suits
                                all body types, with carefully placed seams for maximum comfort and movement.
                            </p>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 mt-6">Features</h3>
                            <ul className="list-disc pl-5 space-y-2 mb-4">
                                <li>100% organic cotton fabric</li>
                                <li>Ethically sourced and produced</li>
                                <li>Machine washable with color-lock technology</li>
                                <li>Reinforced stitching for durability</li>
                                <li>Hidden side pockets for convenience</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default ProductDetails;
