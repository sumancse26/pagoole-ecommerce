import { fetchApi } from '@/lib/api';

export const createAddToCart = async (data) => {
    const res = await fetchApi('/api/private/add-to-cart', {
        method: 'POST',
        body: JSON.stringify(data)
    });
    return res;
};

export const getAddToCartList = async () => {
    const res = await fetchApi('/api/private/add-to-cart', {
        method: 'GET',
        next: {
            tags: ['cartListItem']
        }
    });
    return res;
};

export const deleteCartItem = async (id) => {
    const res = await fetchApi('/api/private/add-to-cart', {
        method: 'DELETE',
        body: JSON.stringify({ id })
    });
    return res;
};
