const ProductItem = ({ name, price, originalPrice, discount, qty, imageSrc }) => (
    <div className="flex items-center space-x-4 py-4 border-b border-gray-200 last:border-b-0">
        <img src={imageSrc} alt={name} className="w-16 h-16 object-cover rounded-md" />
        <div className="flex-grow">
            <p className="text-gray-800 font-medium">{name}</p>
        </div>
        <div className="text-right">
            <p className="text-green-600 font-semibold">৳ {price}</p>
            {originalPrice && <p className="text-sm text-gray-500 line-through">৳ {originalPrice}</p>}
            {discount && <p className="text-sm text-red-500">{discount}</p>}
        </div>
        <div className="flex flex-col items-center">
            <p className="text-gray-700">Qty: {qty}</p>
            <button className="text-gray-400 hover:text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 11-2 0v6a1 1 0 112 0V8z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </div>
    </div>
);

export default ProductItem;
