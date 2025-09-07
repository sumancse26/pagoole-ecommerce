import Link from 'next/link';

export default function OrderDetailPage() {
    const order = {
        id: 1,
        date: '2025-09-07',
        paymentMethod: 'Credit Card',
        status: 'Processing',
        total: 152.75,
        shipping: {
            name: 'John Doe',
            address: '123 Main St, Dhaka, Bangladesh',
            phone: '+880 1234 567 890'
        },
        itemsByVendor: [
            {
                vendor: 'TechWorld',
                vendorId: 1,
                items: [
                    {
                        id: 1,
                        name: 'Wireless Headphones',
                        qty: 1,
                        price: 99.99,
                        image: '/images/products/headphones.jpg'
                    }
                ]
            },
            {
                vendor: 'StyleHub',
                vendorId: 2,
                items: [{ id: 2, name: 'Leather Wallet', qty: 2, price: 26.38, image: '/images/products/wallet.jpg' }]
            }
        ]
    };
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
                        <p className="text-gray-600 mt-1">Order ID: {order.id}</p>
                    </div>
                    <span
                        className={`mt-2 sm:mt-0 px-4 py-1 rounded-full text-sm font-medium ${
                            order.status === 'Shipped'
                                ? 'bg-green-100 text-green-800'
                                : order.status === 'Processing'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                        }`}>
                        {order.status}
                    </span>
                </div>

                {/* Order Summary */}
                <div className="border-t border-gray-200 pt-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <p className="text-sm text-gray-500">Order Date</p>
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

                {/* Shipping Info */}
                <div className="border-t border-gray-200 pt-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Shipping Information</h2>
                    <p className="text-gray-700 font-medium">{order.shipping.name}</p>
                    <p className="text-gray-600">{order.shipping.address}</p>
                    <p className="text-gray-600">{order.shipping.phone}</p>
                </div>

                {/* Items by Vendor */}
                <div className="border-t border-gray-200 pt-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Items</h2>
                    {order.itemsByVendor.map((vendorGroup) => (
                        <div key={vendorGroup.vendorId} className="mb-6">
                            <h3 className="font-medium text-gray-900 mb-2">{vendorGroup.vendor}</h3>
                            <ul className="divide-y divide-gray-200">
                                {vendorGroup.items.map((item) => (
                                    <li key={item.id} className="py-4 flex items-center gap-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 rounded-lg border object-cover"
                                        />
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900">{item.name}</p>
                                            <p className="text-gray-500 text-sm">Qty: {item.qty}</p>
                                        </div>
                                        <p className="font-semibold text-gray-900">${item.price.toFixed(2)}</p>
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
}
