import { doProductList } from '@app/actions/productAction.js';
import { brandListAction } from '@app/actions/brandAction.js';
import Products from './products/Product.jsx';
// import PromoBanner from './promoBanner/PromoBanner.jsx';
import Brands from './brand/Brand.jsx';
// import Testimonial from './testimonial/Testimonial.jsx';
import Loader from './FirstLoader.jsx';

export const metadata = {
    title: 'Pagoole Discount Shop',
    description:
        'Pagoole Discount Shop offers the latest fashion trends with premium quality products. Free shipping on orders over $250.'
};

export default async function Home() {
    const result = await doProductList();
    const productList = result.product_list;

    const brandResult = await brandListAction();
    const brands = brandResult.brands;

    return (
        <div className="bg-gray-50">
            {/* Loader */}
            <Loader />
            {/* Product Tabs Section */}
            <Products prodType="all" productList={productList} />
            {/* <Products /> */}

            {/* Promo Banners */}
            {/* <PromoBanner /> */}

            {/* Brands Section */}
            <Brands brandList={brands} />

            {/* Testimonials */}
            {/* <Testimonial /> */}

            {/* Global styles */}
        </div>
    );
}
