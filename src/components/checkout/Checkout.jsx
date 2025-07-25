import Head from 'next/head'

const  Checkout = () => {
  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>

      <section className="bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Billing Details */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Billing Details</h2>
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="tel" className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="+1 234 567 890" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input type="text" className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="123 Main Street" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input type="text" className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                  <input type="text" className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Order</h2>
            <ul className="space-y-4 border-b border-gray-200 pb-4 mb-4 text-sm sm:text-base">
              <li className="flex justify-between text-gray-700">
                <span>Product 1</span>
                <span>$49.99</span>
              </li>
              <li className="flex justify-between text-gray-700">
                <span>Product 2</span>
                <span>$29.99</span>
              </li>
              <li className="flex justify-between font-medium text-gray-700">
                <span>Subtotal</span>
                <span>$79.98</span>
              </li>
              <li className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span>Free</span>
              </li>
              <li className="flex justify-between text-green-700 text-lg font-bold">
                <span>Total</span>
                <span>$79.98</span>
              </li>
            </ul>
            <button className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition duration-300 text-center text-base sm:text-lg">
              Place Order
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Checkout;
