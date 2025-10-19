import VendorList from '@components/dashboard/vendor/VendorList';
import { getVendorListForDashboard } from '@/services/vendor';
import Skeleton from '@components/dashboard/order/OrderSkeleton';
import { Suspense } from 'react';

const VendorContent = async () => {
    const list = await getVendorListForDashboard();
    const vendorList = list.vendor_list || [];
    return <VendorList vendorList={vendorList} />;
};
const Vendor = async () => {
    return (
        <Suspense fallback={<Skeleton />}>
            <VendorContent />
        </Suspense>
    );
};

export default Vendor;
