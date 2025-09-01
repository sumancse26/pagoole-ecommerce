'use server';
import { auth } from '@/auth';
import { createAddToCart, getAddToCartList } from '@/services/addToCart';
export const getAddToCartAction = async (data) => {
    const result = await getAddToCartList(data);

    return result;
};

export const authSessionAction = async () => {
    const session = await auth();

    return session;
};
