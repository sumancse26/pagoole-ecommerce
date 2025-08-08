const Brands = ({ brandList }) => {
    return (
        <>
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Our Trusted Brands</h2>
                        <p className="text-gray-600">We partner with the best brands in the industry</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {brandList.map((brand, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-center p-4 bg-gray-100 rounded-lg hover:shadow-md transition-shadow">
                                <img
                                    src={brand.brand_logo}
                                    alt={brand.name}
                                    className="h-8 object-contain opacity-70 hover:opacity-100 transition-opacity"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Brands;
