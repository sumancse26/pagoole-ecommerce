'use client';

import { useAlert } from '@/context/AlertContext';
import { useApiLoader } from '@/lib/useApiLoader';
import Loader from '@components/Loader';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import SearchableDropdown from '../SearchableDropdown';
import { getLocationList } from '@/services/vendor';
import { register } from '@/services/users';

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        user_name: '',
        phone: '',
        password: '',
        store_name: '',
        store_description: '',
        address: '',
        location_id: '',
        store_logo: '',
        image: ''
    });
    const [loadingState, setLoadingState] = useState(false);
    const [locations, setLocations] = useState([]);

    const router = useRouter();
    const { showAlert } = useAlert();
    const { start, stop } = useApiLoader();

    useEffect(() => {
        fetchLocations();

        return () => {};
    }, []);

    const fetchLocations = async () => {
        try {
            const res = await getLocationList();
            setLocations(res.location_list || []);
        } catch (err) {
            throw new Error(err.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        setLoadingState(true);
        start();
        const result = await register(formData);
        setLoadingState(false);
        if (result && result.success) {
            router.push('/login');
            showAlert(result.message, 'success');
            setFormData({
                email: '',
                user_name: '',
                last_name: '',
                phone: '',
                password: '',
                store_name: '',
                store_description: '',
                address: '',
                location_id: '',
                store_logo: '',
                image: ''
            });
            stop();
        } else {
            stop();
            showAlert(result.message, 'error');
        }
    };

    const handleLocation = (val) => {
        setFormData({
            ...formData,
            address: val.full_address,
            location_id: val.id
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-100 p-4">
            <form
                className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-4xl animate-fade-in"
                onSubmit={handleFormSubmit}>
                <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-4">Create Your Account</h2>
                <p className="text-sm text-gray-500 text-center mb-8">Fill in the details below to get started.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="email@gmail.com"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="user_name"
                            required
                            value={formData.user_name}
                            onChange={handleChange}
                            placeholder="First Name"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Mobile"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                    </div>

                    <div className="sm:col-span-2 lg:col-span-1">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Store Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="store_name"
                            required
                            value={formData.store_name}
                            onChange={handleChange}
                            placeholder="Store Name"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Store Description <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="store_description"
                            required
                            value={formData.store_description}
                            onChange={handleChange}
                            placeholder="Store Name"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Location <span className="text-red-500">*</span>
                        </label>

                        <SearchableDropdown options={locations} onSelect={handleLocation} labelKey="full_address" />
                    </div>
                </div>

                <div className="flex justify-center w-full">
                    <button
                        disabled={loadingState}
                        type="submit"
                        className="w-full flex items-center justify-center md:w-auto px-8 py-3 bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-dreen-600 transition-all duration-300 text-white font-semibold rounded-xl shadow-md hover:shadow-lg focus:outline-none">
                        Complete Registration {loadingState && <Loader />}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
