import ShippingBilling from './ShippingBilling';
import PackageOption from './PackageOption';
import ProductItem from './ProductItem';
import OrderSummary from './OrderSummary';

const CheckoutPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2">
                    <ShippingBilling />
                    <PackageOption />

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-medium text-gray-700 mb-4">Products in this package</h3>
                        <ProductItem
                            name="Yes Synthetic Detergent Powder Lemon 1 kg."
                            price={96}
                            originalPrice={150}
                            discount="-36%"
                            qty={5}
                            imageSrc="/images/detergent.png"
                        />
                        <ProductItem
                            name="Silicone Soft Case for Airpod Pro & Pro 2 Wireless Earbuds - Protective Headphone Cover"
                            price={85}
                            originalPrice={270}
                            discount="-69%"
                            qty={1}
                            imageSrc="/images/airpods-case.png"
                        />
                        {/* Add more ProductItem components as needed */}
                    </div>
                </div>

                {/* Right Column */}
                <div>
                    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Promotion</h2>
                        </div>
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                placeholder="Enter Store/Daraz Code"
                                className="flex-grow border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
                                APPLY
                            </button>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Invoice and Contact Info</h2>
                            <button className="text-green-600 hover:text-green-800 font-medium">Edit</button>
                        </div>
                        {/* Add invoice and contact info details here if available */}
                        <p className="text-gray-600">No invoice details provided in original image.</p>
                    </div>

                    <OrderSummary itemsTotal={565} deliveryFee={210} deliveryDiscount={120} total={655} />
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
