import { fetchApi } from '@/lib/api';

export const getUserList = async () => {
    const res = await fetchApi('/api/dashboard/users', {
        method: 'GET'
    });
    return res;
};

export const register = async (data) => {
    const res = await fetchApi('/api/register', {
        method: 'POST',
        body: JSON.stringify(data)
    });
    return res;
};
