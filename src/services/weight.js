import { fetchApi } from '@/lib/api';
import { cache } from 'react';

export const getWeightsList = cache(async () => {
    const res = await fetchApi('/api/weights', {
        method: 'GET',
        next: {
            tags: ['weights']
        }
    });

    return res;
});
