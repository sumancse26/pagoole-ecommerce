import { productByVendorAction } from '@app/actions/productAction';
import Product from '@components/products/Product';

const shopWiseProduct = async ({ searchParams }) => {
    const { vendor_id } = await searchParams;

    const result = await productByVendorAction(vendor_id, '');
    const vendorProducts = result.product_list?.map((item) => {
        if (item.wish_lists?.length > 0) {
            item.disable_wish = true;
        } else {
            item.disable_wish = false;
        }
        return item;
    });

    console.log('vendorProducts', vendorProducts);

    return <Product prodType="all" fromWhere="vendor" productList={vendorProducts} />;
};

export default shopWiseProduct;
