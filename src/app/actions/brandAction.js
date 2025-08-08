'use server';
import { getBrandList } from '@/services/brand';
export const brandListAction = async () => {
    const result = await getBrandList();

    return result;
};
