import Link from 'next/link';

// Mock data – replace with real DB query via Prisma
const orders = [
    {
        id: 'ORD-2025-1234',
        date: '2025-09-07',
        total: 152.75,
        status: 'Processing',
        itemsCount: 3
    },
    {
        id: 'ORD-2025-1235',
        date: '2025-09-06',
        total: 89.99,
        status: 'Shipped',
        itemsCount: 1
    }
];

export default function OrdersPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">My Orders</h1>

                {orders.length === 0 ? (
                    <p className="text-gray-600 text-center mt-12">You have no orders yet.</p>
                ) : (
                    <ul className="space-y-4">
                        {orders.map((order) => (
                            <li
                                key={order.id}
                                className="bg-white shadow-md rounded-xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                <div className="flex-1">
                                    <p className="text-gray-800 font-medium">Order ID: {order.id}</p>
                                    <p className="text-gray-500 text-sm">Date: {order.date}</p>
                                    <p className="text-gray-500 text-sm">
                                        Items: {order.itemsCount} • Total: ${order.total.toFixed(2)}
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0 items-start sm:items-center">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            order.status === 'Shipped'
                                                ? 'bg-green-100 text-green-800'
                                                : order.status === 'Processing'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-gray-100 text-gray-800'
                                        }`}>
                                        {order.status}
                                    </span>

                                    <Link
                                        href={`/order/details`}
                                        className="px-4 py-2 text-sm font-medium bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition">
                                        View Details
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
