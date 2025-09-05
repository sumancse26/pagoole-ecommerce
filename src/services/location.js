import { fetchApi } from '@/lib/api';

export const getRegionList = async (data) => {
    const res = await fetchApi(`/api/private/region?type=${data.type}&parent_id=${data.id}`, {
        method: 'GET'
    });
    return res;
};
