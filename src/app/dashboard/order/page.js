import OrderList from '@components/dashboard/order/Order';
import { vendorOrderList } from '@/services/order';

const Order = async () => {
    const list = await vendorOrderList();
    const orderList = list.order_list || [];

    return <OrderList orderList={orderList} />;
};

export default Order;
