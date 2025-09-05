'use client';

const PackageOption = ({ totalItems, totalVendors }) => {
    const getDateRange = () => {
        const start = new Date();
        const end = new Date();
        end.setDate(start.getDate() + 5);

        const startDay = start.getDate() + 1;
        const endDay = end.getDate();
        const monthName = end.toLocaleString('default', { month: 'short' });

        return `Get by ${startDay} ${monthName} - ${endDay} ${monthName}`;
    };

    return (
        <>
            <div className="bg-white p-3 rounded-lg shadow-md mb-6">
                <div className="flex justify-between items-center mb-1">
                    <h2 className="text-xl font-semibold text-gray-800">Total Package: {totalVendors || 0}</h2>
                    <p className="text-sm text-gray-500">
                        Fulfilled by <span className="font-semibold text-gray-700">Pagool Discount Shop</span>
                    </p>
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Delivery Option</h3>
                <div className="border border-green-500 rounded-lg p-2 flex items-start space-x-3 bg-green-50">
                    <input
                        type="radio"
                        className="mt-1 form-radio text-green-600 focus:ring-green-500"
                        checked
                        readOnly
                    />
                    <div>
                        <p className="text-gray-800 font-medium">Standard Delivery</p>
                        <p className="text-sm text-gray-600">{getDateRange()}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PackageOption;
