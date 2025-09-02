const OrderSummary = ({ itemsTotal, deliveryFee, deliveryDiscount, total }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
        </div>
        <div className="space-y-2 mb-4">
            <div className="flex justify-between">
                <p className="text-gray-700">Items Total (6 Items)</p>
                <p className="text-gray-800">৳ {itemsTotal}</p>
            </div>
            <div className="flex justify-between">
                <p className="text-gray-700">Delivery Fee</p>
                <p className="text-gray-800">৳ {deliveryFee}</p>
            </div>
            <div className="flex justify-between">
                <p className="text-gray-700">Delivery Discount</p>
                <p className="text-red-500">- ৳ {deliveryDiscount}</p>
            </div>
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <p className="text-xl font-semibold text-gray-800">Total:</p>
            <p className="text-2xl font-bold text-green-600">৳ {total}</p>
        </div>
        <p className="text-sm text-gray-500 text-right mt-1">VAT included, where applicable</p>
        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg mt-6 transition duration-200">
            Proceed to Pay
        </button>
    </div>
);

export default OrderSummary;
