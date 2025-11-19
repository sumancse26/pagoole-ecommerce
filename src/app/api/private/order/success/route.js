import { NextResponse } from 'next/server';
import prisma from '@/config/prisma';

export const GET = async (req, { params }) => {
    try {
        const id = req.headers.get('user_id');
        const userId = Number(id);

        if (Number(userId) < 0 || userId == null || userId == 'undefine') {
            return NextResponse.json({ success: false, message: 'Unauthorized user' }, { status: 401 });
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
                                        product_images: {
                                            select: {
                                                id: true,
                                                file_name: true
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
