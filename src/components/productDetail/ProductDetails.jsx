const ProductDetails = () => {
    return (
        <>
            <main className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Product Images Section */}
                    <div className="lg:w-1/2">
                        <div className="bg-white rounded-xl shadow-sm p-4 mb-4 border border-gray-100">
                            <img
                                src="https://via.placeholder.com/800x800?text=Product+Image"
                                alt="Blue Dress For Woman"
                                className="w-full h-auto rounded-lg object-cover aspect-square"
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-3">
                            {[1, 2, 3, 4].map((item) => (
                                <div
                                    key={item}
                                    className="border-2 rounded-lg p-1 cursor-pointer hover:border-emerald-500 transition-all duration-200 hover:shadow-sm">
                                    <img
                                        src={`https://via.placeholder.com/200x200?text=Thumb+${item}`}
                                        alt={`Thumbnail ${item}`}
                                        className="w-full h-auto rounded-md aspect-square object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Details Section */}
                    <div className="lg:w-1/2">
                        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                            <div className="mb-6">
                                <span className="text-xs font-semibold tracking-wider text-emerald-600 uppercase">
                                    Premium Collection
                                </span>
                                <h1 className="text-3xl font-bold text-gray-900 mt-1 mb-2">Blue Elegant Dress</h1>

                                <div className="flex items-center mb-4">
                                    <div className="flex text-amber-400 mr-2">
                                        {[...Array(4)].map((_, i) => (
                                            <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                        <svg className="w-5 h-5 fill-current text-amber-400" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-500 text-sm">(21 reviews)</span>
                                    <a
                                        href="#reviews"
                                        className="ml-3 text-sm font-medium text-emerald-600 hover:text-emerald-500">
                                        View all
                                    </a>
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

                            {/* Color Selection */}
                            <div className="mb-8">
                                <h3 className="text-sm font-semibold text-gray-900 mb-3">Color</h3>
                                <div className="flex space-x-3">
                                    {['bg-blue-800', 'bg-gray-800', 'bg-red-600', 'bg-emerald-600'].map(
                                        (color, index) => (
                                            <button
                                                key={index}
                                                className={`w-10 h-10 rounded-full ${color} border-2 ${
                                                    index === 0
                                                        ? 'border-emerald-500 ring-2 ring-emerald-200'
                                                        : 'border-gray-200'
                                                } hover:border-emerald-500 transition-all`}
                                                aria-label={`Select ${color.split('-')[1]} color`}
                                            />
                                        )
                                    )}
                                </div>
                            </div>

                            {/* Size Selection */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-sm font-semibold text-gray-900">Size</h3>
                                    <a href="#" className="text-xs font-medium text-emerald-600 hover:text-emerald-500">
                                        Size Guide
                                    </a>
                                </div>
                                <div className="grid grid-cols-5 gap-2">
                                    {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                                        <button
                                            key={size}
                                            className={`px-4 py-2 border rounded-lg font-medium transition-all ${
                                                size === 'M'
                                                    ? 'bg-emerald-600 text-white border-emerald-600'
                                                    : 'border-gray-200 text-gray-700 hover:border-emerald-400 hover:bg-emerald-50'
                                            }`}>
                                            {size}
                                        </button>
                                    ))}
                                </div>
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
                                <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md w-full sm:w-auto flex items-center justify-center">
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

                            {/* Additional Actions */}
                            <div className="flex flex-wrap gap-4 mb-8">
                                <button className="flex items-center text-gray-600 hover:text-emerald-600 transition-colors text-sm font-medium">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                        />
                                    </svg>
                                    Add to Wishlist
                                </button>
                                <button className="flex items-center text-gray-600 hover:text-emerald-600 transition-colors text-sm font-medium">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                        />
                                    </svg>
                                    Compare
                                </button>
                            </div>

                            {/* Product Meta */}
                            <div className="border-t border-gray-100 pt-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <span className="text-gray-500 text-sm">SKU:</span>
                                        <span className="text-gray-900 block font-medium">BE45VGRT</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 text-sm">Category:</span>
                                        <a
                                            href="#"
                                            className="text-emerald-600 hover:text-emerald-500 block font-medium">
                                            Women's Dresses
                                        </a>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 text-sm">Material:</span>
                                        <span className="text-gray-900 block font-medium">Organic Cotton</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 text-sm">Shipping:</span>
                                        <span className="text-gray-900 block font-medium">Free Worldwide</span>
                                    </div>
                                </div>
                            </div>

                            {/* Social Sharing */}
                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-900 mb-3">Share:</h3>
                                <div className="flex space-x-3">
                                    {[
                                        { icon: 'facebook-f', color: 'text-blue-600 hover:bg-blue-600' },
                                        { icon: 'twitter', color: 'text-blue-400 hover:bg-blue-400' },
                                        { icon: 'instagram', color: 'text-pink-500 hover:bg-pink-500' },
                                        { icon: 'pinterest', color: 'text-red-600 hover:bg-red-600' }
                                    ].map((social) => (
                                        <a
                                            key={social.icon}
                                            href="#"
                                            className={`w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center ${social.color} hover:text-white transition-colors`}
                                            aria-label={`Share on ${social.icon}`}>
                                            <svg className="w-4 h-4 fill-current">
                                                <use xlinkHref={`/icons.svg#${social.icon}`} />
                                            </svg>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Tabs */}
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

                            <h3 className="text-lg font-semibold text-gray-900 mb-4 mt-6">Care Instructions</h3>
                            <p>
                                For best results, wash cold with similar colors. Tumble dry low or hang to dry. Iron on
                                low heat if needed. Avoid bleach to maintain color vibrancy.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default ProductDetails;
