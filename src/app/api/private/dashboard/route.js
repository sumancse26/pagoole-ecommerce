import { NextResponse } from 'next/server';
import prisma from '@/config/prisma';

export const GET = async (req) => {
    try {
        const vendorId = Number(req.headers.get('user_id'));
        const userRole = Number(req.headers.get('user_role'));

        if (!Number.isInteger(vendorId) || vendorId <= 0) {
            return NextResponse.json({ success: false, message: 'Unauthorized: invalid user' }, { status: 401 });
        }

        let totalProducts = 0;
        let orderList = [];

        if (userRole == 0) {
            totalProducts = await prisma.vendor_Products.count({});

            // ✅ Get pending orders for vendor (with user info)
            orderList = await prisma.orders.findMany({
                where: {
                    order_status: 'Pending'
                },
                select: {
                    id: true,
                    total_amount: true,
                    users: {
                        select: {
                            id: true,
                            user_name: true,
                            email: true,
                            phone: true
                        }
                    }
                }
            });
        }
        if (userRole == 1) {
            // ✅ Total number of vendor products
            totalProducts = await prisma.vendor_Products.count({
                where: { vendor_id: vendorId }
            });

            // ✅ Get pending orders for vendor (with user info)
            orderList = await prisma.orders.findMany({
                where: {
                    order_status: 'Pending',
                    order_items: {
                        some: {
                            vendor_products: { vendor_id: vendorId }
                        }
                    }
                },
                select: {
                    id: true,
                    total_amount: true,
                    users: {
                        select: {
                            id: true,
                            user_name: true,
                            email: true,
                            phone: true
                        }
                    }
                }
            });
        }

        const users = await prisma.users.findMany({});

        // ✅ Calculate stats
        const totalOrders = orderList.length;
        const totalOrderAmount = orderList.reduce((sum, o) => sum + Number(o.total_amount || 0), 0);

        const dashboardInfo = {
            total_products: totalProducts,
            total_orders: totalOrders,
            total_order_amount: totalOrderAmount,
            total_users: users?.length || 0
        };

        return NextResponse.json({ success: true, dashboard_info: dashboardInfo });
    } catch (err) {
        console.error('Error fetching vendor dashboard:', err);
        return NextResponse.json({ success: false, message: err?.message || 'Internal Server Error' }, { status: 500 });
    }
};
