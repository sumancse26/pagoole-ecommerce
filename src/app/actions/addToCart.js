'use server';
import { createAddToCart, getAddToCartList } from '@/services/addToCart';
// import { getAddToCartList } from '@/services/addToCart';
export const getAddToCartAction = async (data) => {
    const result = await getAddToCartList(data);

    return result;
};
