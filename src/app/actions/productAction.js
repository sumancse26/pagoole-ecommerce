'use server';
import { getProductList, getProductByVendorList } from '@/services/product';
export const doProductList = async () => {
    const result = await getProductList();

    return result;
};

export const productByVendorAction = async (id) => {
    const result = await getProductByVendorList(id);

    return result;
};
