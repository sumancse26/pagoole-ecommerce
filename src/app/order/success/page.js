import OrderSuccess from '@/components/order/OrderSuccess';
import { getOrderList } from '@/services/order';

const OrderSuccessPage = async ({ searchParams }) => {
    const { id } = await searchParams;

    let orderInfo = {};
    const res = await getOrderList(id);
    orderInfo = res.order_data || {};

    return <OrderSuccess orderInfo={orderInfo} />;
};

export default OrderSuccessPage;
