'use client';

import React, { useState, useEffect } from 'react';

const ShippingAddressModal = ({ isOpen, onClose, isOpenNewModal }) => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setAnimate(true), 50);
        } else {
            setAnimate(false);
        }
    }, [isOpen]);

    const handleClose = () => {
        setAnimate(false);
        setTimeout(onClose, 300);
    };

    if (!isOpen && !animate) {
        return null;
    }

    const newAddressModal = () => {
        onClose();
        isOpenNewModal(true);
    };

    return (
        <div className={`fixed inset-0 z-75 overflow-hidden ${isOpen ? 'block' : 'hidden'}`}>
            {/* Overlay */}
            <div
                className={`absolute inset-0 bg-opacity-50 transition-opacity duration-300 ${
                    animate ? 'opacity-100' : 'opacity-0'
                }`}
                onClick={handleClose}></div>

            {/* Slider Panel */}
            <div
                className={`fixed top-0 right-0 w-full md:w-1/2 lg:w-1/3 h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
                    animate ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-800">Shipping Address</h2>
                    <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    {/* Add New Address */}
                    <div className="text-right">
                        <button onClick={newAddressModal} className="text-green-600 hover:text-green-800 font-medium">
                            Add new address
                        </button>
                    </div>

                    {/* Existing Address Card */}
                    <div className="bg-white border border-green-500 rounded-lg p-4 shadow-sm relative">
                        <div className="absolute top-0 left-0 -mt-2 -ml-2 bg-green-500 rounded-full p-1">
                            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div className="flex items-start mb-2">
                            <div className="mr-4 mt-1">
                                <p className="font-semibold text-gray-800">Suman Sarkar</p>
                                <p className="text-sm text-gray-600">01796844288</p>
                            </div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                HOME
                            </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-3">
                            Mirpur-2, Dhaka, Bangladesh <br />
                            Region: Chattogram - Chattogram - Chandanaish - East Joara Dohazari
                        </p>

                        <div className="flex flex-wrap gap-2">
                            <button className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full hover:bg-green-200">
                                Default Shipping Address
                            </button>
                            <button className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full hover:bg-gray-200">
                                Default Billing Address
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
                        <button
                            onClick={handleClose}
                            className="flex-1 mr-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 focus:outline-none">
                            CANCEL
                        </button>
                        <button className="flex-1 ml-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 focus:outline-none">
                            SAVE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippingAddressModal;
