'use server';
import { getProductList, getProductByVendorList, getProductById, getRelatedProducts } from '@/services/product';
export const doProductList = async () => {
    const result = await getProductList();

    return result;
};

export const productByVendorAction = async (id, search_string) => {
    const result = await getProductByVendorList(id, search_string);

    return result;
};

export const productByIdAction = async (id) => {
    const result = await getProductById(id);

    return result;
};

export const relatedProductAction = async (prodInfo) => {
    const params = {
        id: prodInfo?.product_id
    };
    const result = await getRelatedProducts(params);

    return result;
};
