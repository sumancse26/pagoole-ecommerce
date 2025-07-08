import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from './header/Header.jsx';
import Slider from './slider/Slider.jsx';
import Products from './products/Product.jsx';
import PromoBanner from './promoBanner/PromoBanner.jsx';
import Brands from './brand/Brand.jsx';
import Testimonial from './testimonial/Testimonial.jsx';
import Newsletter from './newsletter/Newsletter.jsx';
import Footer from './footer/Footer.jsx';
import ProductDetails from './productDetail/ProductDetails.jsx';

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
            // Show popup after 2 seconds
            setTimeout(() => setShowPopup(true), 2000);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="bg-gray-50">
            <Head>
                <title>Shopwise - Premium eCommerce Template</title>
                <meta
                    name="description"
                    content="Shopwise offers the latest fashion trends with premium quality products. Free shipping on orders over $250."
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Loader */}
            {isLoading && (
                <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
                    <div className="flex space-x-2">
                        <div className="w-4 h-4 rounded-full bg-green-500 animate-bounce"></div>
                        <div
                            className="w-4 h-4 rounded-full bg-green-500 animate-bounce"
                            style={{ animationDelay: '0.2s' }}></div>
                        <div
                            className="w-4 h-4 rounded-full bg-green-500 animate-bounce"
                            style={{ animationDelay: '0.4s' }}></div>
                    </div>
                </div>
            )}

            <Header />
            {/* Main Banner */}
            <Slider />

            {/* Product Tabs Section */}
            <Products />

            {/* Promo Banners */}
            <PromoBanner />

            {/* Brands Section */}
            <Brands />

            {/* Testimonials */}
            <Testimonial />

            {/* Newsletter */}
            <Newsletter />

            {/* Footer */}
            <Footer />

            <ProductDetails />

            {/* Global styles */}
            <style jsx global>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeInUp {
                    animation: fadeInUp 0.5s ease forwards;
                }
            `}</style>
        </div>
    );
}
