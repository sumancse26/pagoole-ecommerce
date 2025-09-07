import { fetchApi } from '@/lib/api';

export const createOrder = async (data) => {
    const res = await fetchApi('/api/private/invoice', {
        method: 'POST',
        body: JSON.stringify(data)
    });
    return res;
};

export const getAddToCartList = async () => {
    const res = await fetchApi('/api/private/invoice', {
        method: 'GET',
        next: {
            tags: ['cartListItem']
        }
    });
    return res;
};
