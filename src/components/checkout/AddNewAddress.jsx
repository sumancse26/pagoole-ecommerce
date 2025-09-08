'use client';

import { useEffect, useState } from 'react';
import { getRegionList } from '@/services/location';
import { createDeliveryAddress } from '@/services/deliveryAddress';
import SearchableDropdown from '@components/SearchableDropdown';
import { useRouter } from 'next/navigation';
const AddNewAddress = ({ onClose }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [values, setValues] = useState({
        full_name: '',
        region: 'Dhaka',
        phone: '',
        city: 'Dhaka',
        building: '',
        area: '',
        colony: '',
        address_line: '',
        address_type: 'HOME'
    });
    const [regionList, setRegionList] = useState([]);
    const [citiList, setCitiList] = useState([]);
    const [areaList, setAreaList] = useState([]);

    const router = useRouter();

    useEffect(() => {
        setIsOpen(true);
        locationListHandler({
            id: null,
            type: 'region'
        });

        return () => {};
    }, []);

    const locationListHandler = async (data) => {
        try {
            if (data.type == 'region') {
                const res = await getRegionList(data);
                setRegionList(res.list_data || []);
            } else if (data.type == 'city') {
                const res = await getRegionList(data);

                setCitiList(res.list_data || []);
            } else {
                const res = await getRegionList(data);

                setAreaList(res.list_data || []);
            }
        } catch (err) {
            throw new Error(err.message);
        }
    };

    const handleRegionChange = (val) => {
        setValues((prev) => ({
            ...prev,
            region: val.name
        }));

        locationListHandler({
            id: val.id,
            type: 'city'
        });
    };

    const handleCityChange = (val) => {
        setValues((prev) => ({
            ...prev,
            city: val.name
        }));

        locationListHandler({
            id: val.id,
            type: 'area'
        });
    };

    const handleAreaChange = (val) => {
        setValues((prev) => ({
            ...prev,
            area: val.name
        }));
    };

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(onClose, 300);
    };

    // Generic input change handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Label button handler
    const handleLabel = (address_type) => {
        setValues((prev) => ({
            ...prev,
            address_type
        }));
    };

    // Save handler
    const saveBtnHandler = async (e) => {
        e.preventDefault();
        try {
            if (!values.full_name || !values.region || !values.phone || !values.city || !values.address_line) {
                alert('Please fill all required fields!');
                return;
            }

            const res = await createDeliveryAddress(values);
            if (res.success) {
                await router.refresh();
                handleClose();
            }
        } catch (err) {
            throw new Error(err.message);
        }
    };

    return (
        <div
            className={`fixed inset-0 bg-black/50 bg-opacity-40 z-1000 transition-opacity duration-300 ${
                isOpen ? 'opacity-100' : 'opacity-0'
            }`}>
            {/* Modal content container */}
            <div
                className={`fixed right-0 top-0 h-full bg-white shadow-xl p-6 w-full max-w-4xl max-h-full overflow-y-auto transform transition-transform duration-300 ease-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                {/* Close button */}
                <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-4 sticky top-0 bg-white z-10">
                    <h2 className="text-2xl font-semibold text-gray-600">Add New Delivery Address</h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 absolute top-2 right-4"
                        aria-label="Close modal">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <form>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                                Full name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="full_name"
                                value={values.full_name}
                                onChange={handleChange}
                                placeholder="Enter your first and last name"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                                Region <span className="text-red-500">*</span>
                            </label>
                            <SearchableDropdown
                                options={regionList}
                                onSelect={handleRegionChange}
                                labelKey={'name'}
                                placeholder={'Search or select region .....'}
                            />
                        </div>
                        <div>
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="phoneNumber"
                                name="phone"
                                value={values.phone}
                                onChange={handleChange}
                                placeholder="Please enter your phone number"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                City <span className="text-red-500">*</span>
                            </label>
                            <SearchableDropdown
                                options={citiList}
                                onSelect={handleCityChange}
                                labelKey={'name'}
                                placeholder={'Search or select city .....'}
                            />
                        </div>
                        <div>
                            <label htmlFor="building" className="block text-sm font-medium text-gray-700">
                                Building / House No / Floor / Street
                            </label>
                            <input
                                type="text"
                                id="building"
                                name="building"
                                value={values.building}
                                onChange={handleChange}
                                placeholder="Please enter"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="area" className="block text-sm font-medium text-gray-700">
                                Area <span className="text-red-500">*</span>
                            </label>
                            <SearchableDropdown
                                options={areaList}
                                onSelect={handleAreaChange}
                                labelKey={'name'}
                                placeholder={'Search or select area .....'}
                            />
                        </div>
                        <div>
                            <label htmlFor="colony" className="block text-sm font-medium text-gray-700">
                                Colony / Suburb / Locality / Landmark
                            </label>
                            <input
                                type="text"
                                id="colony"
                                name="colony"
                                value={values.colony}
                                onChange={handleChange}
                                placeholder="Please enter"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address_line"
                                value={values.address_line}
                                onChange={handleChange}
                                placeholder="For Example: House# 123, Street# 123, ABC Road"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <p className="block text-sm font-medium text-gray-700 mb-2">
                            Select a label for effective delivery:
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button
                                type="button"
                                className={`flex items-center space-x-2 px-4 py-2 rounded-md border ${
                                    values.address_type === 'OFFICE'
                                        ? 'border-green-500 text-green-700 bg-green-50'
                                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                                onClick={() => handleLabel('OFFICE')}>
                                {/* SVG ICON HERE */}
                                <span>OFFICE</span>
                            </button>
                            <button
                                type="button"
                                className={`flex items-center space-x-2 px-4 py-2 rounded-md border ${
                                    values.address_type === 'HOME'
                                        ? 'border-green-500 text-green-700 bg-green-50'
                                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                                onClick={() => handleLabel('HOME')}>
                                {/* SVG ICON HERE */}
                                <span>HOME</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center space-x-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">
                            CANCEL
                        </button>
                        <button
                            type="submit"
                            onClick={saveBtnHandler}
                            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                            SAVE
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNewAddress;
