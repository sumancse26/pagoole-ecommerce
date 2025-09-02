const PackageOption = () => (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Package 1 of 1</h2>
            <p className="text-sm text-gray-500">
                Fulfilled by <span className="font-semibold text-gray-700">Daraz</span>
            </p>
        </div>
        <h3 className="text-lg font-medium text-gray-700 mb-3">Delivery Option</h3>
        <div className="border border-green-500 rounded-lg p-4 flex items-start space-x-3 bg-green-50">
            <input type="radio" className="mt-1 form-radio text-green-600 focus:ring-green-500" />
            <div>
                <p className="text-gray-800 font-medium">Standard Delivery</p>
                <p className="text-sm text-gray-600">Get by 5-10 Sep</p>
            </div>
        </div>
    </div>
);

export default PackageOption;
