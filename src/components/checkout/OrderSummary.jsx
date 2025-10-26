'use client';

import { useState } from 'react';

const OrderSummary = ({ itemsTotal, deliveryFee, deliveryDiscount, total, address, totalItems, checkoutHandler }) => {
    const [paymentMethod, setPaymentMethod] = useState('cod');

    const changePayMethodHandler = (method) => {
        setPaymentMethod(method);
    };

    const proceedToPay = () => {
        checkoutHandler(paymentMethod);
    };
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
            </div>
            <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                    <p className="text-gray-700">
                        Items Total (
                        <span className="text-green-700 font-bold">
                            {totalItems} {totalItems == 1 ? 'Item' : 'Items'}
                        </span>
                        )
                    </p>
                    <p className="font-bold text-green-700">৳ {itemsTotal}</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-gray-700">Delivery Fee</p>
                    <p className="text-green-700 font-bold">৳ {deliveryFee}</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-gray-700">Delivery Discount</p>
                    <p className="font-bold text-red-700">- ৳ {deliveryDiscount}</p>
                </div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <p className="text-xl font-semibold text-gray-800">Total:</p>
                <p className="text-2xl font-bold text-green-700">৳ {total}</p>
            </div>
            {/* <p className="text-sm text-gray-500 text-start mt-1">VAT included, where applicable</p> */}
            <div className="flex gap-4 mt-4">
                {/* COD */}
                <label className="flex-1 relative">
                    <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={() => changePayMethodHandler('cod')}
                        className="peer hidden"
                    />
                    <div className="flex flex-col items-center justify-center h-20 border border-gray-300 rounded-2xl cursor-pointer shadow-sm transition-all duration-300 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:shadow-md hover:shadow-md">
                        <span className="text-2xl">💵</span>
                        <span className="mt-1 text-gray-700 font-semibold text-center">Cash on Delivery</span>
                    </div>
                </label>

                {/* Online Payment */}
                <label className="flex-1 relative">
                    <input
                        type="radio"
                        name="payment"
                        value="online"
                        checked={paymentMethod === 'online'}
                        autoComplete="off"
                        onChange={() => changePayMethodHandler('online')}
                        className="peer hidden"
                    />
                    <div className="flex flex-col items-center justify-center h-20 border border-gray-300 rounded-2xl cursor-pointer shadow-sm transition-all duration-300 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:shadow-md hover:shadow-md">
                        <span className="text-2xl">💳</span>
                        <span className="mt-1 text-gray-700 font-semibold text-center">Online Payment</span>
                    </div>
                </label>
            </div>

            <button
                disabled={address?.length == 0}
                className={`w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg mt-6 transition duration-200 ${
                    address?.length == 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={proceedToPay}>
                PROCEED TO PAY
            </button>
        </div>
    );
};

export default OrderSummary;
