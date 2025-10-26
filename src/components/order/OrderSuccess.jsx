'use server';
import moment from 'moment';
const OrderComp = ({ orderInfo }) => {
    return (
        <>
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4">
                <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg
                                className="w-10 h-10 text-green-500"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Order Placed Successfully!</h1>
                        <p className="text-gray-600 mt-2">
                            Thank you for shopping with us. Your order has been confirmed.
                        </p>
                    </div>

                    {/* Order Summary */}
                    <div className="border-t border-gray-200 pt-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm text-gray-500">Order ID</p>
                                <p className="font-medium text-gray-900">{orderInfo.order_code || ''}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Date</p>
                                <p className="font-medium text-gray-900">
                                    {' '}
                                    {moment(orderInfo.updated_at)?.format('DD MMM, YYYY')}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Payment Method</p>
                                <p className="font-medium text-gray-900">
                                    {orderInfo.payment_status?.toLowerCase() == 'unpaid'
                                        ? 'Cash on Delivery'
                                        : 'Internet Banking'}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total</p>
                                <p className="font-medium text-gray-900">TK. {orderInfo.total_amount.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Items */}
                    <div className="mt-8 border-t border-gray-200 pt-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Items in Your Order</h2>
                        <ul className="divide-y divide-gray-200">
                            {orderInfo.order_items.map((item) => (
                                <li key={item.id} className="py-4 flex items-center gap-4">
                                    <img
                                        src={item.vendor_products?.products?.product_images?.[0]?.file_name}
                                        alt="Product Image"
                                        className="w-16 h-16 rounded-lg border border-gray-300 object-cover"
                                    />
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900">
                                            {item.vendor_products?.products?.prod_name || 0}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {item.vendor_products?.vendors?.store_name || 0}
                                        </p>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity || 0}</p>
                                    </div>
                                    <p className="font-semibold text-gray-900">
                                        ${Number(item.quantity || 0) * Number(item.unit_price || 0)}
                                    </p>
                                </li>
                            )) || []}
                        </ul>
                    </div>

                    {/* Shipping Info */}
                    <div className="mt-8 border-t border-gray-200 pt-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Shipping Information</h2>
                        <p className="text-gray-700 font-medium">{orderInfo.address.full_name || ''}</p>
                        <p className="text-gray-600">
                            {orderInfo.address.address_line || ''} , {orderInfo.address.region || ''},
                            {orderInfo.address.country || ''}
                        </p>
                        <p className="text-gray-600">{orderInfo.address.phone || ''}</p>
                    </div>

                    {/* CTA */}
                    <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                        <a
                            href="/order"
                            className="px-6 py-3 bg-gray-800 text-white text-sm font-medium rounded-lg shadow hover:bg-gray-700 transition">
                            View My Orders
                        </a>
                        <a
                            href="/"
                            className="px-6 py-3 bg-green-500 text-white text-sm font-medium rounded-lg shadow hover:bg-green-600 transition">
                            Continue Shopping
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderComp;
