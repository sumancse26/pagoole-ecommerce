'use client';

const AddNewAddress = ({ onClose }) => {
    return (
        <div className="fixed bg-gray-100 inset-0  bg-opacity-25 flex items-center justify-center p-4 z-50">
            {/* Modal content container */}
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl relative max-h-[90vh] overflow-y-auto">
                {/* Close button */}
                <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-4 sticky top-0 bg-white z-10">
                    <h2 className="text-2xl font-semibold text-gray-600">Add new shipping Address</h2>
                    <button
                        onClick={onClose}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                            Full name
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            placeholder="Enter your first and last name"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                            Region
                        </label>
                        <select
                            id="region"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">
                            <option>Please choose your region</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            id="phoneNumber"
                            placeholder="Please enter your phone number"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                            City
                        </label>
                        <select
                            id="city"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">
                            <option>Please choose your city</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="building" className="block text-sm font-medium text-gray-700">
                            Building / House No / Floor / Street
                        </label>
                        <input
                            type="text"
                            id="building"
                            placeholder="Please enter"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="area" className="block text-sm font-medium text-gray-700">
                            Area
                        </label>
                        <select
                            id="area"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">
                            <option>Please choose your area</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="colony" className="block text-sm font-medium text-gray-700">
                            Colony / Suburb / Locality / Landmark
                        </label>
                        <input
                            type="text"
                            id="colony"
                            placeholder="Please enter"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
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
                        <button className="flex items-center space-x-2 px-4 py-2 rounded-md border border-green-500 text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                />
                            </svg>
                            <span>OFFICE</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                            <span>HOME</span>
                        </button>
                    </div>
                </div>

                <div className="flex justify-center space-x-4">
                    <button
                        onClick={onClose} // Also close on Cancel
                        className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">
                        CANCEL
                    </button>
                    <button className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                        SAVE
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddNewAddress;
