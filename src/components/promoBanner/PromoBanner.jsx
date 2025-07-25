'use client';

import Link from 'next/link';
const PromoBanner = () => {
    return (
        <>
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative rounded-xl overflow-hidden h-64 md:h-80">
                            <img
                                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                alt="Summer Sale"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-70"></div>
                            <div className="absolute inset-0 flex items-center pl-8">
                                <div className="text-white max-w-xs">
                                    <h3 className="text-2xl md:text-3xl font-bold mb-2">Summer Sale</h3>
                                    <p className="mb-4">Up to 50% off on selected items</p>
                                    <Link
                                        href="/summer-sale"
                                        className="inline-block px-6 py-2 bg-white text-green-600 font-medium rounded-lg hover:bg-gray-100 transition-colors">
                                        Shop Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="relative rounded-xl overflow-hidden h-64 md:h-80">
                            <img
                                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                alt="New Arrivals"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-70"></div>
                            <div className="absolute inset-0 flex items-center pl-8">
                                <div className="text-white max-w-xs">
                                    <h3 className="text-2xl md:text-3xl font-bold mb-2">New Arrivals</h3>
                                    <p className="mb-4">Discover our latest collection</p>
                                    <Link
                                        href="/new-arrivals"
                                        className="inline-block px-6 py-2 bg-white text-green-600 font-medium rounded-lg hover:bg-gray-100 transition-colors">
                                        Explore
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PromoBanner;
