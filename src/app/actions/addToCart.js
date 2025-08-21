'use server';
import { createAddToCart } from '@/services/addToCart';
export const addToCartAction = async (data) => {
    console.log('add to cart before', data);
    const result = await createAddToCart(data);
    console.log('add to cart result', result);

    return result;
};
