'use client';

const ProductItem = ({ checkoutData }) => {
    return (
        <>
            {checkoutData?.length > 0 &&
                checkoutData.map((vendor, index) => {
                    const shopName = vendor?.vendor_info?.store_name;
                    const vendorSubtotal = vendor?.items?.reduce(
                        (sum, prod) => sum + (Number(prod.vendor_products?.price) || 0) * (Number(prod.qty) || 0),
                        0
                    );
                    const totalQty = vendor?.items?.length;
                    // const totalQty = vendor?.items?.reduce((sum, prod) => sum + (Number(prod.qty) || 0), 0);

                    return (
                        <div key={index} className="mb-10">
                            {totalQty > 0 && (
                                <div className="relative bg-gradient-to-tr from-green-50 to-green-100 rounded-xl shadow-lg overflow-hidden border border-green-200">
                                    {/* Invoice Header */}
                                    <div className="flex items-center justify-between px-6 py-4 border-b border-green-200 bg-gradient-to-r from-green-200/60 to-green-100/60">
                                        <div className="flex items-center gap-3">
                                            <span className="inline-block bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                                                Invoice #{index + 1}
                                            </span>
                                            <h2 className="text-lg font-bold text-green-800">#{shopName}</h2>
                                        </div>
                                        <span className="text-green-700 font-medium">
                                            {totalQty} {totalQty === 1 ? 'item' : 'items'}
                                        </span>
                                    </div>

                                    {/* Product List */}
                                    <div className="px-6 py-4 space-y-3">
                                        {vendor?.items?.length > 0 ? (
                                            vendor.items.map((prod, prodIndx) => (
                                                <div
                                                    key={prodIndx}
                                                    className="flex flex-col sm:flex-row items-center gap-4 py-4 px-2 rounded-lg bg-white shadow hover:shadow-md border border-green-100 transition-all">
                                                    <img
                                                        src={prod.vendor_products?.products?.file_server?.base_url}
                                                        alt={prod.vendor_products?.products?.prod_name || 'Product'}
                                                        className="w-20 h-20 object-cover rounded-lg border-2 border-green-200 shadow-sm"
                                                    />
                                                    <div className="flex-grow w-full sm:w-auto">
                                                        <p className="text-green-900 font-medium text-base">
                                                            {prod.vendor_products?.products?.prod_name || ''}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            Product ID: {prod.vendor_products?.products?.id || '--'}
                                                        </p>
                                                    </div>
                                                    <div className="text-right min-w-[90px]">
                                                        <p className="text-green-600 font-bold text-lg">
                                                            ৳ {prod.vendor_products?.price || 0}
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-col items-center min-w-[70px]">
                                                        <p className="text-gray-700 font-medium">Qty: {prod.qty}</p>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <button
                                                            className="group relative text-gray-400 hover:text-red-500 transition"
                                                            aria-label="Remove Item">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor">
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 11-2 0v6a1 1 0 112 0V8z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                            <span className="opacity-0 group-hover:opacity-100 absolute left-1/2 -translate-x-1/2 bottom-full mb-2 text-xs bg-red-600 text-white py-1 px-2 rounded shadow transition">
                                                                Remove
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-400 py-4 text-center">
                                                No products for this vendor.
                                            </p>
                                        )}
                                    </div>

                                    {/* Vendor Summary */}
                                    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 px-6 py-4 border-t border-green-200 bg-gradient-to-r from-green-100/40 to-green-50/40">
                                        <div className="text-gray-600 text-sm">
                                            <span className="font-medium">Subtotal:</span>
                                            <span className="font-bold text-green-700 ml-2 text-lg">
                                                ৳ {vendorSubtotal}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* Invoice Card */}
                        </div>
                    );
                })}
        </>
    );
};

export default ProductItem;
