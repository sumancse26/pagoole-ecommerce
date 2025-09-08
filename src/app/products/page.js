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
        const vendorProducts = result.related_products?.map((item) => {
            if (item.wish_lists?.length > 0) {
                item.disable_wish = true;
            } else {
                item.disable_wish = false;
            }
            return item;
        });
        relatedProducts = vendorProducts || [];
    }

    return (
        <>
            <main className="container mx-auto px-4 py-8 max-w-7xl relative">
                {/* Product Info Section */}
                <div className="mb-8">
                    <ProductInfo prodInfo={prodInfo} />
                </div>

                {/* Product Description Section */}
                <div className="mt-8 mb-8">
                    <ProductDescription />
                </div>

                {/* Related Products Section */}
                <div>
                    <RelatedProducts productList={relatedProducts} />
                </div>
            </main>
        </>
    );
};

export default ProductPage;
