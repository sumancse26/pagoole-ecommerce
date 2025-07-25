'use client';

export default function WishlistPage() {
    return (
        <div className="py-12 px-4 md:px-10 bg-gray-50 text-gray-900">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-green-600">Wishlist</h1>

                <div className="overflow-x-auto">
                    <table className="w-full border text-sm text-left">
                        <thead className="bg-green-100 text-green-700 uppercase text-xs">
                            <tr>
                                <th className="p-3 w-16"></th>
                                <th className="p-3">Product</th>
                                <th className="p-3">Price</th>
                                <th className="p-3">Stock</th>
                                <th className="p-3">Add to Cart</th>
                                <th className="p-3">Remove</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {[1, 2, 3].map((i) => (
                                <tr key={i} className="border-b">
                                    <td className="p-3">
                                        <img
                                            src={`/images/product${i}.jpg`}
                                            alt={`Product ${i}`}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    </td>
                                    <td className="p-3 font-medium text-green-700">Product {i} Name</td>
                                    <td className="p-3 text-gray-800">$45.00</td>
                                    <td className="p-3">
                                        <span className="inline-block bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full">
                                            In Stock
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        <button className="bg-green-600 text-white text-xs px-4 py-2 rounded hover:bg-green-700 transition">
                                            Add to Cart
                                        </button>
                                    </td>
                                    <td className="p-3">
                                        <button className="text-red-500 hover:text-red-700 text-lg">×</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
