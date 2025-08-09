import { fetchApi } from '@/lib/api';
import { cache } from 'react';

export const getProductList = cache(async () => {
    const res = await fetchApi('/api/vendor-product', {
        method: 'GET',
        next: {
            revalidate: 300,
            tags: ['products']
        }
    });
    return res;
});

export const getProductByVendorList = cache(async (id) => {
    const res = await fetchApi(`/api/vendor-product/${id}`, {
        method: 'GET',
        next: {
            revalidate: 300,
            tags: ['productsByVendor']
        }
    });
    return res;
});
