'use client';

import { useEffect, useState } from 'react';

import ShippingBilling from './ShippingBilling';
import ProductItem from './ProductItem';
import OrderSummary from './OrderSummary';
import PackageOption from './PackageOption';

const CheckoutPage = () => {
    const [checkoutData, setCheckoutData] = useState([]);
    const [address, setAddress] = useState(false);
    const [itemTotal, setItemTotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [deliveryFee, setDeliveryFee] = useState(60);
    const [totalVendors, setTotalVendors] = useState(0);

    useEffect(() => {
        const getProduct = () => {
            const itemStr = localStorage.getItem('checkout_data');
            if (!itemStr) {
                setCheckoutData([]);
                return;
            }
            const item = JSON.parse(itemStr);
            setCheckoutData(item.checkout_info || []);
        };

        const timeout = setTimeout(getProduct, 1000);

        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        calculateItemTotal();
        calculateTotalItemsAndDeliveryFee();
    }, [checkoutData]);

    useEffect(() => {
        calculateTotal();
    }, [itemTotal, deliveryFee]);

    const calculateItemTotal = () => {
        const total = checkoutData.reduce((vendorAcc, vendor) => {
            const vendorSubtotal = vendor?.items?.reduce(
                (sum, prod) => sum + (Number(prod.vendor_products?.price) || 0) * (Number(prod.qty) || 0),
                0
            );
            return vendorAcc + vendorSubtotal;
        }, 0);
        setItemTotal(total);
    };

    const calculateTotal = () => {
        setTotal(itemTotal + deliveryFee);
    };

    const calculateTotalItemsAndDeliveryFee = () => {
        let totalItemCount = 0;
        let vendorCount = 0;
        checkoutData.forEach((vendor) => {
            if (vendor?.items?.length > 0) {
                vendorCount += 1;
                totalItemCount += vendor.items.length;
            }
        });
        setTotalItems(totalItemCount);
        setTotalVendors(vendorCount);
        setDeliveryFee(60 * vendorCount);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2">
                    <ShippingBilling address={address} />
                    <PackageOption totalItems={totalItems} totalVendors={totalVendors} />
                    <ProductItem checkoutData={checkoutData} />
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
                        <p className="text-gray-600">No invoice details provided in original image.</p>
                    </div>

                    <OrderSummary
                        itemsTotal={itemTotal}
                        deliveryFee={deliveryFee}
                        deliveryDiscount={0}
                        total={total}
                        address={address}
                        totalItems={totalItems}
                    />
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
