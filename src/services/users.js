import { fetchApi } from '@/lib/api';

export const getUserList = async () => {
    const res = await fetchApi('/api/dashboard/users', {
        method: 'GET'
    });
    return res;
};

//body should not be json for form data
export const addUser = async (data) => {
    const res = await fetchApi('/api/dashboard/users', {
        method: 'POST',
        body: JSON.stringify(data)
    });
    return res;
};
