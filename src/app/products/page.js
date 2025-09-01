// import Product from '@/components/productDetail/ProductDetails.jsx';
import { productByIdAction, relatedProductAction } from '@app/actions/productAction';
import ProductDescription from '@/components/productDetail/ProductDescription';
import ProductInfo from '@/components/productDetail/ProductInfo';
import RelatedProducts from '@components/productDetail/RelatedProduct';
const ProductPage = async ({ searchParams }) => {
    const { product_id: prodId } = await searchParams;

    const result = await productByIdAction(prodId);
    const prodInfo = result.product_details || [];

    let relatedProducts = [];
    if (prodInfo?.length) {
        const result = await relatedProductAction(prodInfo?.[0]);
        relatedProducts = result.related_products;
    }
    return (
        <>
            <main className="container mx-auto px-4 py-8 max-w-7xl relative">
                <div className="flex flex-col lg:flex-row mb-5 gap-5">
                    <ProductInfo prodInfo={prodInfo} />
                    <RelatedProducts productList={relatedProducts} />
                </div>

                <ProductDescription />
            </main>
            {/* <Product prodInfo={prodInfo} relatedProducts={relatedProducts} /> */}
        </>
    );
};

export default ProductPage;
