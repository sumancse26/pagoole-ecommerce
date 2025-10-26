import { fetchApi } from '@/lib/api';

export const getRegionList = async (data) => {
    const res = await fetchApi(`/api/private/region?parent_id=${data.id}`, {
        method: 'GET'
    });
    return res;
};
