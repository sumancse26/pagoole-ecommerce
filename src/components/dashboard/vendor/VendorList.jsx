'use client';

import { activeVendor } from '@/services/vendor';
import EmptyState from '@components/EmptyState.jsx';
import Image from 'next/image';
import { useEffect, useState, useMemo, useRef } from 'react';
import { useAlert } from '@/context/AlertContext';
import { useRouter } from 'next/navigation';

const VendorList = ({ vendorList = [] }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [previousSearches, setPreviousSearches] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);

    const { showAlert } = useAlert();
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = JSON.parse(localStorage.getItem('vendorSearchHistory') || '[]');
            setPreviousSearches(saved);
        }
    }, []);

    const saveSearch = () => {
        const trimmed = searchQuery.trim();
        if (!trimmed) return;
        const updated = [trimmed, ...previousSearches.filter((q) => q !== trimmed)].slice(0, 10);
        setPreviousSearches(updated);
        localStorage.setItem('vendorSearchHistory', JSON.stringify(updated));
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

    const approvalHandler = async (id) => {
        try {
            const res = await activeVendor(JSON.stringify({ vendor_id: id }));
            if (res.success) {
                router.refresh();
                showAlert(res.message, 'success');
            } else {
                showAlert(res.message, 'error');
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const filteredVendors = useMemo(() => {
        if (!searchQuery) {
            return vendorList;
        }

        const query = searchQuery.toLowerCase();

        return vendorList.filter((vendor) => {
            const vendorName = vendor.store_name?.toLowerCase() || '';

            return vendorName.includes(query);
        });
    }, [vendorList, searchQuery]);

    // The list that will be displayed in the table
    const vendorsToDisplay = searchQuery ? filteredVendors : vendorList;

    return (
        <div className="flex flex-col animate-fadeIn">
            <div className="overflow-x-auto">
                <div className="min-w-full inline-block align-middle">
                    <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-2xl shadow-md overflow-hidden">
                        {/* Header (Title, Search, Button) - RESPONSIVE */}
                        <div className="px-3 sm:px-3 py-3 flex flex-col gap-2xl md:flex-row md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                            {/* 1. Title/Description - Takes full width on small screens, fixed width on md+ */}
                            <div
                                className={`flex items-center text-xl sm:text-2xl font-bold text-gray-800 dark:text-white`}>
                                {/* SVG icon */}
                                <span className="material-icons mr-2 text-green-600 dark:text-green-600">store</span>

                                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Vendor List</h2>
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

                        {/* Table Container - RESPONSIVE: Added 'overflow-x-auto' on the inner div for table scroll on small screens */}
                        {vendorsToDisplay.length > 0 ? (
                            <div className="overflow-auto max-h-[calc(100vh-218px)]">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700 text-sm">
                                        <thead className="bg-gray-100 dark:bg-neutral-700 border-b border-gray-300 dark:border-neutral-600 sticky top-0 z-10">
                                            <tr>
                                                {/* Header Cells with right border (border-r) */}
                                                <th className="px-2 py-3 text-center border-r border-gray-200 dark:border-neutral-600 min-w-[50px]">
                                                    <span className="font-semibold text-xs uppercase tracking-wider text-gray-800 dark:text-neutral-200">
                                                        SL
                                                    </span>
                                                </th>
                                                <th className="px-2 py-3 font-semibold text-xs uppercase tracking-wider text-gray-800 dark:text-neutral-200 text-start border-r border-gray-200 dark:border-neutral-600 min-w-[80px]">
                                                    Image
                                                </th>
                                                <th className="px-2 py-3 font-semibold text-xs uppercase tracking-wider text-gray-800 dark:text-neutral-200 text-start border-r border-gray-200 dark:border-neutral-600 min-w-[150px]">
                                                    Name
                                                </th>
                                                <th className="px-2 py-3 font-semibold text-xs uppercase tracking-wider text-gray-800 dark:text-neutral-200 text-start border-r border-gray-200 dark:border-neutral-600 min-w-[120px]">
                                                    Address
                                                </th>
                                                <th className="px-2 py-3 font-semibold text-xs uppercase tracking-wider text-gray-800 dark:text-neutral-200 text-center border-r border-gray-200 dark:border-neutral-600 min-w-[100px]">
                                                    Status
                                                </th>

                                                {/* Last TH: No border-r */}
                                                <th className="px-1 py-3 font-semibold text-xs uppercase tracking-wider text-gray-800 dark:text-neutral-200 text-center min-w-[100px]">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-300 dark:divide-neutral-700">
                                            {vendorsToDisplay.map((vendor, indx) => (
                                                <tr
                                                    className="group hover:bg-gray-50 dark:hover:bg-neutral-700 transition"
                                                    key={indx}>
                                                    {/* SL Column */}
                                                    <td className="px-2 py-3 text-center font-medium text-gray-800 dark:text-white border-r border-gray-200 dark:border-neutral-700">
                                                        {indx + 1}
                                                    </td>

                                                    {/* Image Column */}
                                                    <td className="px-2 py-2 text-start border-r border-gray-200 dark:border-neutral-700">
                                                        {vendor.store_logo?.length ? (
                                                            <Image
                                                                src={vendor.store_logo}
                                                                width={60}
                                                                height={60}
                                                                alt="Product"
                                                                className="w-10 h-10 rounded-md bg-gray-100"
                                                            />
                                                        ) : (
                                                            <div className="w-10 h-10 rounded-md bg-gray-200 dark:bg-neutral-600"></div>
                                                        )}
                                                    </td>

                                                    <td className="px-2 py-2 text-gray-600 dark:text-neutral-300 text-start border-r border-gray-200 dark:border-neutral-700">
                                                        {vendor.store_name || ''}
                                                    </td>

                                                    {/* Category Column */}
                                                    <td className="px-2 py-2 text-gray-600 dark:text-neutral-300 text-start border-r border-gray-200 dark:border-neutral-700">
                                                        {vendor.address || ''}
                                                    </td>
                                                    <td className="px-2 py-2 text-gray-600 dark:text-neutral-300 text-center border-r border-gray-200 dark:border-neutral-700">
                                                        {vendor.is_active == 1 ? 'Active' : 'Inactive'}
                                                    </td>

                                                    {/* Action Column - Last TD: No border-r, ensured full height to align buttons */}
                                                    <td className="px-1 py-2 h-full">
                                                        <div className="flex items-center justify-center gap-1 flex-wrap max-w-full overflow-hidden">
                                                            {vendor.is_active == 0 && (
                                                                <button
                                                                    onClick={() => approvalHandler(vendor.id)}
                                                                    className="material-icons opacity-0 group-hover:opacity-100 bg-sky-500 hover:bg-sky-700 text-white rounded-full w-7 h-7 flex items-center justify-center text-base transition">
                                                                    approval
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <>
                                {vendorsToDisplay.length === 0 && (
                                    <EmptyState text={searchQuery ? 'No vendors match your search.' : undefined} />
                                )}
                            </>
                        )}

                        {/* Footer - RESPONSIVE */}
                        <div className="px-4 sm:px-6 py-4 flex flex-col gap-3 md:flex-row md:justify-between md:items-center border-t border-gray-200 dark:border-neutral-700">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-neutral-400">
                                    <span className="font-semibold text-gray-800 dark:text-white pe-1">
                                        {vendorsToDisplay.length || 0}
                                    </span>
                                    results
                                </p>
                            </div>

                            {/*                        
                            <div className="inline-flex gap-2">
                                <button
                                    type="button"
                                    className="px-3 py-1.5 inline-flex items-center gap-x-1 text-sm rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 focus:outline-none dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-600">
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24">
                                        <path d="M15 18l-6-6 6-6" />
                                    </svg>
                                    Prev
                                </button>
                                <button
                                    type="button"
                                    className="px-3 py-1.5 inline-flex items-center gap-x-1 text-sm rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 focus:outline-none dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-600">
                                    Next
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24">
                                        <path d="M9 18l6-6-6-6" />
                                    </svg>
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorList;
