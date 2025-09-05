'use client';

import { useEffect, useState } from 'react';
import ShippingAddressModal from './ShippingAddressModal';
import AddNewAddress from './AddNewAddress';

const ShippingBilling = ({ address }) => {
    const [openModal, setOpenModal] = useState(false);
    const [openNewModal, setOpenNewModal] = useState(false);
    const [deliveryAddress, setDeliveryAddress] = useState(false);

    useEffect(() => {
        setDeliveryAddress(address);

        return () => {};
    }, [address]);

    const openModalhandler = () => {
        setOpenModal(true);
    };
    const hideModalHandler = () => {
        setOpenModal(false);
    };
    const closeNewAddressModal = () => {
        setOpenNewModal(false);
    };
    const newModalHandler = () => {
        setOpenNewModal(true);
    };

    return (
        <>
            {!deliveryAddress && (
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

            {deliveryAddress && (
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
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
                            EDIT
                        </button>
                    </div>
                    <p className="text-gray-900 font-medium text-lg">Suman Sarkar</p>
                    <p className="text-gray-700">01796844288</p>
                    <p className="text-gray-600">
                        Mirpur-2, Dhaka, Bangladesh, East Joara Dohazari, Chattogram - Chandanaish, Chattogram
                    </p>
                </div>
            )}
            {openModal && (
                <ShippingAddressModal isOpen={openModal} onClose={hideModalHandler} isOpenNewModal={newModalHandler} />
            )}
            {openNewModal && <AddNewAddress onClose={closeNewAddressModal} />}
        </>
    );
};

export default ShippingBilling;
