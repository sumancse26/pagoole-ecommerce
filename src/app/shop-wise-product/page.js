import { productByVendorAction } from '@app/actions/productAction';
import Product from '@components/products/Product';

const shopWiseProduct = async ({ searchParams }) => {
    const { vendor_id } = await searchParams;

    const result = await productByVendorAction(vendor_id);
    const vendorProducts = result.product_list;

    return <Product prodType="all" fromWhere="vendor" productList={vendorProducts} />;
};

export default shopWiseProduct;
