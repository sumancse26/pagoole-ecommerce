import { NextResponse } from 'next/server';
import prisma from '@/config/prisma';

export const POST = async (req) => {
    try {
        const id = req.headers.get('user_id');
        const userId = Number(id);

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { order_items, payment_method } = await req.json();

        if (!order_items || !order_items.length) {
            return NextResponse.json({ error: 'No items to order' }, { status: 400 });
        }

        const results = await prisma.$transaction(async (tx) => {
            // 1️⃣ Get all cart IDs from provided items
            const cartIds = [...new Set(order_items.map((item) => item.cart_id))];

            // 2️⃣ Delete only selected cart items (not all items of the cart)
            for (const item of order_items) {
                await tx.cart_Items.deleteMany({
                    where: {
                        cart_id: item.cart_id,
                        vendor_prod_id: item.vendor_product_id // match specific product
                    }
                });
            }

            // 3️⃣ Delete carts that are now empty
            const cartsWithItems = await tx.cart_Items.findMany({
                where: { cart_id: { in: cartIds } },
                select: { cart_id: true }
            });

            const cartsWithItemsIds = cartsWithItems.map((c) => c.cart_id);
            const emptyCartIds = cartIds.filter((id) => !cartsWithItemsIds.includes(id));

            if (emptyCartIds.length > 0) {
                await tx.carts.deleteMany({
                    where: { id: { in: emptyCartIds } }
                });
            }

            // 4️⃣ Group items by vendor_id
            const groupedItems = order_items.reduce((acc, item) => {
                const vendorId = item.vendor_id;
                if (!acc[vendorId]) acc[vendorId] = [];
                acc[vendorId].push(item);
                return acc;
            }, {});

            // 5️⃣ Create orders and order_items
            const orders = [];

            for (const [vendorId, items] of Object.entries(groupedItems)) {
                const totalAmount = items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);

                const order = await tx.orders.create({
                    data: {
                        users: { connect: { id: userId } },
                        vendor_id: parseInt(vendorId),
                        total_amount: totalAmount,
                        payment_status: payment_method === 'cod' ? 'Unpaid' : 'Paid'
                    }
                });

                const orderItemsData = items.map((item) => ({
                    order_id: order.id,
                    vendor_product_id: item.vendor_product_id,
                    quantity: item.quantity,
                    unit_price: item.unit_price
                }));

                await tx.order_Items.createMany({ data: orderItemsData });

                orders.push(order);
            }

            return orders;
        });

        return NextResponse.json(
            {
                message: 'Orders placed successfully, selected cart items removed, empty carts deleted',
                success: true,
                orders: results
            },
            { status: 200 }
        );
    } catch (err) {
        console.error('Error placing order:', err);
        return NextResponse.json({ error: 'Invalid request or server error.' }, { status: 400 });
    }
};
