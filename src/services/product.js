import { fetchApi } from '@/lib/api';
import { cache } from 'react';

export const getProductList = cache(async () => {
    const res = await fetchApi('/api/vendor-product', {
        method: 'GET',
        next: {
            revalidate: 3600,
            tags: ['products']
        }
    });
    return res;
});
