'use client';

import { useAlert } from '@/context/AlertContext';
import { useApiLoader } from '@/lib/useApiLoader';
import Loader from '@components/Loader';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import SearchableDropdown from '../SearchableDropdown';
import { getLocationList } from '@/services/vendor';
import { register } from '@/services/users';
import { authRegister } from '@/services/auth.js';

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
        trade_license_no: '',
        nid_no: '',
        store_logo: null,
        trade_license_image: null,
        nid_image: null,
        image: null,
        isCustomer: false
    });

    const [loadingState, setLoadingState] = useState(false);
    const [locations, setLocations] = useState([]);

    const router = useRouter();
    const { showAlert } = useAlert();
    const { start, stop } = useApiLoader();

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        try {
            const res = await getLocationList();
            setLocations(res.location_list || []);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData((prev) => ({ ...prev, [name]: files[0] || null }));
    };

    const handleLocation = (val) => {
        setFormData((prev) => ({
            ...prev,
            address: val.full_address,
            location_id: val.id
        }));
    };

    const handleFormSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoadingState(true);
            start();

            if (
                formData.location_id == '' ||
                !formData.location_id ||
                formData.nid_no == '' ||
                formData.nid_image == null
            ) {
                showAlert('Please fill all required fields', 'error');
                setLoadingState(false);
                stop();
                return;
            }

            const data = new FormData();
            Object.keys(formData).forEach((key) => {
                if (formData[key] !== null && typeof formData[key] !== 'object') {
                    data.append(key, formData[key]);
                }
            });

            if (formData.store_logo) data.append('store_logo', formData.store_logo);
            if (formData.trade_license_image) data.append('trade_license_image', formData.trade_license_image);
            if (formData.nid_image) data.append('nid_image', formData.nid_image);
            if (formData.image) data.append('image', formData.image);
            let firstName = '';
            let lastName = '';
            const nameParts = formData.user_name.trim().split(/\s+/); 

            if (nameParts.length === 1) {
                firstName = nameParts[0];
                lastName = '';
            } else if (nameParts.length === 2) {
                firstName = nameParts[0];
                lastName = nameParts[1];
            } else if (nameParts.length > 2) {
                firstName = nameParts[0];
                lastName = nameParts.slice(1).join(' '); 
            }
            const authResult = await authRegister({
                firstName: firstName,
                lastName: lastName,
                emailOrMobile:  formData.email || formData.phone,
                password: formData.password,
                dateOfBirth: formData.dateOfBirth
            });

            
            
            const response = await authResult.json() 
            let result= {}; 
            const parts = response.data?.accessToken?.split('.');
            if (parts.length !== 3) throw new Error('Invalid JWT format');

            const [ ,payloadB64,] = parts;

            const buf = (b64) => {
                // add padding for base64url
                const s = b64.replace(/-/g, '+').replace(/_/g, '/');
                return Buffer.from(s + '='.repeat((4 - s.length % 4) % 4), 'base64').toString('utf8');
            };

            
            const payloadJson = JSON.parse(buf(payloadB64));

            if(authResult.status == 201 && payloadJson.id){
                data.append('id', payloadJson.id)
                result = await register(data);
            }
             

            if (result?.success) {
                showAlert(result.message, 'success');
                router.push('/login');
                setFormData({
                    email: '',
                    user_name: '',
                    phone: '',
                    password: '',
                    store_name: '',
                    store_description: '',
                    address: '',
                    location_id: '',
                    trade_license_no: '',
                    nid_no: '',
                    store_logo: null,
                    trade_license_image: null,
                    nid_image: null,
                    image: null,
                    isCustomer: false
                });
            } else {
                showAlert(response?.message || 'Registration failed', 'error');
            }
        } catch (err) {
            console.error('Error submitting form:', err);
            showAlert('Registration failed', 'error');
        } finally {
            setLoadingState(false);
            stop();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-100 p-3">
            <form
                className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-5xl animate-fade-in"
                onSubmit={handleFormSubmit}
                encType="multipart/form-data">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Open a New Shop In Pagoole Discount Shop</h2>
                <p className="text-sm text-gray-500 text-center mb-4">Fill in the details below to get started.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                    {/* Email */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="email@gmail.com"
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
                        />
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="user_name"
                            required
                            value={formData.user_name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Mobile"
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
                        />
                    </div><div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                            DOB <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            required
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            placeholder="Date of Birth"
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
                        />
                    </div>

                    {/* Store Name */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Store Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="store_name"
                            required
                            value={formData.store_name}
                            onChange={handleChange}
                            placeholder="Store Name"
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
                        />
                    </div>

                    {/* Store Description */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Store Description</label>
                        <input
                            type="text"
                            name="store_description"
                            value={formData.store_description}
                            onChange={handleChange}
                            placeholder="Description"
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Location <span className="text-red-500">*</span>
                        </label>
                        <SearchableDropdown options={locations} onSelect={handleLocation} labelKey="full_address" />
                    </div>

                    {/* Trade License No */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Trade License No <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="trade_license_no"
                            value={formData.trade_license_no}
                            onChange={handleChange}
                            required
                            placeholder="License Number"
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
                        />
                    </div>

                    {/* NID No */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                            NID No <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="nid_no"
                            value={formData.nid_no}
                            onChange={handleChange}
                            required
                            placeholder="NID Number"
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
                        />
                    </div>

                    {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8"> */}
                    {/* Store Image */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Store Image</label>
                        <input
                            type="file"
                            name="store_logo"
                            accept="image/*,.pdf"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 
                       file:text-sm file:font-medium file:bg-emerald-100 file:text-emerald-700 
                       hover:file:bg-emerald-200 transition-colors duration-200 cursor-pointer"
                        />
                        {/* <p className="text-xs text-gray-500 mt-1">Accepted: Images or PDF</p> */}
                    </div>

                    {/* Trade License */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Trade License Image <span className="text-red-500">*</span>
                        </label>
                        <input
                            required
                            type="file"
                            name="trade_license_image"
                            accept="image/*,.pdf"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 
                       file:text-sm file:font-medium file:bg-emerald-100 file:text-emerald-700 
                       hover:file:bg-emerald-200 transition-colors duration-200 cursor-pointer"
                        />
                    </div>

                    {/* NID Image */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            NID Image <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="file"
                            name="nid_image"
                            accept="image/*,.pdf"
                            onChange={handleFileChange}
                            required
                            className="block w-full text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 
                       file:text-sm file:font-medium file:bg-emerald-100 file:text-emerald-700 
                       hover:file:bg-emerald-200 transition-colors duration-200 cursor-pointer"
                        />
                    </div>

                    {/* User Image */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">User Image</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*,.pdf"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 
                       file:text-sm file:font-medium file:bg-emerald-100 file:text-emerald-700 
                       hover:file:bg-emerald-200 transition-colors duration-200 cursor-pointer"
                        />
                    </div>
                    {/* </div> */}

                    {/* File Uploads */}
                    {/* <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Store Image</label>
                        <input
                            type="file"
                            name="store_logo"
                            accept="image/*,.pdf"
                            onChange={handleFileChange}
                            className="w-full text-xs text-gray-700"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Trade License Image</label>
                        <input
                            type="file"
                            name="trade_license_image"
                            accept="image/*,.pdf"
                            onChange={handleFileChange}
                            className="w-full text-xs text-gray-700"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">NID Image</label>
                        <input
                            type="file"
                            name="nid_image"
                            accept="image/*,.pdf"
                            onChange={handleFileChange}
                            className="w-full text-xs text-gray-700"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">User Image</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*,.pdf"
                            onChange={handleFileChange}
                            className="w-full text-xs text-gray-700"
                        />
                    </div> */}
                </div>

                <div className="flex justify-center w-full">
                    <button
                        disabled={loadingState}
                        type="submit"
                        className="w-full flex items-center justify-center md:w-auto px-6 py-2 bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600 text-white font-semibold text-sm rounded-lg shadow-md hover:shadow-lg focus:outline-none">
                        Complete Registration {loadingState && <Loader />}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
