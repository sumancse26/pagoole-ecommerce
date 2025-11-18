'use client';

import { useDialog } from '@/context/DialogContext';
import { useApiLoader } from '@/lib/useApiLoader';
import { useAlert } from '@/context/AlertContext';
import { useEffect, useState, useRef } from 'react';
import InvDetails from './OrderDetails';
import EmptyState from '@components/EmptyState.jsx';
import { updateOrderStatus } from '@/services/order.js';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const OrderPage = ({ orderList }) => {
    const [showInvoice, setShowInvoice] = useState(false);
    const [invInfo, setInvInfo] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [previousSearches, setPreviousSearches] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);

    const { showAlert } = useAlert();
    const router = useRouter();
    const { openDialog } = useDialog();
    const { start, stop } = useApiLoader();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = JSON.parse(localStorage.getItem('orderSearchHistory') || '[]');
            setPreviousSearches(saved);
        }
    }, []);

    const saveSearch = () => {
        const trimmed = searchQuery.trim();
        if (!trimmed) return;
        const updated = [trimmed, ...previousSearches.filter((q) => q !== trimmed)].slice(0, 10);
        setPreviousSearches(updated);
        localStorage.setItem('orderSearchHistory', JSON.stringify(updated));
    };

    const handleSearchSubmit = (e) => {
        e?.preventDefault();
        saveSearch();
        setShowDropdown(false);
    };

    // Auto-submit when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target) &&
                inputRef.current &&
                !inputRef.current.contains(e.target)
            ) {
                saveSearch();
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    });

    const viewBtnHandler = (data) => {
        setShowInvoice(true);
        let total = 0;
        let payable = 0;
        //let vat_amount = 0;
        //let discount = 0;

        data.order_items?.forEach((item) => {
            total += Number(item.quantity || 0) * Number(item.unit_price || 0);
            // vat_amount += Number(item.vendor_products?.products?.vat || 0);
            //discount += Number(item.vendor_products?.products?.discount || 0);
        });

        payable = total;
        // payable = total + vat_amount - discount;

        const invData = {
            ...data,
            total,
            payable
            //vat_amount,
            //discount
        };

        setInvInfo(invData);
    };

    const filteredOrders = orderList?.filter((order) => {
        const term = searchQuery.toLowerCase();
        return order.order_code?.toLowerCase()?.includes(term) || order.users?.user_name?.toLowerCase()?.includes(term);
    });

    const approvalOrderHandler = async (data, action, type) => {
        try {
            await openDialog('You want to update ?', { type: 'confirm' });
            start();
            const params = {
                id: data.id,
                action,
                type
            };
            const res = await updateOrderStatus(params);
            // showAlert(res.message, 'success');
            if (res.success) {
                await openDialog(res.message, { type: 'success' });
                router.refresh();
            } else {
                await openDialog(res.message, { type: 'error' });
            }
            stop();
        } catch (err) {
            showAlert('Something went wrong', 'error');
        }
    };

    return (
        <div className="p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-green-600">
                    <span className="material-icons text-3xl">receipt_long</span>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Order List</h2>
                </div>

                <div className="relative w-full sm:w-[80%]" ref={dropdownRef}>
                    <form onSubmit={handleSearchSubmit}>
                        <input
                            ref={inputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setShowDropdown(true)}
                            placeholder="Search by name or category..."
                            className="py-2 px-3 ps-10 w-full border border-gray-200 rounded-lg text-sm 
                                        focus:border-green-500 focus:outline-none focus:ring-0
                                        dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500"
                        />
                    </form>

                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                        <svg
                            className="w-4 h-4 text-gray-400 dark:text-neutral-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                    </div>

                    {/* Dropdown */}
                    {showDropdown && previousSearches.length > 0 && (
                        <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 dark:bg-neutral-900 dark:border-neutral-700">
                            {previousSearches
                                .filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase()))
                                .map((item, idx) => (
                                    <li
                                        key={idx}
                                        onClick={() => {
                                            setSearchQuery(item);
                                            saveSearch();
                                            setShowDropdown(false);
                                        }}
                                        className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800">
                                        {item}
                                    </li>
                                ))}
                        </ul>
                    )}
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
                                            className={`px-2 py-1 text-xs font-medium rounded-full ${order.order_status === 'Pending'
                                                ? 'bg-amber-100 text-amber-700'
                                                : order.order_status === 'Processing'
                                                    ? 'bg-blue-100 text-blue-700'
                                                    : order.order_status === 'Shipped'
                                                        ? 'bg-indigo-100 text-indigo-700'
                                                        : order.order_status === 'InTransit'
                                                            ? 'bg-cyan-100 text-cyan-700'
                                                            : order.order_status === 'OutForDelivery'
                                                                ? 'bg-sky-100 text-sky-700'
                                                                : order.order_status === 'Delivered'
                                                                    ? 'bg-green-100 text-green-700'
                                                                    : order.order_status === 'Cancelled'
                                                                        ? 'bg-red-100 text-red-700'
                                                                        : order.order_status === 'Returned'
                                                                            ? 'bg-rose-100 text-rose-700'
                                                                            : order.order_status === 'Completed'
                                                                                ? 'bg-emerald-100 text-emerald-700'
                                                                                : 'bg-gray-100 text-gray-700'
                                                }
                                            }`}>
                                            {order.order_status || ''}
                                        </span>
                                    </td>
                                    <td className="px-4 sm:px-5 py-3 flex items-center justify-end gap-2 sm:gap-3">
                                        {/* <button
                                            className="opacity-0 group-hover:opacity-100 bg-green-600 hover:bg-green-700 text-white rounded-full w-8 h-8 flex items-center justify-center transition"
                                            title="collection">
                                            <span className="material-icons">money</span>
                                        </button> */}

                                        {session?.user.role === 0 && (
                                            <>
                                                {order.order_status?.toLowerCase() != 'completed' &&
                                                    order.order_status?.toLowerCase() != 'returned' &&
                                                    order.order_status?.toLowerCase() != 'cancelled' && (
                                                        <button
                                                            onClick={() => approvalOrderHandler(order, 2, '')}
                                                            className="cursor-pointer opacity-0 group-hover:opacity-100 bg-blue-500 hover:bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition"
                                                            title="Update Status">
                                                            <span className="material-icons">done</span>
                                                        </button>
                                                    )}
                                                {order.order_status?.toLowerCase() !== 'returned' &&
                                                    order.order_status?.toLowerCase() !== 'cancelled' && (
                                                        <button
                                                            onClick={() => approvalOrderHandler(order, 1, 'Returned')}
                                                            className="cursor-pointer opacity-0 group-hover:opacity-100 bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center transition"
                                                            title="Return">
                                                            <span className="material-icons">u_turn_left</span>
                                                        </button>
                                                    )}

                                                {order.order_status?.toLowerCase() !== 'cancelled' &&
                                                    order.order_status?.toLowerCase() !== 'returned' && (
                                                        <button
                                                            onClick={() => approvalOrderHandler(order, 1, 'Cancelled')}
                                                            className="cursor-pointer opacity-0 group-hover:opacity-100 bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center transition"
                                                            title="Cancel">
                                                            <span className="material-icons">cancel</span>
                                                        </button>
                                                    )}
                                            </>
                                        )}

                                        <button
                                            onClick={() => viewBtnHandler(order)}
                                            className="cursor-pointer opacity-0 group-hover:opacity-100 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full w-8 h-8 flex items-center justify-center transition"
                                            title="View Order Details">
                                            <span className="material-icons text-sm">visibility</span>
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
                {/* <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 px-3 sm:px-4 py-1 rounded-full bg-green-100 hover:bg-green-200 transition disabled:opacity-50">
                        <span className="material-icons text-sm">chevron_left</span>
                        Prev
                    </button>
                    <button className="flex items-center gap-1 px-3 sm:px-4 py-1 rounded-full bg-green-100 hover:bg-green-200 transition disabled:opacity-50">
                        Next
                        <span className="material-icons text-sm">chevron_right</span>
                    </button>
                </div> */}
            </div>

            {showInvoice && <InvDetails closeModalHandler={() => setShowInvoice(false)} invInfo={invInfo} />}
        </div>
    );
};

export default OrderPage;
