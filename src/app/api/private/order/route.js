import { NextResponse } from 'next/server';
import prisma from '@/config/prisma';

export const POST = async (req) => {
    try {
        const id = req.headers.get('user_id');
        const userId = Number(id);

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { order_items, payment_method, delivery_address } = await req.json();

        if (!delivery_address) {
            return NextResponse.json({ error: 'No delivery address found' }, { status: 400 });
        }
        if (!order_items || !order_items.length) {
            return NextResponse.json({ error: 'No items to order' }, { status: 400 });
        }

        const results = await prisma.$transaction(async (tx) => {
            const cartIds = [...new Set(order_items.map((item) => item.cart_id))];

            for (const item of order_items) {
                await tx.cart_Items.deleteMany({
                    where: {
                        cart_id: item.cart_id,
                        vendor_prod_id: item.vendor_product_id
                    }
                });
            }

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

            const totalAmount = order_items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);

            const lastId = await prisma.orders.count();
            const orderNo = `ORD${lastId + 1}`;

            const order = await tx.orders.create({
                data: {
                    users: { connect: { id: userId } },
                    delivery_address: Number(delivery_address),
                    order_code: orderNo,
                    total_amount: totalAmount,
                    payment_status: payment_method === 'cod' ? 'Unpaid' : 'Paid'
                }
            });
            const orderItemsData = order_items.map((item) => ({
                order_id: order.id,
                vendor_product_id: item.vendor_product_id,
                quantity: item.quantity,
                unit_price: item.unit_price
            }));

            // Insert all order_items
            await tx.order_Items.createMany({ data: orderItemsData });

            return order;
        });

        return NextResponse.json(
            {
                message: 'Orders placed successfully, selected cart items removed, empty carts deleted',
                success: true,
                id: results.id
            },
            { status: 200 }
        );
    } catch (err) {
        console.error('Error placing order:', err);
        return NextResponse.json({ error: 'Invalid request or server error.' }, { status: 400 });
    }
};

export const GET = async (req, { params }) => {
    try {
        const id = req.headers.get('user_id');
        const userId = Number(id);

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const orderId = searchParams.get('id');

        if (!orderId) {
            return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
        }

        const order_data = await prisma.orders.findFirst({
            where: {
                id: Number(orderId),
                user_id: userId
            },
            select: {
                id: true,
                total_amount: true,
                order_status: true,
                payment_status: true,
                delivery_address: true,
                order_code: true,
                updated_at: true,
                users: {
                    select: {
                        id: true,
                        user_name: true,
                        email: true,
                        phone: true
                    }
                },
                order_items: {
                    select: {
                        id: true,
                        order_id: true,
                        vendor_product_id: true,
                        quantity: true,
                        unit_price: true,
                        vendor_products: {
                            select: {
                                id: true,
                                products: {
                                    select: {
                                        id: true,
                                        prod_name: true,
                                        file_server: {
                                            select: {
                                                id: true,
                                                base_url: true
                                            }
                                        }
                                    }
                                },
                                vendors: {
                                    select: {
                                        id: true,
                                        store_name: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        if (!order_data) {
            return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
        }

        const address = await prisma.shipping_Addresses.findFirst({
            where: {
                id: Number(order_data.delivery_address),
                user_id: userId
            }
        });

        const orderData = {
            ...order_data,
            address
        };

        return NextResponse.json(
            {
                success: true,
                message: 'Order fetched successfully',
                order_data: orderData
            },
            { status: 200 }
        );
    } catch (err) {
        console.error('Error fetching order:', err);
        return NextResponse.json(
            {
                success: false,
                message: 'Internal server error'
            },
            { status: 500 }
        );
    }
};
