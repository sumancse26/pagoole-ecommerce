import { NextResponse } from 'next/server';
import prisma from '@/config/prisma';
import { revalidateTag } from 'next/cache';

export const GET = async (req) => {
    try {
        const userId = req.headers.get('user_id');
        const userRole = req.headers.get('user_role');
        if (Number(userId) < 0 || userId == null || userId == 'undefine') {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 401 });
        }

        const vendors = await prisma.vendors.findFirst({
            where: {
                user_id: Number(userId)
            }
        });

        let order_list = [];

        if (userRole == 0) {
            order_list = await prisma.orders.findMany({
                select: {
                    id: true,
                    order_code: true,
                    delivery_address: true,
                    total_amount: true,
                    order_status: true,
                    payment_method: true,
                    payment_status: true,
                    created_at: true,
                    updated_at: true,
                    users: {
                        select: {
                            id: true,
                            user_name: true,
                            email: true,
                            phone: true,
                            shipping_addresses: {
                                select: {
                                    id: true,
                                    address_line: true,
                                    city: true,
                                    region: true,
                                    phone: true,
                                    address_type: true,
                                    default_address: true
                                }
                            }
                        }
                    },
                    order_items: {
                        select: {
                            id: true,
                            quantity: true,
                            unit_price: true,
                            vendor_products: {
                                select: {
                                    id: true,
                                    price: true,
                                    stock_qty: true,
                                    is_active: true,
                                    vendor_id: true,
                                    products: {
                                        select: {
                                            id: true,
                                            prod_name: true,
                                            slug: true,
                                            description: true,
                                            mrp: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    id: 'desc'
                }
            });
        } else {
            order_list = await prisma.orders.findMany({
                where: {
                    order_items: {
                        some: {
                            vendor_products: {
                                vendor_id: vendors.id
                            }
                        }
                    }
                },
                select: {
                    id: true,
                    order_code: true,
                    delivery_address: true,
                    total_amount: true,
                    order_status: true,
                    payment_method: true,
                    payment_status: true,
                    created_at: true,
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
                        where: {
                            vendor_products: {
                                vendor_id: vendors.id
                            }
                        },
                        select: {
                            id: true,
                            quantity: true,
                            unit_price: true,
                            vendor_products: {
                                select: {
                                    id: true,
                                    price: true,
                                    stock_qty: true,
                                    is_active: true,
                                    vendor_id: true,
                                    products: {
                                        select: {
                                            id: true,
                                            prod_name: true,
                                            slug: true,
                                            description: true,
                                            mrp: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    id: 'desc'
                }
            });
            order_list;
        }

        console.log('order_list', order_list);

        return NextResponse.json(
            {
                success: true,
                message: 'Vendor orders fetched successfully',
                order_list
            },
            { status: 200 }
        );
    } catch (err) {
        console.error(err.message);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
};

export const PATCH = async (req) => {
    try {
        const userId = req.headers.get('user_id');
        const { id, action, type } = await req.json();

        if (Number(userId) < 0 || userId == null || userId == 'undefine') {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 401 });
        }

        const selectedOrder = await prisma.orders.findFirst({
            where: { id: Number(id) }
        });

        if (!selectedOrder) {
            return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
        }

        let newStatus = selectedOrder.order_status;
        if (action == 2) {
            switch (selectedOrder.order_status) {
                case 'Pending':
                    newStatus = 'Processing';
                    break;
                case 'Processing':
                    newStatus = 'Shipped';
                    break;
                case 'Shipped':
                    newStatus = 'InTransit';
                    break;
                case 'InTransit':
                    newStatus = 'Delivered';
                    break;
                case 'OutForDelivery':
                    newStatus = 'Delivered';
                    break;
                case 'Delivered':
                    newStatus = 'Completed';
                    break;
                case 'Completed':
                    return NextResponse.json(
                        {
                            success: false,
                            message: `Order is already ${selectedOrder.order_status.toLowerCase()} and cannot be updated further.`
                        },
                        { status: 400 }
                    );
                default:
                    return NextResponse.json({ success: false, message: 'Invalid current status.' }, { status: 400 });
            }
        }

        const updatedOrder = await prisma.orders.update({
            where: { id: Number(id) },
            data: {
                order_status: action == 2 ? newStatus : type,
                updated_at: new Date()
            }
        });

        let message = '';
        message =
            action == 2
                ? `Order status updated from "${selectedOrder.order_status}" to "${newStatus}" successfully.`
                : `Order ${type} Successfully`;
        revalidateTag('vendorOrderList');
        return NextResponse.json({
            success: true,
            message
        });
    } catch (err) {
        console.error('Error updating order status:', err);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
};
