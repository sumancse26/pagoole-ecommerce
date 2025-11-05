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
export const getProductByCategoryId = async (id) => {
    const res = await fetchApi(`/api/category-wise-product/${id}`, {
        method: 'GET'
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

export const getVendorProducts = async () => {
    const res = await fetchApi(`/api/private/dashboard/product`, {
        method: 'GET',
        next: {
            tags: ['vendorProductList']
        }
    });
    return res;
};

export const getSearchedProducts = async (prod_name) => {
    const res = await fetchApi(`/api/search-products?q=${prod_name}`, {
        method: 'GET'
    });
    return res;
};

export const addVendorProducts = async (data) => {
    const res = await fetchApi(`/api/private/dashboard/product`, {
        method: 'POST',
        body: data
    });
    return res;
};
export const updateVendorProducts = async (data) => {
    const res = await fetchApi(`/api/private/dashboard/product`, {
        method: 'PUT',
        body: data
    });
    return res;
};

export const approveProduct = async (data) => {
    const res = await fetchApi(`/api/private/dashboard/product`, {
        method: 'PATCH',
        body: data
    });
    return res;
};
