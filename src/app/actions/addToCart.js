'use server';

export const addToCartAction = async (data) => {
    const result = await createAddToCart(data);

    return result;
};
