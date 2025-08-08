import { fetchApi } from '@/lib/api';
import { cache } from 'react';

export const getVendorList = cache(async () => {
    const res = await fetchApi('/api/vendor', {
        method: 'GET',
        next: {
            revalidate: 3600,
            tags: ['products']
        }
    });
    return res;
});

export const getLocationList = cache(async () => {
    const res = await fetchApi('/api/location', {
        method: 'GET',
        next: {
            revalidate: 3600,
            tags: ['locations']
        }
    });
    return res;
});
