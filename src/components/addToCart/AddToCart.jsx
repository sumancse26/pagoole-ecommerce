'use client';

const CartPage = () => {
    return (
        <div className="py-12 px-4 md:px-10 bg-gray-50 text-gray-900">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold mb-8 text-green-600">Shopping Cart</h1>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border border-gray-200">
                        <thead className="bg-green-100 text-green-700 uppercase">
                            <tr>
                                <th className="p-3 w-16"></th>
                                <th className="p-3">Product</th>
                                <th className="p-3">Price</th>
                                <th className="p-3">Quantity</th>
                                <th className="p-3">Total</th>
                                <th className="p-3">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3].map((i) => (
                                <tr key={i} className="border-t border-gray-200">
                                    <td className="p-3">
                                        <img
                                            src={`/images/product${i}.jpg`}
                                            alt={`Product ${i}`}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    </td>
                                    <td className="p-3 font-medium text-green-700">Product {i} Name</td>
                                    <td className="p-3">$45.00</td>
                                    <td className="p-3">
                                        <div className="flex items-center justify-center border border-green-300 rounded-md overflow-hidden w-28 bg-white">
                                            <button className="w-8 h-8 text-lg text-green-600 hover:bg-green-100">
                                                −
                                            </button>
                                            <input
                                                type="text"
                                                value="1"
                                                onChange={(e) => {}}
                                                className="w-12 text-center border-x border-green-300 outline-none focus:ring-0 focus:border-green-500"
                                            />
                                            <button className="w-8 h-8 text-lg text-green-600 hover:bg-green-100">
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td className="p-3 font-semibold">$45.00</td>
                                    <td className="p-3 text-red-500 hover:text-red-700 cursor-pointer">✕</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Coupon & Update Cart */}
                <div className="mt-8 flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex items-center border border-gray-300 rounded overflow-hidden w-full md:w-1/2 focus-within:border-green-500">
                        <input
                            type="text"
                            placeholder="Enter Coupon Code..."
                            className="w-full px-4 py-2 focus:outline-none focus:border-green-500"
                        />
                        <button className="bg-green-600 text-white px-4 py-2 hover:bg-green-700">Apply</button>
                    </div>
                    <button className="border border-green-600 text-green-600 px-6 py-2 rounded hover:bg-green-600 hover:text-white">
                        Update Cart
                    </button>
                </div>

                {/* Cart Totals */}
                <div className="mt-12 grid md:grid-cols-2 gap-10">
                    <div>
                        <h2 className="text-lg font-semibold mb-3">Calculate Shipping</h2>
                        <form className="space-y-3">
                            <select className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-green-500">
                                <option>Choose Country</option>
                                <option>Bangladesh</option>
                                <option>India</option>
                            </select>
                            <input
                                type="text"
                                placeholder="State / Country"
                                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-green-500"
                            />
                            <input
                                type="text"
                                placeholder="Postcode / ZIP"
                                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-green-500"
                            />
                            <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
                                Update Totals
                            </button>
                        </form>
                    </div>

                    <div className="border border-gray-300 p-6 rounded">
                        <h2 className="text-lg font-semibold mb-3">Cart Totals</h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span>Cart Subtotal</span>
                                <span>$349.00</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span className="text-green-600">Free Shipping</span>
                            </div>
                            <div className="flex justify-between font-bold text-base">
                                <span>Total</span>
                                <span>$349.00</span>
                            </div>
                        </div>
                        <button className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
