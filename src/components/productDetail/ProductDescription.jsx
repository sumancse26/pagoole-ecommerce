const Description = async () => {
    return (
        <div className="mt-6 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="border-b border-gray-100">
                <nav className="flex flex-wrap -mb-px">
                    {['Description', 'Additional Info', 'Reviews (21)', 'Shipping'].map((tab, index) => (
                        <button
                            key={tab}
                            className={`py-3 px-4 sm:py-4 sm:px-6 font-medium text-sm text-center ${
                                index === 0
                                    ? 'text-emerald-600 border-b-2 border-emerald-600'
                                    : 'text-gray-500 hover:text-gray-700 border-transparent'
                            }`}>
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="p-4 sm:p-8">
                <div className="prose max-w-none text-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
                    <p className="mb-4 text-sm sm:text-base">
                        Our Blue Elegant Dress is crafted from premium organic cotton with a focus on sustainability and
                        comfort. The dress features a flattering A-line silhouette that suits all body types, with
                        carefully placed seams for maximum comfort and movement.
                    </p>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 mt-6">Features</h3>
                    <ul className="list-disc pl-5 space-y-2 mb-4 text-sm sm:text-base">
                        <li>100% organic cotton fabric</li>
                        <li>Ethically sourced and produced</li>
                        <li>Machine washable with color-lock technology</li>
                        <li>Reinforced stitching for durability</li>
                        <li>Hidden side pockets for convenience</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Description;
