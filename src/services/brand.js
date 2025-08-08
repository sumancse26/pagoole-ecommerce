import { fetchApi } from '@/lib/api';
import { cache } from 'react';

export const getBrandList = cache(async () => {
    const res = await fetchApi('/api/brand', {
        method: 'GET',
        next: {
            revalidate: 3600,
            tags: ['brands']
        }
    });

    return res;
});
