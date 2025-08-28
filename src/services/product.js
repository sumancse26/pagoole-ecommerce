import { fetchApi } from '@/lib/api';

export const getProductList = async () => {
    const res = await fetchApi('/api/vendor-product', {
        method: 'GET',
        next: {
            revalidate: 300,
            tags: ['products']
        }
    });
    return res;
};

export const getProductByVendorList = async (id, search_string) => {
    const res = await fetchApi(`/api/vendor-product/${id}?search=${search_string}`, {
        method: 'GET',
        next: {
            tags: ['productsByVendor']
        }
    });
    return res;
};

export const getProductById = async (id) => {
    const res = await fetchApi(`/api/product-details/${id}`, {
        method: 'GET',
        next: {
            tags: ['productById']
        }
    });
    return res;
};

export const getRelatedProducts = async (data) => {
    const res = await fetchApi(`/api/related-products?prod_id=${data.id}`, {
        method: 'GET',
        next: {
            tags: ['relatedProduct']
        }
    });
    return res;
};
