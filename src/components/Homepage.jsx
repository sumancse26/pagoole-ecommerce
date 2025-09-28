import { doProductList } from '@app/actions/productAction.js';
import { brandListAction } from '@app/actions/brandAction.js';
import Products from './products/Product.jsx';
import Brands from './brand/Brand.jsx';
import Loader from './FirstLoader.jsx';

export const metadata = {
    title: 'Pagoole Discount Shop',
    description:
        'Pagoole Discount Shop offers the latest fashion trends with premium quality products. Free shipping on orders over $250.'
};

export default async function Home() {
    const result = await doProductList();
    const productList = result.product_list || [];
    // const productList = result.product_list?.map((item) => {
    //     if (item.wish_lists?.length > 0) {
    //         item.disable_wish = true;
    //     } else {
    //         item.disable_wish = false;
    //     }

    //     return item;
    // });

    const brandResult = await brandListAction();
    const brands = brandResult.brands;

    return (
        <div className="bg-gray-50">
            {/* Loader */}
            <Loader />
            {/* Product Tabs Section */}
            <Products prodType="all" from="" productList={productList} />
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
