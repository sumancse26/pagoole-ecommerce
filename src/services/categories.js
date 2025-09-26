import { fetchApi } from '@/lib/api';

export const getCategoryList = async () => {
    const res = await fetchApi('/api/category', {
        method: 'GET',
        next: {
            tags: ['categories']
        }
    });

    return res;
};
