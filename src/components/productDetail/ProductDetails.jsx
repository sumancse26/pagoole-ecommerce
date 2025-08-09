import Link from 'next/link';

// A simple card component for the related products section
const RelatedProductCard = ({ product }) => (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group border border-gray-100">
        <div className="relative h-48 w-full overflow-hidden">
            <Link href="#">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </Link>
        </div>
        <div className="p-4">
            <h3 className="font-medium text-gray-800 mb-1 text-sm">
                <Link href="#" className="hover:text-emerald-600 transition-colors">
                    {product.name}
                </Link>
            </h3>
            <p className="font-bold text-gray-900">{product.price}</p>
        </div>
    </div>
);

const ProductDetails = () => {
    // Mock data for the new "Related Products" section
    const relatedProducts = [
        {
            id: 1,
            name: 'Summer Floral Dress',
            price: '$59.99',
            imageUrl: 'https://via.placeholder.com/300x300?text=Related+1'
        },
        {
            id: 2,
            name: 'Classic Black Gown',
            price: '$75.00',
            imageUrl: 'https://via.placeholder.com/300x300?text=Related+2'
        },
        {
            id: 3,
            name: 'Casual Denim Jumpsuit',
            price: '$65.50',
            imageUrl: 'https://via.placeholder.com/300x300?text=Related+3'
        },
        {
            id: 4,
            name: 'Office Wear Blazer',
            price: '$89.00',
            imageUrl: 'https://via.placeholder.com/300x300?text=Related+4'
        }
    ];

    return (
        <>
            <main className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Left Column: Product Images */}
                    <div className="lg:w-1/3">
                        <div className="bg-white rounded-xl shadow-sm p-4 mb-4 border border-gray-100">
                            <img
                                src="https://via.placeholder.com/800x800?text=Product+Image"
                                alt="Blue Dress For Woman"
                                className="w-full h-auto rounded-lg object-cover aspect-square"
                            />
                        </div>
                    </div>

                    {/* Right Column: Product Details and Actions */}
                    <div className="lg:w-2/3">
                        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                            {/* Product Info */}
                            <div className="mb-6">
                                <span className="text-xs font-semibold tracking-wider text-emerald-600 uppercase">
                                    Premium Collection
                                </span>
                                <h1 className="text-3xl font-bold text-gray-900 mt-1 mb-2">Blue Elegant Dress</h1>

                                <div className="flex items-center mb-4">
                                    <div className="flex text-amber-400 mr-2">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="text-gray-500 text-sm">(21 reviews)</span>
                                </div>

                                <div className="flex items-center mb-6">
                                    <span className="text-3xl font-bold text-gray-900">$45.00</span>
                                    <span className="text-lg text-gray-400 line-through ml-3">$55.25</span>
                                    <span className="bg-emerald-100 text-emerald-800 text-sm font-semibold px-2.5 py-0.5 rounded-full ml-3">
                                        35% OFF
                                    </span>
                                </div>

                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    This elegant blue dress features a flattering silhouette with premium stitching and
                                    sustainable materials. Perfect for both casual outings and special occasions, it
                                    combines comfort with timeless style.
                                </p>
                            </div>

                            {/* Quantity and Add to Cart */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                                    <button
                                        className="px-4 py-3 text-gray-500 hover:text-emerald-600 hover:bg-gray-50 transition-colors"
                                        aria-label="Decrease quantity">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M20 12H4"
                                            />
                                        </svg>
                                    </button>
                                    <input
                                        type="text"
                                        value="1"
                                        className="w-12 text-center border-x border-gray-200 py-2 outline-none text-gray-900 font-medium"
                                        readOnly
                                    />
                                    <button
                                        className="px-4 py-3 text-gray-500 hover:text-emerald-600 hover:bg-gray-50 transition-colors"
                                        aria-label="Increase quantity">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 4v16m8-8H4"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md w-full sm:w-auto flex items-center justify-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                    Add to Cart
                                </button>
                            </div>

                            {/* --- NEW: Related Products Section --- */}
                            <div className="mt-10 pt-8 border-t border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900 mb-5">You Might Also Like</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {relatedProducts.map((product) => (
                                        <RelatedProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Description Tabs (Full-width below main columns) */}
                <div className="mt-12 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
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
