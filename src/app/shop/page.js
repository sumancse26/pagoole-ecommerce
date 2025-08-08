import { vendorListAction, locationListAction } from '@app/actions/vendorAction';
import Shop from '@components/shop/Shop';

const ShopPage = async () => {
    const vendor = await vendorListAction();
    const vendorList = vendor.vendor_list;

    const location = await locationListAction();
    const locationList = location.location_list;

    return <Shop vendorList={vendorList} locationList={locationList} />;
};

export default ShopPage;
