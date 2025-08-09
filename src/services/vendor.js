import { fetchApi } from '@/lib/api';
import { cache } from 'react';

export const getVendorList = cache(async () => {
    const res = await fetchApi('/api/vendor', {
        method: 'GET',
        next: {
            revalidate: 300,
            tags: ['vendors']
        }
    });
    return res;
});

export const getLocationList = cache(async () => {
    const res = await fetchApi('/api/location', {
        method: 'GET',
        next: {
            revalidate: 300,
            tags: ['locations']
        }
    });
    return res;
});
