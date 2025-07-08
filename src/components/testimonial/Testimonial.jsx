'use client';

const Testimonial = () => {
    return (
        <>
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">What Our Customers Say</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Don't just take our word for it - hear from some of our satisfied customers
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: 'Sarah Johnson',
                                role: 'Fashion Blogger',
                                comment:
                                    'I absolutely love the quality of the products from Shopwise. The dresses fit perfectly and the fabric is so comfortable!',
                                rating: 5,
                                image: 'https://randomuser.me/api/portraits/women/43.jpg'
                            },
                            {
                                name: 'Michael Chen',
                                role: 'Frequent Shopper',
                                comment:
                                    "Great customer service and fast shipping. I've ordered multiple times and have never been disappointed with my purchases.",
                                rating: 4,
                                image: 'https://randomuser.me/api/portraits/men/32.jpg'
                            },
                            {
                                name: 'Emily Rodriguez',
                                role: 'First-time Customer',
                                comment:
                                    'The checkout process was so easy and my order arrived earlier than expected. Will definitely shop here again!',
                                rating: 5,
                                image: 'https://randomuser.me/api/portraits/women/65.jpg'
                            }
                        ].map((testimonial, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center mb-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg
                                            key={star}
                                            className={`w-5 h-5 ${
                                                star <= testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                                            }`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-6">"{testimonial.comment}"</p>
                                <div className="flex items-center">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full object-cover mr-4"
                                    />
                                    <div>
                                        <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Testimonial;
