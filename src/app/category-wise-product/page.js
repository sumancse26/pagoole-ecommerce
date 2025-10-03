import ProductListSkeleton from '@/components/products/ProductSkeleton';
import { getProductByCategoryId } from '@/services/product';
import Product from '@components/products/Product';
import { Suspense } from 'react';

const CategoryWiseProductContent = async ({ category }) => {
    const result = await getProductByCategoryId(category);
    const vendorProducts = result.product_list || [];

    return <Product prodType="all" from="" productList={vendorProducts} />;
};
const CategoryWiseProduct = async ({ searchParams }) => {
    const { category } = await searchParams;

    return (
        <Suspense fallback={<ProductListSkeleton loadNumbers={[1, 2, 3, 4, 5, 6]} />}>
            <CategoryWiseProductContent category={category} />
        </Suspense>
    );
};

export default CategoryWiseProduct;
