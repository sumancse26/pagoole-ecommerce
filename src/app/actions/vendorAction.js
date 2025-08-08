'use server';
import { getVendorList, getLocationList } from '@/services/vendor';
export const vendorListAction = async () => {
    const result = await getVendorList();

    return result;
};

export const locationListAction = async () => {
    const result = await getLocationList();

    return result;
};
