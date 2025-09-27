'use client';

import { createOrder } from '@/services/order';
import { useEffect, useState } from 'react';
import { getDeliveryAddresstList } from '@/services/deliveryAddress';
import ShippingBilling from './ShippingBilling';
import ProductItem from './ProductItem';
import OrderSummary from './OrderSummary';
import PackageOption from './PackageOption';
import ShippingAddressModal from './ShippingAddressModal';
import AddNewAddress from './AddNewAddress';
import { useRouter } from 'next/navigation';

const CheckoutPage = () => {
    const [checkoutData, setCheckoutData] = useState([]);
    const [productList, setProductList] = useState([]);
    const [address, setAddress] = useState({});
    const [selectedAddress, setSelectedAddress] = useState({});
    const [itemTotal, setItemTotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [deliveryFee, setDeliveryFee] = useState(60);
    const [totalVendors, setTotalVendors] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [openNewAddrModal, setOpenNewAddrModal] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const getProduct = () => {
            const itemStr = localStorage.getItem('checkout_data');
            if (!itemStr) {
                setCheckoutData([]);
                return;
            }
            const item = JSON.parse(itemStr);
            const prodList = item.checkout_info.flatMap((vendor) => vendor.items);
            setProductList(prodList || []);
            setCheckoutData(item.checkout_info || []);
        };

        const timeout = setTimeout(getProduct, 1000);

        fetchDelAddressHandler();

        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        calculateItemTotal();
        calculateTotalItemsAndDeliveryFee();
    }, [checkoutData]);

    useEffect(() => {
        calculateTotal();
    }, [itemTotal, deliveryFee]);

    const fetchDelAddressHandler = async () => {
        try {
            const res = await getDeliveryAddresstList();

            if (res.success) {
                setSelectedAddress(() => {
                    const defaultAddr = res.address_list.find((addr) => addr.default_address === '1');
                    return defaultAddr ? defaultAddr : res.address_list[0] || {};
                });
                setAddress(res.address_list || []);
            }
        } catch (err) {
            throw new Error(err.message);
        }
    };

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

    const openModalhandler = () => {
        setOpenModal(true);
    };

    const openNewModalHandler = () => {
        setOpenNewAddrModal(true);
    };

    const hideModalHandler = () => {
        setOpenModal(false);
    };

    const refetchDeliveryAddress = (val) => {
        if (val) {
            fetchDelAddressHandler();
        }
    };

    const changeAddressHandler = (addr) => {
        setSelectedAddress(addr);
    };

    const openNewAddrModalHandler = () => {
        setOpenNewAddrModal(true);
    };

    const checkoutHandler = async (val) => {
        const prodToOrder = productList.map((item) => ({
            vendor_product_id: item.vendor_prod_id,
            quantity: item.qty,
            unit_price: item.vendor_products?.price,
            cart_id: item.cart_id
        }));

        try {
            const res = await createOrder({
                order_items: prodToOrder,
                payment_method: val,
                delivery_address: selectedAddress.id
            });
            if (res.success) {
                router.push(`/order/success?id=${res.id}`);
            }
        } catch (err) {
            throw new Error(err.message);
        }
    };

    const closeAddNewAddrsModalHandler = () => {
        fetchDelAddressHandler();

        setOpenNewAddrModal(false);
    };

    const deliveryTypeHandler = (val) => {
        if (val == 'online') {
            setDeliveryFee(60 * Number(totalVendors));
        } else {
            setDeliveryFee(0);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2">
                    <ShippingBilling
                        address={selectedAddress}
                        openModalhandler={openModalhandler}
                        openNewModalHandler={openNewModalHandler}
                    />
                    <PackageOption
                        totalItems={totalItems}
                        totalVendors={totalVendors}
                        deliveryTypeHandler={deliveryTypeHandler}
                    />
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
                        checkoutHandler={checkoutHandler}
                    />
                </div>
            </div>
            {openModal && (
                <ShippingAddressModal
                    isOpen={openModal}
                    onClose={hideModalHandler}
                    isOpenNewModal={openNewAddrModalHandler}
                    deliveryAddress={address}
                    refetchDeliveryAddress={refetchDeliveryAddress}
                    updateAddressHandler={changeAddressHandler}
                />
            )}

            {openNewAddrModal && <AddNewAddress onClose={closeAddNewAddrsModalHandler} />}
        </div>
    );
};

export default CheckoutPage;
