import { Suspense } from 'react';
import { productByIdAction, relatedProductAction } from '@app/actions/productAction';
import ProductDescription from '@/components/productDetail/ProductDescription';
import ProductInfo from '@/components/productDetail/ProductInfo';
import RelatedProducts from '@components/productDetail/RelatedProduct';
import ProductDtlSkeleton from '@components/productDetail/ProductDtlSkeleton';

const ProductContent = async ({ searchParams }) => {
    const { product_id: prodId, vendor_product } = await searchParams;

    const result = await productByIdAction(prodId);
    const prodInfo = result.product_details?.map(sp=>{
        if(sp.id == vendor_product){
            sp.activeProd = true;
        }else{
            sp.activeProd=false
        }

        return sp;
    }) || [];

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
    );
};

const ProductPage = async ({ searchParams }) => {
    return (
        <Suspense fallback={<ProductDtlSkeleton />}>
            <ProductContent searchParams={searchParams} />
        </Suspense>
    );
};

export default ProductPage;
