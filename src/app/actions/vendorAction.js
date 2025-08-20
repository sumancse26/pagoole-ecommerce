'use server';
import { getVendorList, getLocationList, getVendorListByLocation } from '@/services/vendor';
export const vendorListAction = async () => {
    const result = await getVendorList();

    return result;
};

export const locationListAction = async () => {
    const result = await getLocationList();

    return result;
};

export const vendorListByLocationAction = async (id) => {
    const result = await getVendorListByLocation(id);

    return result;
};
