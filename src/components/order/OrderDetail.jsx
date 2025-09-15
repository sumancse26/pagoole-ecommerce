import moment from 'moment';
import Link from 'next/link';

const OrderDetailPage = ({ orderData }) => {
    const groupedVendors = orderData.order_items.reduce((acc, item) => {
        const vendor = item.vendor_products.vendors?.store_name || 'Unknown Vendor';
        if (!acc[vendor]) acc[vendor] = [];
        acc[vendor].push(item);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
                        <p className="text-gray-600 mt-1">Order ID: {orderData.order_code}</p>
                    </div>
                    <span
                        className={`mt-2 sm:mt-0 px-4 py-1 rounded-full text-sm font-medium ${
                            orderData.payment_status.toLowerCase() === 'paid'
                                ? 'bg-green-100 text-green-800'
                                : orderData.order_status.toLowerCase() === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                        }`}>
                        {orderData.order_status}
                    </span>
                </div>

                {/* Order Summary */}
                <div className="border-t border-gray-200 pt-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <p className="text-sm text-gray-500">Order Date</p>
                            <p className="font-medium text-gray-900">
                                {moment(orderData.updated_at).format('DD MMM, YYYY')}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Payment Method</p>
                            <p className="font-medium text-gray-900">{orderData.payment_method || '—'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total</p>
                            <p className="font-medium text-gray-900">${orderData.total_amount.toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                {/* Shipping Info */}
                <div className="border-t border-gray-200 pt-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Shipping Information</h2>
                    <p className="text-gray-700 font-medium">{orderData.address.full_name}</p>
                    <p className="text-gray-600">{orderData.address.address_line}</p>
                    <p className="text-gray-600">{orderData.address.phone}</p>
                    <p className="text-gray-500 text-sm">
                        {orderData.address.city}, {orderData.address.region}, {orderData.address.country}
                    </p>
                </div>

                {/* Items by Vendor */}
                <div className="border-t border-gray-200 pt-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Items</h2>
                    {Object.keys(groupedVendors).map((vendor) => (
                        <div key={vendor} className="mb-6">
                            <h3 className="font-medium text-gray-900 mb-2">{vendor}</h3>
                            <ul className="divide-y divide-gray-200">
                                {groupedVendors[vendor].map((item) => (
                                    <li key={item.id} className="py-4 flex items-center gap-4">
                                        <img
                                            src={item.vendor_products.products.file_server.base_url}
                                            alt={item.vendor_products.products.prod_name}
                                            className="w-16 h-16 rounded-lg border object-cover"
                                        />
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900">
                                                {item.vendor_products.products.prod_name}
                                            </p>
                                            <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-semibold text-gray-900">
                                            ${(item.unit_price * item.quantity).toFixed(2)}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Back to Orders */}
                <div className="flex justify-end">
                    <Link
                        href="/orders"
                        className="px-6 py-3 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition">
                        Back to Orders
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailPage;
