import OrderDetail from '@/components/order/OrderDetail';
import { getOrderDtlById } from '@/services/order';

const OrderDetailPage = async ({ params }) => {
    const { id } = await params;
    let orderDetail = {};
    if (id) {
        const res = await getOrderDtlById(id);
        orderDetail = res.order_data || {};
    }

    return <OrderDetail orderData={orderDetail} />;
};

export default OrderDetailPage;
