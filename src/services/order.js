import { fetchApi } from '@/lib/api';

export const createOrder = async (data) => {
    const res = await fetchApi('/api/private/order', {
        method: 'POST',
        body: JSON.stringify(data)
    });
    return res;
};

export const getOrderList = async (order_id) => {
    const res = await fetchApi(`/api/private/order?id=${order_id}`, {
        method: 'GET',
        next: {
            tags: ['orderList']
        }
    });
    return res;
};
