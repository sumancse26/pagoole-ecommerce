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

export const getProductById = cache(async (id) => {
    const res = await fetchApi(`/api/product-details/${id}`, {
        method: 'GET',
        next: {
            revalidate: 300,
            tags: ['productById']
        }
    });
    return res;
});

export const getRelatedProducts = cache(async (id) => {
    const res = await fetchApi(`/api/related-products/${id}`, {
        method: 'GET',
        next: {
            revalidate: 300,
            tags: ['relatedProduct']
        }
    });
    return res;
});
