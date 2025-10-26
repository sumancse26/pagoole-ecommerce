'use client';

import { useEffect, useState } from 'react';
import DashboardSkeleton from './DashboardSkeleton';
import { getSession } from 'next-auth/react';

// === 🧩 ICONS === //
const UserIcon = () => (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M7 21v-2a4 4 0 0 1 3-3.87" />
        <path d="M12 7a4 4 0 1 1 0 8a4 4 0 0 1 0-8z" />
    </svg>
);

const ProductIcon = () => (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M20 6H4v12h16V6z" />
        <path d="M22 6L12 13 2 6" />
    </svg>
);

const InvoiceIcon = () => (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
    </svg>
);

const TruckIcon = () => (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M3 3h13v13H3z" />
        <path d="M16 8h5l-2-3h-3z" />
        <circle cx="7.5" cy="16.5" r="1.5" />
        <circle cx="17.5" cy="16.5" r="1.5" />
    </svg>
);

const CheckIcon = () => (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
        <path d="M5 13l4 4L19 7" />
    </svg>
);

const ReturnIcon = () => (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M3 7v6h6" />
        <path d="M21 17A9 9 0 1 1 9 3" />
    </svg>
);

const CancelIcon = () => (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
        <path d="M18 6L6 18M6 6l12 12" />
    </svg>
);

const SaleIcon = () => (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 8c-1.333 0-4 1-4 4s2.667 4 4 4 4-1 4-4-2.667-4-4-4z" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
);

const RefundIcon = () => (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 8v8M8 12h8" />
        <path d="M21 12a9 9 0 1 1-9-9v3l4-4-4-4v3a12 12 0 1 0 12 12h-3z" />
    </svg>
);

const DeliveryIcon = () => (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M3 3h13v8H3z" />
        <path d="M16 8h5l-2-3h-3z" />
        <circle cx="7.5" cy="16.5" r="1.5" />
        <circle cx="17.5" cy="16.5" r="1.5" />
    </svg>
);

const MoneyIcon = () => (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M12 8v8M8 12h8" />
    </svg>
);

const Dashboard = ({ dashboardInfo }) => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        dashboardInfoHandler();
    }, []);

    const dashboardInfoHandler = async () => {
        try {
            const newSession = await getSession();

            const cards = [
                ...(newSession?.user?.role === 0
                    ? [
                          {
                              label: 'Total Vendors',
                              value: dashboardInfo.total_users || 0,
                              tooltip: 'Number of all vendors',
                              color: 'bg-blue-600',
                              icon: <UserIcon />
                          }
                      ]
                    : []),

                {
                    label: 'Products',
                    value: dashboardInfo.total_products || 0,
                    tooltip: 'Total vendor products',
                    color: 'bg-green-600',
                    icon: <ProductIcon />
                },

                {
                    label: 'Pending Orders',
                    value: dashboardInfo.order_counts?.Pending || 0,
                    tooltip: 'Orders placed but not confirmed or paid yet',
                    color: 'bg-gray-500',
                    icon: <InvoiceIcon />
                },

                {
                    label: 'Processing Orders',
                    value: dashboardInfo.order_counts?.Processing || 0,
                    tooltip: 'Payment confirmed; preparing for shipment',
                    color: 'bg-yellow-500',
                    icon: <InvoiceIcon />
                },

                {
                    label: 'Shipped Orders',
                    value: dashboardInfo.order_counts?.Shipped || 0,
                    tooltip: 'Orders handed over to courier',
                    color: 'bg-blue-500',
                    icon: <TruckIcon />
                },

                {
                    label: 'In Transit Orders',
                    value: dashboardInfo.order_counts?.['In Transit'] || 0,
                    tooltip: 'Orders currently on the way',
                    color: 'bg-sky-500',
                    icon: <TruckIcon />
                },

                {
                    label: 'Out for Delivery',
                    value: dashboardInfo.order_counts?.['Out for Delivery'] || 0,
                    tooltip: 'Courier is about to deliver the package',
                    color: 'bg-cyan-500',
                    icon: <DeliveryIcon />
                },

                {
                    label: 'Delivered Orders',
                    value: dashboardInfo.order_counts?.Delivered || 0,
                    tooltip: 'Orders successfully delivered',
                    color: 'bg-green-500',
                    icon: <CheckIcon />
                },

                {
                    label: 'Completed Orders',
                    value: dashboardInfo.order_counts?.Completed || 0,
                    tooltip: 'Transactions fully completed and closed',
                    color: 'bg-emerald-600',
                    icon: <CheckIcon />
                },

                {
                    label: 'Returned Orders',
                    value: dashboardInfo.order_counts?.Returned || 0,
                    tooltip: 'Orders returned by customers',
                    color: 'bg-orange-500',
                    icon: <ReturnIcon />
                },

                {
                    label: 'Refunded Orders',
                    value: dashboardInfo.order_counts?.Refunded || 0,
                    tooltip: 'Payments refunded to customers',
                    color: 'bg-indigo-500',
                    icon: <RefundIcon />
                },

                {
                    label: 'Cancelled Orders',
                    value: dashboardInfo.order_counts?.Cancelled || 0,
                    tooltip: 'Orders cancelled by admin or user',
                    color: 'bg-red-600',
                    icon: <CancelIcon />
                },

                {
                    label: 'Total Sale',
                    value: dashboardInfo.total_order_amount || 0,
                    tooltip: 'Total revenue generated from all orders',
                    color: 'bg-teal-600',
                    icon: <SaleIcon />
                },

                {
                    label: 'Total Returned Amount',
                    value: dashboardInfo.order_amounts?.Returned || 0,
                    tooltip: 'Sum of all returned orders amount',
                    color: 'bg-orange-600',
                    icon: <ReturnIcon />
                },

                {
                    label: 'Total Completed Amount',
                    value: dashboardInfo.order_amounts?.Completed || 0,
                    tooltip: 'Sum of all completed orders amount',
                    color: 'bg-emerald-700',
                    icon: <MoneyIcon />
                }
            ];

            setCards(cards);
        } catch (err) {
            console.log(err.message);
        }
    };

    if (!dashboardInfo) return <DashboardSkeleton />;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cards?.map((card, idx) => (
                <div
                    key={idx}
                    className="flex items-center justify-between p-4 sm:p-5 rounded-2xl shadow-md bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 transition hover:shadow-lg">
                    <div className="flex-1">
                        <div className="text-sm font-medium text-gray-500 dark:text-neutral-400 uppercase tracking-wide flex items-center gap-1">
                            {card.label}
                            {card.tooltip && (
                                <div className="group relative cursor-pointer">
                                    <svg
                                        className="w-4 h-4 text-gray-400 dark:text-neutral-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                        <path d="M12 17h.01" />
                                    </svg>
                                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block text-xs text-white bg-gray-900 dark:bg-neutral-700 px-2 py-1 rounded shadow">
                                        {card.tooltip}
                                    </div>
                                </div>
                            )}
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mt-1 sm:mt-2">
                            {card.value}
                        </h3>
                    </div>
                    <div className={`ml-4 p-3 sm:p-4 rounded-full ${card.color} flex items-center justify-center`}>
                        {card.icon}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Dashboard;
