import { productByVendorAction } from '@app/actions/productAction';
import Product from '@components/products/Product';
import ProductSkeleton from '@components/products/ProductSkeleton';
import { Suspense } from 'react';
const ShopWiseProductContent = async ({ vendor_id }) => {
    const result = await productByVendorAction(vendor_id, '');
    const vendorProducts = result.product_list || [];
    return <Product prodType="all" fromWhere="vendor" productList={vendorProducts} />;
};

const ShopWiseProduct = async ({ searchParams }) => {
    const { vendor_id } = await searchParams;

    return (
        <Suspense fallback={<ProductSkeleton loadNumbers={[1, 2, 3, 4, 5, 6]} />}>
            <ShopWiseProductContent vendor_id={vendor_id} />
        </Suspense>
    );
};

export default ShopWiseProduct;
