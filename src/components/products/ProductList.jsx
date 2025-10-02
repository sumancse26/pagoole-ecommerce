'use client';

import { useDialog } from '@/context/DialogContext';
import { useApiLoader } from '@/lib/useApiLoader';

import EmptyState from '@components/EmptyState.jsx';
import Image from 'next/image';
import { useEffect, useState, useMemo } from 'react';
import AddProduct from './AddProducts';

const ProductList = ({ prodList, categoryList, brandList, uomList }) => {
    const [showModal, setShowModal] = useState(false);
    const [productList, setProductList] = useState(prodList);
    const [category, setCategory] = useState([]);
    const [brands, setBrands] = useState([]);
    const [weights, weightsList] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({});

    const [searchQuery, setSearchQuery] = useState('');

    const { start, stop } = useApiLoader();
    const { openDialog } = useDialog();

    useEffect(() => {
        setProductList(prodList);
        setCategory(categoryList);
        setBrands(brandList);
        weightsList(uomList);
        return () => {};
    }, [prodList, categoryList, brandList, uomList]);

    const handleSubmit = async (value) => {
        setShowModal(value);
    };

    const updateProductHandler = (val) => {
        setSelectedProduct(val);
        setShowModal(true);
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
                const filteredList = productList.filter((p) => p.id != id);
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

    // LOGIC: Filter product list based on search query
    const filteredProducts = useMemo(() => {
        if (!searchQuery) {
            return productList;
        }

        const query = searchQuery.toLowerCase();

        return productList.filter((product) => {
            const prodName = product?.products?.prod_name?.toLowerCase() || '';
            const categoryName = product?.products?.categories?.category_name?.toLowerCase() || '';

            return prodName.includes(query) || categoryName.includes(query);
        });
    }, [productList, searchQuery]);

    // The list that will be displayed in the table
    const productsToDisplay = searchQuery ? filteredProducts : productList;

    return (
        <>
            <div className="flex flex-col animate-fadeIn">
                <div className="m-2 overflow-x-auto">
                    <div className="p-2 min-w-full inline-block align-middle">
                        <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-2xl shadow-md overflow-hidden">
                            {/* Header (Title, Search, Button) - RESPONSIVE */}
                            <div className="px-4 sm:px-6 py-4 flex flex-col gap-2xl md:flex-row md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                                {/* 1. Title/Description - Takes full width on small screens, fixed width on md+ */}
                                <div className="w-[20%] md:w-auto">
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Products</h2>
                                    <p className="text-sm text-gray-500 dark:text-neutral-400">
                                        Manage your products here.
                                    </p>
                                </div>

                                {/* 2. Search & Button - MODIFIED FOR CENTER ALIGNMENT on md+ */}
                                <div className="md:w-[80%] flex flex-col sm:flex-row gap-3 md:justify-between md:items-center">
                                    {/* Search Input - Flex-grow to fill available space */}
                                    <div className="relative flex-grow w-[85%]">
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search by name or category..."
                                            className="py-2 px-3 ps-10 block w-full border border-gray-200 rounded-lg text-sm 
               focus:border-green-500 focus:outline-none focus:ring-0
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

                                    {/* Add Product Button - Full width on smallest screen, auto-width on sm+ */}
                                    <button
                                        onClick={openProductModal}
                                        // Made button full width on mobile, auto width on sm+
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-green-400 to-green-600 hover:from-green-700 hover:to-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 transition">
                                        <span className="material-icons text-base">add</span>
                                        Add Product
                                    </button>
                                </div>
                            </div>

                            {/* Table Container - RESPONSIVE: Added 'overflow-x-auto' on the inner div for table scroll on small screens */}
                            {productsToDisplay.length > 0 ? (
                                <div className="overflow-auto max-h-[calc(100vh-300px)]">
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700 text-sm">
                                            <thead className="bg-gray-100 dark:bg-neutral-700 border-b border-gray-300 dark:border-neutral-600 sticky top-0 z-10">
                                                <tr>
                                                    {/* Header Cells with right border (border-r) */}
                                                    <th className="px-3 py-3 text-center border-r border-gray-200 dark:border-neutral-600 min-w-[50px]">
                                                        <span className="font-semibold text-xs uppercase tracking-wider text-gray-800 dark:text-neutral-200">
                                                            SL
                                                        </span>
                                                    </th>
                                                    <th className="px-3 py-3 font-semibold text-xs uppercase tracking-wider text-gray-800 dark:text-neutral-200 text-start border-r border-gray-200 dark:border-neutral-600 min-w-[80px]">
                                                        Image
                                                    </th>
                                                    <th className="px-3 py-3 font-semibold text-xs uppercase tracking-wider text-gray-800 dark:text-neutral-200 text-start border-r border-gray-200 dark:border-neutral-600 min-w-[150px]">
                                                        Name
                                                    </th>
                                                    <th className="px-3 py-3 font-semibold text-xs uppercase tracking-wider text-gray-800 dark:text-neutral-200 text-start border-r border-gray-200 dark:border-neutral-600 min-w-[120px]">
                                                        Category
                                                    </th>
                                                    <th className="px-3 py-3 font-semibold text-xs uppercase tracking-wider text-gray-800 dark:text-neutral-200 text-end border-r border-gray-200 dark:border-neutral-600 min-w-[100px]">
                                                        Price (TK)
                                                    </th>
                                                    <th className="px-3 py-3 font-semibold text-xs uppercase tracking-wider text-gray-800 dark:text-neutral-200 text-end border-r border-gray-200 dark:border-neutral-600 min-w-[80px]">
                                                        Stock
                                                    </th>
                                                    <th className="px-3 py-3 font-semibold text-xs uppercase tracking-wider text-gray-800 dark:text-neutral-200 text-center border-r border-gray-200 dark:border-neutral-600 min-w-[80px]">
                                                        VAT (%)
                                                    </th>
                                                    <th className="px-3 py-3 font-semibold text-xs uppercase tracking-wider text-gray-800 dark:text-neutral-200 text-end border-r border-gray-200 dark:border-neutral-600 min-w-[120px]">
                                                        Discount (TK)
                                                    </th>

                                                    {/* Last TH: No border-r */}
                                                    <th className="px-3 py-3 font-semibold text-xs uppercase tracking-wider text-gray-800 dark:text-neutral-200 text-center min-w-[100px]">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-300 dark:divide-neutral-700">
                                                {productsToDisplay.map((product, indx) => (
                                                    <tr
                                                        className="group hover:bg-gray-50 dark:hover:bg-neutral-700 transition"
                                                        key={indx}>
                                                        {/* SL Column */}
                                                        <td className="px-3 py-3 text-center font-medium text-gray-800 dark:text-white border-r border-gray-200 dark:border-neutral-700">
                                                            {indx + 1}
                                                        </td>

                                                        {/* Image Column */}
                                                        <td className="px-3 py-2 text-start border-r border-gray-200 dark:border-neutral-700">
                                                            {product?.products?.product_images?.length ? (
                                                                <Image
                                                                    src={
                                                                        product?.products?.product_images?.[0]
                                                                            ?.file_name
                                                                    }
                                                                    alt="Product"
                                                                    width={40}
                                                                    height={40}
                                                                    className="w-10 h-10 rounded-md bg-gray-100"
                                                                />
                                                            ) : (
                                                                <div className="w-10 h-10 rounded-md bg-gray-200 dark:bg-neutral-600"></div>
                                                            )}
                                                        </td>

                                                        {/* Name Column */}
                                                        <td className="px-3 py-2 text-gray-600 dark:text-neutral-300 text-start border-r border-gray-200 dark:border-neutral-700">
                                                            {product?.products?.prod_name || ''}
                                                        </td>

                                                        {/* Category Column */}
                                                        <td className="px-3 py-2 text-gray-600 dark:text-neutral-300 text-start border-r border-gray-200 dark:border-neutral-700">
                                                            {product?.products?.categories?.category_name || ''}
                                                        </td>

                                                        {/* Price Column */}
                                                        <td className="px-3 py-2 text-gray-600 dark:text-neutral-300 text-end border-r border-gray-200 dark:border-neutral-700">
                                                            {product?.price || 0}
                                                        </td>

                                                        {/* Stock Column */}
                                                        <td className="px-3 py-2 text-gray-600 dark:text-neutral-300 text-end border-r border-gray-200 dark:border-neutral-700">
                                                            {product.stock_qty || 0}
                                                        </td>

                                                        {/* VAT Column */}
                                                        <td className="px-3 py-2 text-gray-600 dark:text-neutral-300 text-center border-r border-gray-200 dark:border-neutral-700">
                                                            {product?.products?.vat || 0}
                                                        </td>

                                                        {/* Discount Column */}
                                                        <td className="px-3 py-2 text-gray-600 dark:text-neutral-300 text-end border-r border-gray-200 dark:border-neutral-700">
                                                            {product?.products?.discount || 0}
                                                        </td>

                                                        {/* Action Column - Last TD: No border-r, ensured full height to align buttons */}
                                                        <td className="px-3 py-2 h-full">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <button
                                                                    onClick={() => updateProductHandler(product)}
                                                                    className="material-icons opacity-0 group-hover:opacity-100 bg-green-500 hover:bg-green-700 text-white rounded-full w-7 h-7 flex items-center justify-center text-base transition">
                                                                    edit
                                                                </button>
                                                                <button
                                                                    onClick={() => deleteProductHandler(product.id)}
                                                                    className="material-icons opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-base transition">
                                                                    delete
                                                                </button>
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
                                    {productsToDisplay.length === 0 && (
                                        <EmptyState text={searchQuery ? 'No products match your search.' : undefined} />
                                    )}
                                </>
                            )}

                            {/* Footer - RESPONSIVE */}
                            <div className="px-4 sm:px-6 py-4 flex flex-col gap-3 md:flex-row md:justify-between md:items-center border-t border-gray-200 dark:border-neutral-700">
                                {/* Result Count */}
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-neutral-400">
                                        <span className="font-semibold text-gray-800 dark:text-white pe-1">
                                            {productsToDisplay.length || 0}
                                        </span>
                                        results
                                    </p>
                                </div>

                                {/* Pagination Buttons */}
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
                                </div>
                            </div>
                        </div>
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
