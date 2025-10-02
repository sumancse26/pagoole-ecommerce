'use client';

import { useAlert } from '@/context/AlertContext';
import Loader from '@components/Loader';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Dropdown from '@components/SearchableDropdown';
import { addVendorProducts, updateVendorProducts } from '@/services/product';
import { useApiLoader } from '@/lib/useApiLoader';
import { useRouter } from 'next/navigation';

const AddProduct = ({ isOpen, onClose, categoryList, handleSubmit, selectedProduct, brands, uomList }) => {
    const [productInfo, setProductInfo] = useState({
        prod_name: '',
        prod_code: '',
        description: '',
        price: '',
        stock_qty: '',
        images: [],
        category_id: '',
        brand_id: '',
        weight_id: '',
        vat: ''
    });
    const [previews, setPreviews] = useState([]);
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [weight, setWeight] = useState('');
    const [loadingState, setLoadingState] = useState(false);
    const [totalPriceWithVat, setPriceWithVat] = useState(0);
    const { showAlert } = useAlert();
    const { start, stop } = useApiLoader();

    const router = useRouter();

    useEffect(() => {
        setProductInfo({
            prod_name: '',
            price: '',
            prod_code: '',
            description: '',
            images: [],
            stock_qty: '',
            vat: '',
            weight: '',
            brand: ''
        });
        setPreviews([]);
        setCategory('');
        setBrand('');
        setWeight('');
        if (selectedProduct && Object.keys(selectedProduct).length > 0) {
            setProductInfo({
                prod_name: selectedProduct.products?.prod_name || '',
                prod_code: selectedProduct.products?.prod_code || '',
                price: selectedProduct.price || 0,
                description: selectedProduct.products?.description || '',
                images: selectedProduct.products?.product_images || [],
                category_id: selectedProduct.products?.categories?.id || '',
                stock_qty: selectedProduct.stock_qty || 0,
                vat: selectedProduct.products?.vat || 0,
                weight_id: selectedProduct.products?.weights?.id || '',
                brand_id: selectedProduct.products?.brands?.id || ''
            });
            setCategory(selectedProduct.products?.categories || '');
            setBrand(selectedProduct.products?.brands || '');
            setWeight(selectedProduct.products?.weights || '');

            if (selectedProduct.products?.product_images?.length) {
                setPreviews(selectedProduct.products?.product_images || []);
            }
        }
    }, [selectedProduct]);

    useEffect(() => {
        if (productInfo.price && productInfo.vat_pct) {
            priceWithVat();
        }
    }, [productInfo.price, productInfo.vat_pct]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;

        setProductInfo((prev) => ({ ...prev, images: files }));

        Promise.all(
            files.map(
                (file) =>
                    new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result);
                        reader.readAsDataURL(file);
                    })
            )
        ).then((urls) => {
            setPreviews(urls);
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'vat' && Number(value) > 100) {
            showAlert('VAT percentage cannot be greater than 100', 'error');
            return;
        }
        setProductInfo((prev) => ({ ...prev, [name]: value }));
    };

    const onSelectHandler = (value) => {
        setCategory(value);
        setProductInfo((prev) => ({ ...prev, category_id: value.id }));
    };

    const brandSelectHandler = (value) => {
        setBrand(value);
        setProductInfo((prev) => ({ ...prev, brand_id: value.id }));
    };
    const uomSelectHandler = (value) => {
        const selectedUom = uomList.find((uom) => uom.id == value.id);
        setWeight(value);
        setProductInfo((prev) => ({
            ...prev,
            weight: selectedUom.id,
            uom_name: selectedUom.unit
        }));
    };

    const priceWithVat = () => {
        const total =
            Number(productInfo.price) + (Number(productInfo.price || 0) * Number(productInfo.vat_pct || 0)) / 100;
        setPriceWithVat(total);
    };

    const submitForm = async (e) => {
        e.preventDefault();
        setLoadingState(true);

        if (!productInfo.prod_name || !productInfo.price || !category || !brand || !weight || !productInfo.stock_qty) {
            showAlert('Fill all the fields', 'error');
            setLoadingState(false);
            return;
        }

        const formData = new FormData();
        formData.append('prod_name', productInfo.prod_name);
        formData.append('prod_code', productInfo.prod_code);
        formData.append('price', productInfo.price);
        formData.append('description', productInfo.description);
        formData.append('stock_qty', productInfo.stock_qty);
        formData.append('vat', productInfo.vat);
        if (selectedProduct.id) {
            formData.append('id', selectedProduct.id);
            formData.append('product_id', selectedProduct.product_id);
            formData.append('weight_id', weight.id);
            formData.append('category_id', category.id);
            formData.append('brand_id', brand.id || '');
        } else {
            formData.append('weight_id', weight.id);
            formData.append('category_id', category.id);
            formData.append('brand_id', brand.id || '');
        }

        if (Array.isArray(productInfo.images) && productInfo.images.length > 0) {
            productInfo.images.forEach((file) => {
                if (file instanceof File) {
                    formData.append('images[]', file);
                }
            });
        } else if (selectedProduct.id && selectedProduct.images?.length) {
            formData.append('existing_images', JSON.stringify(selectedProduct.images));
        }

        let res = '';
        if (selectedProduct.id) {
            res = await updateVendorProducts(formData);
        } else {
            res = await addVendorProducts(formData);
        }
        setLoadingState(false);

        if (res.success) {
            showAlert(res.message, 'success');
            router.refresh();
            setProductInfo({
                prod_name: '',
                prod_code: '',
                description: '',
                price: '',
                stock_qty: '',
                images: [],
                category_id: '',
                brand_id: '',
                weight_id: '',
                vat: ''
            });
            setPreviews([]);
            setCategory('');
            handleSubmit(false);
        } else {
            showAlert(res.message, 'error');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
            <div className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-xl p-4 md:p-8 transition-all duration-300 ease-in-out dark:bg-neutral-800">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 dark:text-white border-b border-gray-300">
                    {selectedProduct.id ? 'Update' : 'Create New'} Product
                </h2>

                <form className="space-y-6" onSubmit={submitForm}>
                    <div className="h-96 overflow-y-auto px-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Category */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Category <span className="text-red-500">*</span>
                                </label>
                                <Dropdown
                                    options={categoryList}
                                    onSelect={onSelectHandler}
                                    labelKey="category_name"
                                    selected={category}
                                />
                            </div>
                            {/* Brand */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Brand <span className="text-red-500">*</span>
                                </label>
                                <Dropdown
                                    options={brands}
                                    onSelect={brandSelectHandler}
                                    labelKey="name"
                                    selected={brand}
                                />
                            </div>
                            {/* Unit */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Unit <span className="text-red-500">*</span>
                                </label>
                                <Dropdown
                                    options={uomList}
                                    onSelect={uomSelectHandler}
                                    labelKey="unit"
                                    selected={weight}
                                />
                            </div>
                            {/* Product Code */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Product Code
                                </label>
                                <input
                                    type="text"
                                    name="prod_code"
                                    value={productInfo.prod_code}
                                    onChange={handleInputChange}
                                    placeholder="Enter product code"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 outline-none dark:bg-neutral-700 dark:text-white"
                                />
                            </div>
                            {/* Product Name */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Product Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="prod_name"
                                    value={productInfo.prod_name}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Enter product name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 outline-none dark:bg-neutral-700 dark:text-white"
                                />
                            </div>
                            {/* Price */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Price <span className="text-red-500">({totalPriceWithVat?.toFixed(2) || 0}) *</span>
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={productInfo.price}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="0.00"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 outline-none dark:bg-neutral-700 dark:text-white"
                                />
                            </div>
                            {/* VAT */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    VAT (%)
                                </label>
                                <input
                                    type="number"
                                    name="vat"
                                    value={productInfo.vat}
                                    onChange={handleInputChange}
                                    placeholder="e.g. 5"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 outline-none dark:bg-neutral-700 dark:text-white"
                                />
                            </div>
                            {/* Stock */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Stock Quantity <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="stock_qty"
                                    value={productInfo.stock_qty}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="1000"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 outline-none dark:bg-neutral-700 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Description
                                </label>
                                <input
                                    type="text"
                                    name="description"
                                    value={productInfo.description}
                                    onChange={handleInputChange}
                                    placeholder="e.g. 10"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 outline-none dark:bg-neutral-700 dark:text-white"
                                />
                            </div>
                            {/* Discount */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Discount
                                </label>
                                <input
                                    type="number"
                                    name="discount"
                                    value={productInfo.discount}
                                    onChange={handleInputChange}
                                    placeholder="e.g. 10"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 outline-none dark:bg-neutral-700 dark:text-white"
                                />
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Product Image
                            </label>
                            <div className="flex items-start gap-4">
                                {/* Upload button */}
                                <label
                                    htmlFor="product-image"
                                    className="cursor-pointer w-20 h-20 bg-gray-100 dark:bg-neutral-700 rounded-lg flex items-center justify-center overflow-hidden border border-gray-300 relative group">
                                    <div className="flex flex-col items-center justify-center text-gray-400 text-xs">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 mb-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 16l4-4-4-4m0 8V8a2 2 0 012-2h14m-4 4l4 4-4 4"
                                            />
                                        </svg>
                                        <span>Upload</span>
                                    </div>
                                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </label>

                                <input
                                    id="product-image"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />

                                {/* Preview images */}
                                {previews.length > 0 && (
                                    <div className="flex flex-wrap gap-3">
                                        {previews.map((src, idx) => {
                                            const imageSrc =
                                                typeof src === 'string' ? src : src?.file_name ? src.file_name : null;

                                            if (!imageSrc) return null;

                                            return (
                                                <div
                                                    className="relative w-20 h-20 rounded-lg overflow-hidden border"
                                                    key={idx}>
                                                    <Image
                                                        width={80}
                                                        height={80}
                                                        src={imageSrc}
                                                        alt={`Product ${idx}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    {/* Remove button */}
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setPreviews(previews.filter((_, i) => i !== idx));
                                                            setProductInfo((prev) => ({
                                                                ...prev,
                                                                images: prev.images.filter((_, i) => i !== idx)
                                                            }));
                                                        }}
                                                        className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1 rounded">
                                                        ×
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-center gap-3 pt-4 border-t border-gray-300 dark:border-neutral-600">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-neutral-600 dark:text-gray-300 dark:hover:bg-neutral-700">
                            Cancel
                        </button>
                        <button
                            disabled={loadingState}
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-green-600 hover:from-purple-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition">
                            Save {loadingState && <Loader />}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
