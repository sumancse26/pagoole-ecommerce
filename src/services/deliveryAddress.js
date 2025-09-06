import { fetchApi } from '@/lib/api';

export const createDeliveryAddress = async (data) => {
    const res = await fetchApi('/api/private/delivery-address', {
        method: 'POST',
        body: JSON.stringify(data)
    });
    return res;
};

export const getDeliveryAddresstList = async () => {
    const res = await fetchApi('/api/private/delivery-address', {
        method: 'GET',
        next: {
            tags: ['deliveryAddressList']
        }
    });
    return res;
};

export const changeDefaultAddress = async (addressId) => {
    const res = await fetchApi('/api/private/delivery-address', {
        method: 'PUT',
        body: JSON.stringify({ address_id: addressId })
    });
    return res;
};
