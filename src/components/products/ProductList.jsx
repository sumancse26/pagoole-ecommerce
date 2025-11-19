'use client';

import { useDialog } from '@/context/DialogContext';
import { useApiLoader } from '@/lib/useApiLoader';
import EmptyState from '@components/EmptyState.jsx';
import Image from 'next/image';
import { useEffect, useState, useMemo, useRef } from 'react';
import AddProduct from './AddProducts';
import { approveProduct } from '@/services/product';
import { useAlert } from '@/context/AlertContext';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const ProductList = ({ prodList, categoryList, brandList, uomList }) => {
    const [showModal, setShowModal] = useState(false);
    const [productList, setProductList] = useState(prodList);
    const [category, setCategory] = useState([]);
    const [brands, setBrands] = useState([]);
    const [weights, weightsList] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [previousSearches, setPreviousSearches] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);

    const { start, stop } = useApiLoader();
    const { openDialog } = useDialog();
    const { showAlert } = useAlert();
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        setProductList(prodList);
        setCategory(categoryList);
        setBrands(brandList);
        weightsList(uomList);
    }, [prodList, categoryList, brandList, uomList]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = JSON.parse(localStorage.getItem('searchHistory') || '[]');
            setPreviousSearches(saved);
        }
    }, []);

    const saveSearch = () => {
        const trimmed = searchQuery.trim();
        if (!trimmed) return;
        const updated = [trimmed, ...previousSearches.filter((q) => q !== trimmed)].slice(0, 10);
        setPreviousSearches(updated);
        localStorage.setItem('searchHistory', JSON.stringify(updated));
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

    const handleSubmit = async (value) => setShowModal(value);

    const updateProductHandler = (val) => {
        setSelectedProduct(val);
        setShowModal(true);
    };

    const approvalHandler = async (id) => {
        try {
            const res = await approveProduct(JSON.stringify({ id }));
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

    const openProductModal = () => {
        setShowModal(true);
        setSelectedProduct({});
    };

    const deleteProductHandler = async (id) => {
        try {
            await openDialog('You want to delete ?', { type: 'confirm' });
            start();
            const res = { success: true, message: 'Product deleted successfully' };

            if (res.success) {
                const filteredList = productList.filter((p) => p.id !== id);
                setProductList(filteredList);
                await openDialog(res.message, { type: 'success' });
            } else {
                await openDialog(res.message, { type: 'error' });
            }
            stop();
        } catch (err) {
            stop();
            console.log(err.message);
        }
    };

    const filteredProducts = useMemo(() => {
        if (!searchQuery) return productList;
        const query = searchQuery.toLowerCase();
        return productList.filter((product) => {
            const prodName = product?.products?.prod_name?.toLowerCase() || '';
            const categoryName = product?.products?.categories?.category_name?.toLowerCase() || '';
            return prodName.includes(query) || categoryName.includes(query);
        });
    }, [productList, searchQuery]);

    const productsToDisplay = searchQuery ? filteredProducts : productList;

    return (
        <>
            <div className="flex flex-col animate-fadeIn  overflow-hidden">
                <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-2xl shadow-md overflow-hidden">
                    {/* Header */}
                    <div className="px-3 sm:px-3 py-3 flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center border-b border-gray-200 dark:border-neutral-700">
                        <div
                            className={`flex items-center text-xl sm:text-2xl font-bold text-gray-800 dark:text-white`}>
                            {/* SVG icon */}
                            <span className="material-icons mr-2 text-green-600 dark:text-green-600">
                                shopping_cart
                            </span>

                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Product List</h2>
                        </div>

                        {/* Search Input */}
                        <div className="relative w-full sm:w-[60%]" ref={dropdownRef}>
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

                        {/* Add Product Button */}
                        <button
                            onClick={openProductModal}
                            className="cursor-pointer w-full sm:w-auto inline-flex items-center justify-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-green-400 to-green-600 hover:from-green-700 hover:to-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 transition">
                            <span className="cursor-pointer material-icons text-base">add</span>
                            Add Product
                        </button>
                    </div>

                    {/* Table */}
                    {productsToDisplay.length > 0 ? (
                        <div className="overflow-x-auto max-h-[calc(100vh-217px)]">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-16 border-r border-gray-200">
                                            SL No.
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-r border-gray-200">
                                            Image
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-r border-gray-200">
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-r border-gray-200">
                                            Category
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider border-r border-gray-200">
                                            Price (TK)
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider border-r border-gray-200">
                                           Stock
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider w-24 border-r border-gray-200">
                                            Status
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider w-32">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white divide-y divide-gray-100">
                                    {productsToDisplay.map((product, indx) => (
                                        <tr key={indx} className=" group hover:bg-gray-50  transition">
                                            <td className="px-2 py-3 text-center font-medium text-gray-800 dark:text-white border-r border-gray-200">
                                                {indx + 1}
                                            </td>
                                            <td className="px-2 py-2 border-r border-gray-200">
                                                {product?.products?.product_images?.length ? (
                                                    <Image
                                                        src={product?.products?.product_images?.[0]?.file_name}
                                                        width={60}
                                                        height={60}
                                                        alt="Product"
                                                        className="w-20 h-15 rounded-md bg-gray-100"
                                                    />
                                                ) : (
                                                    <div className="w-20 h-15 rounded-md bg-gray-200 dark:bg-neutral-600"></div>
                                                )}
                                            </td>
                                            <td className="px-2 py-2 text-gray-600 dark:text-neutral-300 border-r border-gray-200">
                                                {product?.products?.prod_name || ''}
                                            </td>
                                            <td className="px-2 py-2 text-gray-600 dark:text-neutral-300 border-r border-gray-200">
                                                {product?.products?.categories?.category_name || ''}
                                            </td>
                                            <td className="px-2 py-2 text-gray-600 dark:text-neutral-300 text-end border-r border-gray-200">
                                                {product?.price || 0}
                                            </td>
                                            <td className="px-2 py-2 text-gray-600 dark:text-neutral-300 text-end border-r border-gray-200">
                                                {product.stock_qty || 0}
                                            </td>
                                            <td className="px-2 py-2 text-gray-600 dark:text-neutral-300 text-center border-r border-gray-200 text-center ">
                                                <span className={`${product.is_active == 1 ? 'bg-green-100 text-green-700' : 'bg-rose-100 text-rose-700'}`}>{product.is_active == 1 ? 'Active' : 'Inactive' }</span>
                                            </td>


                                            <td className="px-1 py-2 text-gray-600 dark:text-neutral-300 text-end border-r border-gray-200 overflow-hidden">
                                                <div className="flex items-center justify-center gap-1">
                                                    {product.is_active == 0 && session?.user?.role == 0 && (
                                                        <span
                                                            onClick={() => approvalHandler(product.id)}
                                                            className="cursor-pointer material-icons opacity-0 group-hover:opacity-100 rounded-full bg-blue-500 hover:bg-blue-600 text-white w-[30px] h-[30px] leading-[30px] !text-center flex items-center justify-center !text-base">
                                                            approval
                                                        </span>
                                                    )}
                                                    <span
                                                        onClick={() => updateProductHandler(product)}
                                                        className="cursor-pointer material-icons opacity-0 group-hover:opacity-100 rounded-full bg-green-500 hover:bg-green-600 text-white w-[30px] h-[30px] leading-[30px] text-center flex items-center justify-center !text-base">
                                                        edit
                                                    </span>
                                                    <span
                                                        onClick={() => deleteProductHandler(product.id)}
                                                        className="cursor-pointer material-icons opacity-0 group-hover:opacity-100 rounded-full bg-red-500 hover:bg-red-600 text-white w-[30px] h-[30px] leading-[30px] text-center flex items-center justify-center !text-base">
                                                        delete
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <EmptyState text={searchQuery ? 'No products match your search.' : undefined} />
                    )}

                    {/* Footer */}

                    <div className="px-2 sm:px-2 py-2 flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center border-t border-gray-200 dark:border-neutral-700">
                        <p className="text-sm text-gray-600 dark:text-neutral-400">
                            <span className="font-semibold text-gray-800 dark:text-white pe-1">
                                {productsToDisplay.length || 0}
                            </span>
                            results
                        </p>
                    </div>
                </div>
            </div>

            {showModal && (
                <AddProduct
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    categoryList={category}
                    handleSubmit={handleSubmit}
                    selectedProduct={selectedProduct}
                    brands={brands}
                    uomList={weights}
                />
            )}
        </>
    );
};

export default ProductList;
