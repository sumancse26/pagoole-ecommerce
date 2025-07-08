'use client';

import { useState } from 'react';
const Product = () => {
    const [activeTab, setActiveTab] = useState('arrival');
    const products = {
        arrival: [
            {
                id: 1,
                title: 'Elegant Floral Summer Dress',
                price: 45.0,
                originalPrice: 55.25,
                discount: 35,
                rating: 80,
                reviews: 21,
                image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                colors: ['#87554B', '#333333', '#DA323F', '#5A8F7B'],
                category: 'Dresses'
            },
            {
                id: 2,
                title: 'Classic Denim Jacket',
                price: 68.99,
                originalPrice: 89.99,
                discount: 23,
                rating: 95,
                reviews: 42,
                image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                colors: ['#1E3A8A', '#000000', '#713F12'],
                category: 'Jackets'
            },
            {
                id: 3,
                title: 'Premium Leather Handbag',
                price: 129.99,
                originalPrice: 159.99,
                discount: 19,
                rating: 90,
                reviews: 38,
                image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                colors: ['#713F12', '#000000', '#D4A59A'],
                category: 'Bags'
            },
            {
                id: 4,
                title: 'Comfortable Sneakers',
                price: 59.95,
                originalPrice: 79.95,
                discount: 25,
                rating: 88,
                reviews: 56,
                image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                colors: ['#FFFFFF', '#000000', '#E5E7EB'],
                category: 'Shoes'
            },
            {
                id: 5,
                title: 'Silk Blouse with Ruffles',
                price: 39.99,
                originalPrice: 49.99,
                discount: 20,
                rating: 92,
                reviews: 29,
                image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                colors: ['#F9A8D4', '#FFFFFF', '#FDE047'],
                category: 'Tops'
            },
            {
                id: 6,
                title: 'Wide Leg Trousers',
                price: 34.5,
                originalPrice: 45.0,
                discount: 23,
                rating: 85,
                reviews: 31,
                image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                colors: ['#1F2937', '#6B7280', '#9CA3AF'],
                category: 'Pants'
            },
            {
                id: 7,
                title: 'Cashmere Winter Scarf',
                price: 29.99,
                originalPrice: 39.99,
                discount: 25,
                rating: 91,
                reviews: 47,
                image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                colors: ['#7C3AED', '#1E40AF', '#0F766E'],
                category: 'Accessories'
            },
            {
                id: 8,
                title: 'Gold-plated Hoop Earrings',
                price: 24.95,
                originalPrice: 34.95,
                discount: 29,
                rating: 94,
                reviews: 63,
                image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                colors: ['#FACC15', '#FDE047', '#FEF3C7'],
                category: 'Jewelry'
            }
        ],
        sellers: [
            {
                id: 9,
                title: 'Oversized Knit Sweater',
                price: 49.99,
                originalPrice: 59.99,
                discount: 17,
                rating: 96,
                reviews: 78,
                image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                colors: ['#78350F', '#064E3B', '#1E40AF'],
                category: 'Sweaters'
            },
            {
                id: 10,
                title: 'High-Waisted Skinny Jeans',
                price: 55.0,
                originalPrice: 65.0,
                discount: 15,
                rating: 93,
                reviews: 64,
                image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                colors: ['#1E40AF', '#000000', '#374151'],
                category: 'Jeans'
            },
            {
                id: 11,
                title: 'Leather Crossbody Bag',
                price: 89.99,
                originalPrice: 109.99,
                discount: 18,
                rating: 97,
                reviews: 82,
                image: 'https://images.unsplash.com/photo-1595341595379-cf406e0e04df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                colors: ['#713F12', '#000000', '#78350F'],
                category: 'Bags'
            },
            {
                id: 12,
                title: 'Classic White Sneakers',
                price: 75.0,
                originalPrice: 85.0,
                discount: 12,
                rating: 98,
                reviews: 91,
                image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                colors: ['#FFFFFF', '#E5E7EB', '#F3F4F6'],
                category: 'Shoes'
            },
            {
                id: 13,
                title: 'Silk Satin Pajama Set',
                price: 69.95,
                originalPrice: 79.95,
                discount: 13,
                rating: 95,
                reviews: 57,
                image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                colors: ['#F9A8D4', '#F472B6', '#EC4899'],
                category: 'Sleepwear'
            },
            {
                id: 14,
                title: 'Wool Blend Coat',
                price: 149.99,
                originalPrice: 179.99,
                discount: 17,
                rating: 94,
                reviews: 43,
                image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                colors: ['#1F2937', '#111827', '#374151'],
                category: 'Outerwear'
            },
            {
                id: 15,
                title: 'Statement Gold Necklace',
                price: 39.99,
                originalPrice: 49.99,
                discount: 20,
                rating: 96,
                reviews: 68,
                image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                colors: ['#FACC15', '#FDE047'],
                category: 'Jewelry'
            },
            {
                id: 16,
                title: 'Linen Button-Up Shirt',
                price: 44.5,
                originalPrice: 54.5,
                discount: 18,
                rating: 92,
                reviews: 49,
                image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                colors: ['#FEF3C7', '#FDE68A', '#F59E0B'],
                category: 'Shirts'
            }
        ],
        featured: [
            {
                id: 17,
                title: 'Wrap Midi Dress',
                price: 59.99,
                originalPrice: 69.99,
                discount: 14,
                rating: 91,
                reviews: 37,
                image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                colors: ['#7C3AED', '#9333EA', '#A855F7'],
                category: 'Dresses'
            },
            {
                id: 18,
                title: 'Tailored Blazer',
                price: 89.95,
                originalPrice: 109.95,
                discount: 18,
                rating: 93,
                reviews: 28,
                image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                colors: ['#1F2937', '#111827', '#4B5563'],
                category: 'Blazers'
            },
            {
                id: 19,
                title: 'Cashmere Beanie',
                price: 29.99,
                originalPrice: 39.99,
                discount: 25,
                rating: 90,
                reviews: 52,
                image: 'https://images.unsplash.com/photo-1576872381149-7847515ce5d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                colors: ['#78350F', '#92400E', '#B45309'],
                category: 'Accessories'
            },
            {
                id: 20,
                title: 'Platform Ankle Boots',
                price: 79.99,
                originalPrice: 99.99,
                discount: 20,
                rating: 92,
                reviews: 41,
                image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                colors: ['#1F2937', '#000000', '#4B5563'],
                category: 'Shoes'
            },
            {
                id: 21,
                title: 'Lace Bralette',
                price: 24.95,
                originalPrice: 34.95,
                discount: 29,
                rating: 89,
                reviews: 63,
                image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                colors: ['#F9A8D4', '#F472B6', '#EC4899'],
                category: 'Lingerie'
            },
            {
                id: 22,
                title: 'Wide Brim Fedora',
                price: 34.5,
                originalPrice: 44.5,
                discount: 22,
                rating: 88,
                reviews: 29,
                image: 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                colors: ['#78350F', '#92400E', '#B45309'],
                category: 'Hats'
            },
            {
                id: 23,
                title: 'Stackable Rings Set',
                price: 19.99,
                originalPrice: 29.99,
                discount: 33,
                rating: 94,
                reviews: 78,
                image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                colors: ['#FACC15', '#FDE047', '#FEF3C7'],
                category: 'Jewelry'
            },
            {
                id: 24,
                title: 'Organic Cotton T-Shirt',
                price: 22.99,
                originalPrice: 32.99,
                discount: 30,
                rating: 90,
                reviews: 56,
                image: 'https://images.unsplash.com/photo-1527719327859-c6ce80353573?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                colors: ['#000000', '#FFFFFF', '#1E40AF'],
                category: 'T-Shirts'
            }
        ],
        special: [
            {
                id: 25,
                title: 'Faux Fur Coat',
                price: 99.99,
                originalPrice: 149.99,
                discount: 33,
                rating: 95,
                reviews: 47,
                image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                colors: ['#F9A8D4', '#F472B6', '#EC4899'],
                category: 'Coats'
            },
            {
                id: 26,
                title: 'Designer Sunglasses',
                price: 59.95,
                originalPrice: 89.95,
                discount: 33,
                rating: 96,
                reviews: 62,
                image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                colors: ['#1F2937', '#000000', '#4B5563'],
                category: 'Accessories'
            },
            {
                id: 27,
                title: 'Velvet Evening Gown',
                price: 129.99,
                originalPrice: 179.99,
                discount: 28,
                rating: 97,
                reviews: 34,
                image: 'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                colors: ['#7C3AED', '#9333EA', '#A855F7'],
                category: 'Dresses'
            },
            {
                id: 28,
                title: 'Handcrafted Leather Wallet',
                price: 49.99,
                originalPrice: 69.99,
                discount: 29,
                rating: 94,
                reviews: 58,
                image: 'https://images.unsplash.com/photo-1548032885-b5e38734688a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                colors: ['#713F12', '#78350F', '#92400E'],
                category: 'Accessories'
            },
            {
                id: 29,
                title: 'Cashmere Sweater Set',
                price: 89.99,
                originalPrice: 129.99,
                discount: 31,
                rating: 98,
                reviews: 42,
                image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                colors: ['#78350F', '#064E3B', '#1E40AF'],
                category: 'Sweaters'
            },
            {
                id: 30,
                title: 'Diamond Stud Earrings',
                price: 149.99,
                originalPrice: 199.99,
                discount: 25,
                rating: 99,
                reviews: 71,
                image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                colors: ['#F3F4F6', '#E5E7EB', '#D1D5DB'],
                category: 'Jewelry'
            },
            {
                id: 31,
                title: 'Designer Handbag',
                price: 199.99,
                originalPrice: 299.99,
                discount: 33,
                rating: 97,
                reviews: 39,
                image: 'https://images.unsplash.com/photo-1595341595379-cf406e0e04df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                colors: ['#713F12', '#000000', '#78350F'],
                category: 'Bags'
            },
            {
                id: 32,
                title: 'Limited Edition Watch',
                price: 249.99,
                originalPrice: 349.99,
                discount: 29,
                rating: 100,
                reviews: 28,
                image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                colors: ['#1F2937', '#000000', '#4B5563'],
                category: 'Watches'
            }
        ]
    };
    return (
        <>
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                        <div className="mb-4 md:mb-0">
                            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
                            <p className="text-gray-600">Our most popular products based on sales</p>
                        </div>
                        <div className="flex overflow-x-auto pb-2 md:pb-0">
                            <div className="flex space-x-1 bg-gray-200 rounded-lg p-1">
                                <button
                                    className={`px-4 py-2 text-sm rounded-md whitespace-nowrap ${
                                        activeTab === 'arrival'
                                            ? 'bg-white shadow-sm text-green-600'
                                            : 'text-gray-700 hover:text-gray-900'
                                    }`}
                                    onClick={() => setActiveTab('arrival')}>
                                    New Arrival
                                </button>
                                <button
                                    className={`px-4 py-2 text-sm rounded-md whitespace-nowrap ${
                                        activeTab === 'sellers'
                                            ? 'bg-white shadow-sm text-green-600'
                                            : 'text-gray-700 hover:text-gray-900'
                                    }`}
                                    onClick={() => setActiveTab('sellers')}>
                                    Best Sellers
                                </button>
                                <button
                                    className={`px-4 py-2 text-sm rounded-md whitespace-nowrap ${
                                        activeTab === 'featured'
                                            ? 'bg-white shadow-sm text-green-600'
                                            : 'text-gray-700 hover:text-gray-900'
                                    }`}
                                    onClick={() => setActiveTab('featured')}>
                                    Featured
                                </button>
                                <button
                                    className={`px-4 py-2 text-sm rounded-md whitespace-nowrap ${
                                        activeTab === 'special'
                                            ? 'bg-white shadow-sm text-green-600'
                                            : 'text-gray-700 hover:text-gray-900'
                                    }`}
                                    onClick={() => setActiveTab('special')}>
                                    Special Offer
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products[activeTab].map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                                <div className="relative">
                                    <div className="aspect-w-3 aspect-h-4">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {product.discount && (
                                        <span className="absolute top-4 left-4 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                                            -{product.discount}%
                                        </span>
                                    )}
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        <button className="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-green-600 hover:text-white transition-colors mx-1">
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                                />
                                            </svg>
                                        </button>
                                        <button className="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-green-600 hover:text-white transition-colors mx-1">
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                />
                                            </svg>
                                        </button>
                                        <button className="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-green-600 hover:text-white transition-colors mx-1">
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-medium text-gray-900 mb-1 hover:text-green-600 transition-colors">
                                                <a href={`/product/${product.id}`}>{product.title}</a>
                                            </h3>
                                            <span className="text-xs text-gray-500">{product.category}</span>
                                        </div>
                                        <button className="text-gray-400 hover:text-green-600">
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="mb-3">
                                        <div className="flex items-center">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <svg
                                                    key={star}
                                                    className={`w-4 h-4 ${
                                                        star <= Math.floor(product.rating / 20)
                                                            ? 'text-yellow-400'
                                                            : 'text-gray-300'
                                                    }`}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                            <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="font-bold text-gray-900">${product.price.toFixed(2)}</span>
                                            {product.originalPrice && (
                                                <del className="text-sm text-gray-500 ml-1">
                                                    ${product.originalPrice.toFixed(2)}
                                                </del>
                                            )}
                                        </div>
                                        <div className="flex space-x-1">
                                            {product.colors.map((color, i) => (
                                                <span
                                                    key={i}
                                                    className={`w-4 h-4 rounded-full border border-gray-200 ${
                                                        i === 0 ? 'ring-2 ring-offset-1 ring-green-500' : ''
                                                    }`}
                                                    style={{ backgroundColor: color }}></span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-10">
                        <a
                            href="/shop"
                            className="inline-block px-6 py-3 border border-green-600 text-green-600 font-medium rounded-lg hover:bg-green-600 hover:text-white transition-colors">
                            View All Products
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Product;
