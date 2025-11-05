import { doProductList } from '@app/actions/productAction.js';
import { brandListAction } from '@app/actions/brandAction.js';
import Products from './products/Product.jsx';
import Brands from './brand/Brand.jsx';
import { Suspense } from 'react';
import ProductSkeleton from './products/ProductSkeleton.jsx';

export const metadata = {
    title: 'Discount Shop',
    description:
        'Discount Shop offers the latest fashion trends with premium quality products. Free shipping on orders over $250.'
};

const HomeContent = async () => {
    const result = await doProductList();
    const productList = result.product_list || [];
    const brandResult = await brandListAction();
    const brands = brandResult.brands;

    return (
        <div className="bg-gray-50">
            <Products prodType="all" from="" productList={productList} searchParams="" />

            <Brands brandList={brands} />
        </div>
    );
};

const HomePage = async () => {
    return (
        <Suspense fallback={<ProductSkeleton loadNumbers={[1, 2, 3, 4, 5, 6]} />}>
            <HomeContent />
        </Suspense>
    );
};

export default HomePage;
