import prisma from '@/config/prisma';
import { NextResponse } from 'next/server';

export const GET = async (req, { params }) => {
    try {
        const user_id = req.headers.get('user_id');
        const userId = Number(user_id);
        const { id } = await params;

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (!id) {
            return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
        }

        const order_data = await prisma.orders.findFirst({
            where: {
                id: Number(id),
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
        return NextResponse.json(
            {
                success: false,
                message: err.message
            },
            { status: 500 }
        );
    }
};
