'use server';

const order = {
    id: 'ORD-2025-1234',
    date: '2025-09-07',
    paymentMethod: 'Credit Card',
    total: 152.75,
    items: [
        {
            id: 1,
            name: 'Wireless Headphones',
            vendor: 'TechWorld',
            qty: 1,
            price: 99.99,
            image: '/images/products/headphones.jpg'
        },
        {
            id: 2,
            name: 'Leather Wallet',
            vendor: 'StyleHub',
            qty: 2,
            price: 26.38,
            image: '/images/products/wallet.jpg'
        }
    ],
    shipping: {
        name: 'John Doe',
        address: '123 Main St, Dhaka, Bangladesh',
        phone: '+880 1234 567 890'
    }
};
const OrderComp = () => {
    // Example mock data (replace with actual props / server data)

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
                                <p className="font-medium text-gray-900">{order.id}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Date</p>
                                <p className="font-medium text-gray-900">{order.date}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Payment Method</p>
                                <p className="font-medium text-gray-900">{order.paymentMethod}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total</p>
                                <p className="font-medium text-gray-900">${order.total.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Items */}
                    <div className="mt-8 border-t border-gray-200 pt-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Items in Your Order</h2>
                        <ul className="divide-y divide-gray-200">
                            {order.items.map((item) => (
                                <li key={item.id} className="py-4 flex items-center gap-4">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 rounded-lg border object-cover"
                                    />
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900">{item.name}</p>
                                        <p className="text-sm text-gray-500">Vendor: {item.vendor}</p>
                                        <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                                    </div>
                                    <p className="font-semibold text-gray-900">${item.price.toFixed(2)}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Shipping Info */}
                    <div className="mt-8 border-t border-gray-200 pt-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Shipping Information</h2>
                        <p className="text-gray-700 font-medium">{order.shipping.name}</p>
                        <p className="text-gray-600">{order.shipping.address}</p>
                        <p className="text-gray-600">{order.shipping.phone}</p>
                    </div>

                    {/* CTA */}
                    <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                        <a
                            href="/orders"
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
