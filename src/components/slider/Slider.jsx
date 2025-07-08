'use client';

import { useState, useEffect } from 'react';

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-rotate carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % banners.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const banners = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            title: 'Summer Collection 2023',
            subtitle: 'Get up to 50% off Today Only!',
            link: '/shop',
            buttonText: 'Shop Now',
            bgColor: 'bg-green-50'
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            title: 'New Arrivals',
            subtitle: 'Discover the latest trends',
            link: '/new-arrivals',
            buttonText: 'Explore',
            bgColor: 'bg-blue-50'
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            title: 'Luxury Accessories',
            subtitle: 'Elevate your style',
            link: '/accessories',
            buttonText: 'View Collection',
            bgColor: 'bg-purple-50'
        }
    ];

    return (
        <>
            <div className="relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap">
                        <div className="w-full lg:w-9/12 lg:ml-auto">
                            <div className="relative rounded-xl overflow-hidden">
                                <div className="relative w-full overflow-hidden h-96 md:h-[32rem]">
                                    {banners.map((banner, index) => (
                                        <div
                                            key={banner.id}
                                            className={`absolute inset-0 transition-opacity duration-1000 flex items-center ${
                                                banner.bgColor
                                            } ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                                            <div className="container mx-auto px-4">
                                                <div className="flex flex-col md:flex-row items-center">
                                                    <div className="w-full md:w-1/2 lg:w-2/5 px-4 py-12 md:py-0">
                                                        <div className="text-left">
                                                            <h5
                                                                className="text-lg md:text-xl text-green-600 mb-3 animate-fadeInUp"
                                                                style={{ animationDelay: '0.3s' }}>
                                                                {banner.subtitle}
                                                            </h5>
                                                            <h2
                                                                className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 animate-fadeInUp"
                                                                style={{ animationDelay: '0.6s' }}>
                                                                {banner.title}
                                                            </h2>
                                                            <a
                                                                className="inline-block px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors animate-fadeInUp uppercase"
                                                                href={banner.link}
                                                                style={{ animationDelay: '0.9s' }}>
                                                                {banner.buttonText}
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="w-full md:w-1/2 lg:w-3/5 px-4">
                                                        <img
                                                            src={banner.image}
                                                            alt={banner.title}
                                                            className="w-full h-auto object-cover rounded-lg animate-fadeInUp"
                                                            style={{ animationDelay: '1.2s' }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
                                    {banners.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentSlide(index)}
                                            className={`w-3 h-3 rounded-full transition-colors ${
                                                index === currentSlide
                                                    ? 'bg-green-600'
                                                    : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                                            }`}></button>
                                    ))}
                                </div>
                                <button
                                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full w-10 h-10 flex items-center justify-center shadow-md"
                                    onClick={() =>
                                        setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
                                    }>
                                    <svg
                                        className="w-6 h-6 text-gray-800"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 19l-7-7 7-7"
                                        />
                                    </svg>
                                </button>
                                <button
                                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full w-10 h-10 flex items-center justify-center shadow-md"
                                    onClick={() => setCurrentSlide((prev) => (prev + 1) % banners.length)}>
                                    <svg
                                        className="w-6 h-6 text-gray-800"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Slider;
