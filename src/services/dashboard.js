import { fetchApi } from '@/lib/api';

export const getDashboardInfo = async (data) => {
    const res = await fetchApi('/api/private/dashboard', {
        method: 'GET'
    });
    return res;
};
