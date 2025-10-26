'use client';

import { useState } from 'react';

const PackageOption = ({ totalItems, totalVendors, deliveryTypeHandler }) => {
    const [deliveryType, setDeliveryType] = useState('online');

    const getDateRange = (val) => {
        const start = new Date();
        const end = new Date();
        const duration = val == 'online' ? 5 : 2;
        end.setDate(start.getDate() + duration);

        const startDay = start.getDate() + 1;
        const endDay = end.getDate();
        const monthName = end.toLocaleString('default', { month: 'short' });

        return `Get by ${startDay} ${monthName} - ${endDay} ${monthName}`;
    };

    const changeDeliveryTypeHandler = (val) => {
        deliveryTypeHandler(val);
        setDeliveryType(val);
    };

    return (
        <>
            <div className="bg-white p-3 rounded-lg shadow-md mb-6">
                <div className="flex justify-between items-center mb-1">
                    <h2 className="text-xl font-semibold text-gray-800">Total Package: {totalVendors || 0}</h2>
                    <p className="text-sm text-gray-500">
                        Fulfilled by <span className="font-semibold text-gray-700">Pagool Discount Shop</span>
                    </p>
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Delivery Option</h3>

                <div className="flex items-center gap-6">
                    {/* Online Delivery */}
                    <div
                        className={`w-full border rounded-xl p-4 flex items-start gap-3 cursor-pointer transition-all duration-200
      ${
          deliveryType === 'online' ? 'border-green-500 bg-green-50 shadow-md' : 'border-gray-200 hover:border-gray-300'
      }`}>
                        <input
                            id="online"
                            type="radio"
                            className="mt-1 form-radio text-green-600 focus:ring-green-500"
                            checked={deliveryType === 'online'}
                            autoComplete="off"
                            onChange={() => changeDeliveryTypeHandler('online')}
                        />
                        <label htmlFor="online" className="flex flex-col cursor-pointer">
                            <div className="flex items-center gap-2">
                                {/* Truck Icon (inline SVG) */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 text-green-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 17h6m-6 0a2 2 0 11-4 0m4 0h6m0 0a2 2 0 104 0m-2-8h-6V5a2 2 0 00-2-2H3v14h2m12-8h2l3 5v3h-2"
                                    />
                                </svg>
                                <span className="text-gray-800 font-semibold">Online Delivery</span>
                            </div>
                            <p className="text-sm text-gray-600 ml-4">{getDateRange('online')}</p>
                        </label>
                    </div>

                    {/* Shop Delivery */}
                    <div
                        className={`w-full border rounded-xl p-3 flex items-start gap-3 cursor-pointer transition-all duration-200
      ${deliveryType === 'shop' ? 'border-green-500 bg-green-50 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input
                            id="shop"
                            type="radio"
                            className="mt-1 form-radio text-green-600 focus:ring-green-500"
                            checked={deliveryType === 'shop'}
                            autoComplete="off"
                            onChange={() => changeDeliveryTypeHandler('shop')}
                        />
                        <label htmlFor="shop" className="flex flex-col cursor-pointer">
                            <div className="flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 text-green-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 9l1-4h16l1 4M4 9v10a1 1 0 001 1h14a1 1 0 001-1V9M16 13H8v6"
                                    />
                                </svg>
                                <span className="text-gray-800 font-semibold">Shop Delivery</span>
                            </div>
                            <p className="text-sm text-gray-600 ml-7">{getDateRange('shop')}</p>
                        </label>
                    </div>
                </div>

                {/* <div className="flex items-center gap-5">
                    <div
                        className={`border border-gray-300 rounded-lg p-2 flex items-start space-x-3 ${
                            deliveryType == 'online' ? 'border-green-500  bg-green-50' : ''
                        }`}>
                        <input
                            id="online"
                            type="radio"
                            className="mt-1 form-radio text-green-600 focus:ring-green-500"
                            checked={deliveryType == 'online'}
                            onChange={() => changeDeliveryTypeHandler('online')}
                        />
                        <label htmlFor="online">
                            <p className="text-gray-800 font-medium">Online Delivery</p>
                            <p className="text-sm text-gray-600">{getDateRange()}</p>
                        </label>
                    </div>
                    <div
                        className={`border border-gray-300 rounded-lg p-2 flex items-start space-x-3 ${
                            deliveryType == 'shop' ? 'border-green-500  bg-green-50' : ''
                        }`}>
                        <input
                            id="shop"
                            type="radio"
                            className="mt-1 form-radio text-green-600 focus:ring-green-500"
                            checked={deliveryType == 'shop'}
                            onChange={() => changeDeliveryTypeHandler('shop')}
                        />
                        <label htmlFor="shop">
                            <p className="text-gray-800 font-medium">Shop Delivery</p>
                            <p className="text-sm text-gray-600">{getDateRange()}</p>
                        </label>
                    </div>
                </div> */}
            </div>
        </>
    );
};

export default PackageOption;
