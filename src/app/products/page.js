import Product from '@/components/productDetail/ProductDetails.jsx';
import { productByIdAction } from '@app/actions/productAction';
// import { auth } from '@/auth';
const ProductPage = async ({ searchParams }) => {
    const { product_id: prodId } = await searchParams;
    // const authResult = await auth();
    // console.log('authResult', authResult);
    const result = await productByIdAction(prodId);
    const prodInfo = result.product_details;
    return (
        <>
            <Product prodInfo={prodInfo} />
        </>
    );
};

export default ProductPage;
