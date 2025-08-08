'use server';
import { getProductList } from '@/services/product';
export const doProductList = async () => {
    const result = await getProductList();

    return result;
};
