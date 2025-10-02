import OrderList from '@components/dashboard/order/Order';
import { vendorOrderList } from '@/services/order';
import Skeleton from '@components/dashboard/order/OrderSkeleton';
import { Suspense } from 'react';

const OrderContent = async () => {
    const list = await vendorOrderList();
    const orderList = list.order_list || [];

    return <OrderList orderList={orderList} />;
};
const Order = async () => {
    return (
        <Suspense fallback={<Skeleton />}>
            <OrderContent />
        </Suspense>
    );
};

export default Order;
