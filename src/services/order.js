import { fetchApi } from '@/lib/api';

export const createOrder = async (data) => {
    const res = await fetchApi('/api/private/order', {
        method: 'POST',
        body: JSON.stringify(data)
    });
    return res;
};

export const getOrderList = async (order_id) => {
    const res = await fetchApi(`/api/private/order/success?id=${order_id}`, {
        method: 'GET',
        next: {
            tags: ['orderList']
        }
    });
    return res;
};

export const getAllOrders = async () => {
    const res = await fetchApi(`/api/private/order`, {
        method: 'GET',
        next: {
            tags: ['allOrderList']
        }
    });
    return res;
};

export const getOrderDtlById = async (id) => {
    const res = await fetchApi(`/api/private/order/details/${id}`, {
        method: 'GET',
        next: {
            tags: ['orderDtlById']
        }
    });
    return res;
};

export const vendorOrderList = async () => {
    const res = await fetchApi(`/api/private/dashboard/order`, {
        method: 'GET'
    });
    return res;
};
