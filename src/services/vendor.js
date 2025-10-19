import { fetchApi } from '@/lib/api';
import { cache } from 'react';

export const getVendorList = cache(async () => {
    const res = await fetchApi('/api/vendor', {
        method: 'GET',
        next: {
            tags: ['vendors']
        }
    });
    return res;
});

export const getLocationList = cache(async () => {
    const res = await fetchApi('/api/location', {
        method: 'GET',
        next: {
            tags: ['locations']
        }
    });
    return res;
});

export const getVendorListByLocation = async (id) => {
    const res = await fetchApi(`/api/vendor/${id}`, {
        method: 'GET',
        next: {
            tags: ['vendorByLocationId']
        }
    });
    return res;
};

export const getVendorListForDashboard = async () => {
    const res = await fetchApi(`/api/private/dashboard/vendors`, {
        method: 'GET'
    });
    return res;
};
