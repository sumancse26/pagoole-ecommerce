'use client';

import React, { useState, useEffect } from 'react';
import { changeDefaultAddress } from '@/services/deliveryAddress';
import { useRouter } from 'next/navigation';

const ShippingAddressModal = ({
    isOpen,
    onClose,
    isOpenNewModal,
    deliveryAddress,
    refetchDeliveryAddress,
    updateAddressHandler
}) => {
    const [animate, setAnimate] = useState(false);
    const [address, setAddress] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState({});

    const router = useRouter();

    useEffect(() => {
        if (isOpen) {
            setAddress(deliveryAddress);
            setSelectedAddress(deliveryAddress.find((addr) => addr.default_address === '1') || {});
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
        isOpenNewModal(true);
    };

    const changeDefaultAddressHandler = async (e, addr) => {
        try {
            e.preventDefault();
            e.stopPropagation();
            const res = await changeDefaultAddress(addr.id);
            if (res.success) {
                router.refresh();
                refetchDeliveryAddress(true);
                setAddress((prevAddresses) =>
                    prevAddresses.map((address) => {
                        if (address.id === addr.id) {
                            return { ...address, default_address: '1' };
                        }
                        return { ...address, default_address: '0' };
                    })
                );
            }
        } catch (err) {
            throw new Error();
        }
    };

    const changeAddressHandler = (addr) => {
        setSelectedAddress(addr);
    };

    const saveBtnhandler = () => {
        updateAddressHandler(selectedAddress);
        handleClose();
    };

    return (
        <div className={`fixed inset-0 bg-black/50 z-75 overflow-hidden ${isOpen ? 'block' : 'hidden'}`}>
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
                    {address?.length < 2 && (
                        <div className="text-right">
                            <button
                                onClick={newAddressModal}
                                className="text-green-600 hover:text-green-800 font-medium">
                                <u>ADD NEW ADDRESS</u>
                            </button>
                        </div>
                    )}

                    {/* Existing Address Card */}
                    {address?.length > 0 &&
                        address.map((addr, addInx) => (
                            <div
                                key={addInx}
                                onClick={() => changeAddressHandler(addr)}
                                className="bg-white border border-green-500 rounded-lg p-4 shadow-sm relative">
                                {addr.id == selectedAddress.id && (
                                    <div className="absolute top-0 left-0 -mt-2 -ml-2 bg-green-500 rounded-full p-1">
                                        <svg
                                            className="h-4 w-4 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                )}

                                <div className="border border-gray-200 rounded-xl p-3 shadow-sm bg-white cursor-pointer">
                                    {/* Name & Phone */}

                                    <div className="flex items-start mb-2">
                                        <div className="mr-4 mt-1">
                                            <p className="font-semibold text-gray-800">{addr.full_name || ''}</p>
                                            <span className="text-sm font-medium text-gray-600">📞 {addr.phone}</span>
                                        </div>
                                        <span
                                            className={`inline-block px-3 py-1  text-xs font-semibold rounded-full border ${
                                                addr.address_type === 'HOME'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-100 text-red-700'
                                            }`}>
                                            {addr.address_type}
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
                                            {addr.address_line}, {addr.area}, {addr.city}, {addr.region}, {addr.country}
                                        </span>
                                    </p>
                                    {/* make this default address */}
                                    <button
                                        onClick={(e) => changeDefaultAddressHandler(e, addr)}
                                        disabled={addr.default_address == '1'}
                                        className={`inline-block px-3 py-1  text-xs font-semibold rounded-full border ${
                                            addr.default_address === '1'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                        }`}>
                                        {addr.default_address == '1' ? 'Default Address' : 'Make Default Address'}
                                    </button>
                                </div>
                            </div>
                        ))}

                    {/* Action Buttons */}
                    <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
                        <button
                            onClick={handleClose}
                            className="flex-1 mr-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 focus:outline-none">
                            CANCEL
                        </button>
                        <button
                            onClick={saveBtnhandler}
                            className="flex-1 ml-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 focus:outline-none">
                            SAVE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippingAddressModal;
