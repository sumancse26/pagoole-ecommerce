'use client';

import { useState } from 'react';
import ShippingAddressModal from './ShippingAddressModal';
import AddNewAddress from './AddNewAddress';

const ShippingBilling = () => {
    const [openModal, setOpenModal] = useState(false);
    const [openNewModal, setOpenNewModal] = useState(false);

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
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Shipping & Billing</h2>
                <button
                    onClick={openModalhandler}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg mt-6 transition duration-200">
                    Edit Address
                </button>
            </div>
            <p className="text-gray-700 font-medium">Suman Sarkar</p>
            <p className="text-gray-600">01796844288</p>
            <p className="text-gray-600">
                Mirpur-2, Dhaka, Bangladesh, East Joara Dohazari, Chattogram - Chandanaish, Chattogram
            </p>

            {openModal && (
                <ShippingAddressModal isOpen={openModal} onClose={hideModalHandler} isOpenNewModal={newModalHandler} />
            )}
            {openNewModal && <AddNewAddress onClose={closeNewAddressModal} />}
        </div>
    );
};

export default ShippingBilling;
