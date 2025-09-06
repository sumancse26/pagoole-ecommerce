'use client';

import { useState } from 'react';
import AddNewAddress from './AddNewAddress';

const ShippingBilling = ({ address, openModalhandler }) => {
    const [openNewModal, setOpenNewModal] = useState(false);

    const closeNewAddressModal = () => {
        setOpenNewModal(false);
    };
    const newModalHandler = () => {
        setOpenNewModal(true);
    };

    return (
        <>
            {!address && (
                <div className="bg-white px-4 py-3 rounded-lg shadow-md mb-6 flex justify-end">
                    <button
                        className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-lg font-semibold py-2 px-7 rounded-lg shadow-md transition duration-200 flex items-center gap-2 justify-center outline-none ring-2 ring-transparent focus:ring-green-200"
                        onClick={newModalHandler}>
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="16" />
                            <line x1="8" y1="12" x2="16" y2="12" />
                        </svg>
                        ADD DELIVERY ADDRESS
                    </button>
                </div>
            )}

            {address && (
                <div className="bg-white p-3 rounded-lg shadow-md mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-900">Shipping & Billing</h2>
                        <button
                            onClick={openModalhandler}
                            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition duration-200 outline-none ring-2 ring-transparent focus:ring-green-200">
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <path d="M12 20h9" />
                                <path d="M16.5 3.5a2.12 2.12 0 1 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z" />
                            </svg>
                            CHANGE ADDRESS
                        </button>
                    </div>
                    {address && (
                        <div className="border border-gray-200 rounded-xl p-3 shadow-sm bg-white">
                            {/* Name & Phone */}

                            <div className="flex items-start mb-2">
                                <div className="mr-4 mt-1">
                                    <p className="font-semibold text-gray-800">{address.full_name || ''}</p>
                                    <span className="text-sm font-medium text-gray-600">📞 {address.phone}</span>
                                </div>
                                <span
                                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${
                                        address.address_type === 'HOME'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                    }`}>
                                    {address.address_type}
                                </span>
                            </div>

                            {/* Address */}
                            <p className="flex items-start gap-2 text-gray-700 mb-2">
                                {/* Address Icon */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 text-green-600 mt-1 flex-shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 8.25c0 7.25-7.5 12.75-7.5 12.75S4.5 15.5 4.5 8.25a7.5 7.5 0 1115 0z"
                                    />
                                </svg>
                                <span>
                                    {address.address_line}, {address.area}, {address.city}, {address.region},{' '}
                                    {address.country}
                                </span>
                            </p>
                        </div>
                    )}
                </div>
            )}
            {openNewModal && <AddNewAddress onClose={closeNewAddressModal} />}
        </>
    );
};

export default ShippingBilling;
