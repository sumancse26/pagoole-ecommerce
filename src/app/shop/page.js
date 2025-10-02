import ShopSkeleton from '@components/shop/ShopSkeleton';
import { vendorListAction, locationListAction } from '@app/actions/vendorAction';
import Shop from '@components/shop/Shop';
import { Suspense } from 'react';

const ShopContent = async () => {
    const vendor = await vendorListAction();
    const vendorList = vendor.vendor_list || [];

    const location = await locationListAction();
    const locationList = location.location_list || [];

    return <Shop vendorList={vendorList} locationList={locationList} />;
};

const ShopPage = async () => {
    return (
        <Suspense fallback={<ShopSkeleton />}>
            <ShopContent />
        </Suspense>
    );
};

export default ShopPage;
