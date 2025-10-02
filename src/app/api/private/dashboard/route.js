import { NextResponse } from 'next/server';
import prisma from '@/config/prisma';

export const GET = async (req) => {
    try {
        const vendorId = Number(req.headers.get('user_id'));

        if (!Number.isInteger(vendorId) || vendorId <= 0) {
            return NextResponse.json({ success: false, message: 'Unauthorized: invalid user' }, { status: 401 });
        }

        // ✅ Total number of vendor products
        const totalProducts = await prisma.vendor_Products.count({
            where: { vendor_id: vendorId }
        });

        // ✅ Get pending orders for vendor (with user info)
        const orderList = await prisma.orders.findMany({
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

        const users = await prisma.users.findMany({});

        // ✅ Calculate stats
        const totalOrders = orderList.length;
        const totalOrderAmount = orderList.reduce((sum, o) => sum + Number(o.total_amount || 0), 0);

        // ✅ Count distinct users from order list
        const uniqueUserIds = new Set(orderList.map((o) => o.users?.id).filter(Boolean));
        const totalUsers = uniqueUserIds.size;

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
