import { fetchApi } from '@/lib/api';

export const createAddToCart = async (data) => {
    const res = await fetchApi('/api/private/add-to-cart', {
        method: 'POST',
        body: JSON.stringify(data)
    });
    return res;
};
