'use client';

import { useState } from 'react';
import InvDetails from './OrderDetails';

const OrderPage = ({ orderList }) => {
    const [showInvoice, setShowInvoice] = useState(false);
    const [invInfo, setInvInfo] = useState({});

    const viewBtnHandler = (data) => {
        setShowInvoice(true);
        let total = 0;
        let payable = 0;
        let vat_amount = 0;
        let discount = 0;
        data.order_items?.forEach((item) => {
            total = total + Number(item.quantity || 0) * Number(item.unit_price || 0);
            vat_amount = vat_amount + Number(item.vendor_products?.products?.vat || 0);
            discount = discount + Number(item.vendor_products?.products?.discount || 0);
        });
        payable = total + vat_amount - discount;
        const invData = {
            ...data,
            total,
            payable,
            vat_amount,
            discount
        };
        setInvInfo(invData);
    };
    return (
        <div className="p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-green-600">
                    <span className="material-icons text-3xl">receipt_long</span>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Order List</h2>
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full text-xs sm:text-sm text-left">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                        <tr>
                            <th className="px-4 sm:px-5 py-3 font-semibold">SL</th>
                            <th className="px-4 sm:px-5 py-3 font-semibold">Inv No</th>
                            <th className="px-4 sm:px-5 py-3 font-semibold">Inv By</th>
                            {/* <th className="px-4 sm:px-5 py-3 font-semibold text-end">Discount</th>
                            <th className="px-4 sm:px-5 py-3 font-semibold text-end">Vat</th> */}
                            <th className="px-4 sm:px-5 py-3 font-semibold text-end">Total</th>
                            <th className="px-4 sm:px-5 py-3 font-semibold text-end">Collection</th>
                            <th className="px-4 sm:px-5 py-3 font-semibold">Status</th>
                            <th className="px-4 sm:px-5 py-3 font-semibold text-end">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {orderList?.length > 0 &&
                            orderList?.map((order, index) => (
                                <tr key={index} className="hover:bg-gray-50 group transition">
                                    <td className="px-4 sm:px-5 py-3 text-gray-700">{index + 1}</td>
                                    <td className="px-4 sm:px-5 py-3 text-gray-700">{order.order_code || ''}</td>
                                    <td className="px-4 sm:px-5 py-3 text-gray-700">{order.users?.user_name || ''}</td>
                                    {/* <td className="px-4 sm:px-5 py-3 text-gray-700 text-end">50</td>
                                    <td className="px-4 sm:px-5 py-3 text-gray-700 text-end">20</td> */}
                                    <td className="px-4 sm:px-5 py-3 text-gray-700 text-end">
                                        {order.total_amount || 0}
                                    </td>
                                    <td className="px-4 sm:px-5 py-3 text-gray-700 text-end">
                                        {order.collection || 0}
                                    </td>
                                    <td className="px-4 sm:px-5 py-3">
                                        <span
                                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                order.payment_status === 'unpaid'
                                                    ? 'bg-red-100 text-red-700'
                                                    : order.payment_status === 'paid'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {order.payment_status || ''}
                                        </span>
                                    </td>
                                    <td className="px-4 sm:px-5 py-3 flex items-center justify-end gap-2 sm:gap-3">
                                        <button
                                            className="opacity-0 group-hover:opacity-100 bg-green-600 hover:bg-green-700 text-white rounded-full w-8 h-8 flex items-center justify-center transition"
                                            title="collection">
                                            <span className="material-icons ">money</span>
                                        </button>
                                        <button
                                            onClick={() => viewBtnHandler(order)}
                                            className="opacity-0 group-hover:opacity-100 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full w-8 h-8 flex items-center justify-center transition"
                                            title="View">
                                            <span className="material-icons text-sm">visibility</span>
                                        </button>
                                        <button
                                            className="opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition"
                                            title="Delete">
                                            <span className="material-icons text-sm">delete</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-xs sm:text-sm text-gray-600 gap-3">
                <p>
                    Showing <span className="font-bold">{orderList?.length || 0}</span> entries
                </p>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 px-3 sm:px-4 py-1 rounded-full bg-green-100 hover:bg-green-200 transition disabled:opacity-50">
                        <span className="material-icons text-sm">chevron_left</span>
                        Prev
                    </button>
                    <button className="flex items-center gap-1 px-3 sm:px-4 py-1 rounded-full bg-green-100 hover:bg-green-200 transition disabled:opacity-50">
                        Next
                        <span className="material-icons text-sm">chevron_right</span>
                    </button>
                </div>
            </div>

            {showInvoice && <InvDetails closeModalHandler={() => setShowInvoice(false)} invInfo={invInfo} />}
        </div>
    );
};

export default OrderPage;
