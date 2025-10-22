import { fetchApi } from '@/lib/api';

export const getUserInfo = async () => {
    const res = await fetchApi('/api/private/dashboard/user', {
        method: 'GET'
    });
    return res;
};

export const register = async (data) => {
    const res = await fetchApi('/api/register', {
        method: 'POST',
        body: data
    });
    return res;
};
