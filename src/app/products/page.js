import Product from '@/components/productDetail/ProductDetails.jsx';
import { productByIdAction } from '@app/actions/productAction';
const ProductPage = async ({ searchParams }) => {
    const { product_id: prodId } = await searchParams;
    const result = await productByIdAction(prodId);
    const prodInfo = result.product_details;
    console.log('prod details', result);
    return (
        <>
            <Product prodInfo={prodInfo} />
        </>
    );
};

export default ProductPage;
