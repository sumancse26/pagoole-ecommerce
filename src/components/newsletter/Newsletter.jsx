'use client';

const Newsletter = () => {
    return (
        <>
            <section className="py-12 bg-gradient-to-r from-green-600 to-purple-600">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
                        <p className="text-green-100 mb-8">Get the latest updates on new products and upcoming sales</p>
                        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto sm:max-w-xl">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-grow px-4 py-3 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent"
                                required
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-white text-green-600 font-medium rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Newsletter;
