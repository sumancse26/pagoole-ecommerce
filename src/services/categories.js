import { fetchApi } from '@/lib/api';

export const getCategoryList = async () => {
    const res = await fetchApi('/api/private/dashboard/category', {
        method: 'GET'
    });

    return res;
};

export const getPublicCategoryList = async () => {
    const res = await fetchApi('/api/category', {
        method: 'GET'
    });

    return res;
};
