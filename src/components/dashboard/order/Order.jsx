'use client';

import { useState } from 'react';
import InvDetails from './OrderDetails';
import EmptyState from '@components/EmptyState.jsx';

const OrderPage = ({ orderList }) => {
    const [showInvoice, setShowInvoice] = useState(false);
    const [invInfo, setInvInfo] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

    const viewBtnHandler = (data) => {
        setShowInvoice(true);
        let total = 0;
        let payable = 0;
        let vat_amount = 0;
        let discount = 0;

        data.order_items?.forEach((item) => {
            total += Number(item.quantity || 0) * Number(item.unit_price || 0);
            vat_amount += Number(item.vendor_products?.products?.vat || 0);
            discount += Number(item.vendor_products?.products?.discount || 0);
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

    // Filtering based on order_code or user_name (case-insensitive)
    const filteredOrders = orderList?.filter((order) => {
        const term = searchTerm.toLowerCase();
        return order.order_code?.toLowerCase()?.includes(term) || order.users?.user_name?.toLowerCase()?.includes(term);
    });

    return (
        <div className="p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-green-600">
                    <span className="material-icons text-3xl">receipt_long</span>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Order List</h2>
                </div>

                <div className="relative w-[60%]">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by name or category..."
                        className="py-2 px-3 ps-10 block w-full border border-gray-200 rounded-lg text-sm 
                                   focus:border-green-500 focus:ring-0 focus:outline-none
                                   disabled:opacity-50 disabled:pointer-events-none 
                                   dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500"
                    />
                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                        <svg
                            className="w-4 h-4 text-gray-400 dark:text-neutral-500"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200">
                {filteredOrders?.length > 0 ? (
                    <table className="min-w-full text-xs sm:text-sm text-left">
                        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                            <tr>
                                <th className="px-4 sm:px-5 py-3 font-semibold border-r border-gray-200">SL</th>
                                <th className="px-4 sm:px-5 py-3 font-semibold border-r border-gray-200">Inv No</th>
                                <th className="px-4 sm:px-5 py-3 font-semibold border-r border-gray-200">Inv By</th>
                                <th className="px-4 sm:px-5 py-3 font-semibold text-end border-r border-gray-200">
                                    Total
                                </th>
                                <th className="px-4 sm:px-5 py-3 font-semibold text-end border-r border-gray-200">
                                    Collection
                                </th>
                                <th className="px-4 sm:px-5 py-3 font-semibold border-r border-gray-200">Status</th>
                                <th className="px-4 sm:px-5 py-3 font-semibold text-end">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredOrders.map((order, index) => (
                                <tr key={index} className="hover:bg-gray-50 group transition">
                                    <td className="px-4 sm:px-5 py-3 text-gray-700 border-r border-gray-200">
                                        {index + 1}
                                    </td>
                                    <td className="px-4 sm:px-5 py-3 text-gray-700 border-r border-gray-200">
                                        {order.order_code || ''}
                                    </td>
                                    <td className="px-4 sm:px-5 py-3 text-gray-700 border-r border-gray-200">
                                        {order.users?.user_name || ''}
                                    </td>
                                    <td className="px-4 sm:px-5 py-3 text-gray-700 text-end border-r border-gray-200">
                                        {order.total_amount || 0}
                                    </td>
                                    <td className="px-4 sm:px-5 py-3 text-gray-700 text-end border-r border-gray-200">
                                        {order.collection || 0}
                                    </td>
                                    <td className="px-4 sm:px-5 py-3 border-r border-gray-200">
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
                                            className="opacity-0 group-hover:opacity-100 bg-blue-500 hover:bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition"
                                            title="Approve Order">
                                            <span className="material-icons">edit</span>
                                        </button>
                                        <button
                                            className="opacity-0 group-hover:opacity-100 bg-green-600 hover:bg-green-700 text-white rounded-full w-8 h-8 flex items-center justify-center transition"
                                            title="collection">
                                            <span className="material-icons">money</span>
                                        </button>
                                        <button
                                            onClick={() => viewBtnHandler(order)}
                                            className="opacity-0 group-hover:opacity-100 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full w-8 h-8 flex items-center justify-center transition"
                                            title="View Order Details">
                                            <span className="material-icons text-sm">visibility</span>
                                        </button>
                                        <button
                                            className="opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition"
                                            title="Delete Order">
                                            <span className="material-icons text-sm">delete</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <>
                        <EmptyState />
                    </>
                )}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-xs sm:text-sm text-gray-600 gap-3">
                <p>
                    Showing <span className="font-bold">{filteredOrders?.length || 0}</span> entries
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
