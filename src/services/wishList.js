import { fetchApi } from '@/lib/api';

export const addToWishList = async (data) => {
    const res = await fetchApi('/api/private/add-to-wish-list', {
        method: 'POST',
        body: JSON.stringify(data)
    });
    return res;
};

export const getWishList = async () => {
    const res = await fetchApi('/api/private/add-to-wish-list', {
        method: 'GET',
        next: {
            tags: ['wishListItem']
        }
    });
    return res;
};
