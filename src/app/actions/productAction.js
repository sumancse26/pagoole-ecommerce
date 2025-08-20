'use server';
import { getProductList, getProductByVendorList, getProductById, getRelatedProducts } from '@/services/product';
export const doProductList = async () => {
    const result = await getProductList();

    return result;
};

export const productByVendorAction = async (id) => {
    const result = await getProductByVendorList(id);

    return result;
};

export const productByIdAction = async (id) => {
    const result = await getProductById(id);

    return result;
};

export const relatedProductAction = async (prodInfo) => {
    const params = {
        id: prodInfo?.product_id
        // vendor_id: prodInfo?.vendors?.id
    };
    const result = await getRelatedProducts(params);

    return result;
};
