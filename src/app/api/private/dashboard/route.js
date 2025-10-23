import { NextResponse } from 'next/server';
import prisma from '@/config/prisma';

export const GET = async (req) => {
    try {
        const userId = Number(req.headers.get('user_id'));
        const userRole = Number(req.headers.get('user_role'));

        // 🧩 Validate user ID
        if (!Number.isInteger(userId) || userId <= 0) {
            return NextResponse.json({ success: false, message: 'Unauthorized: invalid user' }, { status: 401 });
        }

        // 🧩 Get vendor info if vendor
        const vendorInfo =
            userRole === 1
                ? await prisma.vendors.findFirst({
                      where: { user_id: userId }
                  })
                : null;

        let totalProducts = 0;
        let allOrders = [];

        // 🧮 Admin (userRole == 0)
        if (userRole === 0) {
            totalProducts = await prisma.vendor_Products.count();

            allOrders = await prisma.orders.findMany({
                orderBy: { id: 'desc' },
                include: {
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

        if (userRole === 1 && vendorInfo) {
            totalProducts = await prisma.vendor_Products.count({
                where: { vendor_id: vendorInfo.id }
            });

            allOrders = await prisma.orders.findMany({
                where: {
                    order_items: {
                        some: {
                            vendor_products: { vendor_id: vendorInfo.id }
                        }
                    }
                },
                orderBy: { id: 'desc' },
                include: {
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

        // ✅ Handle no orders
        if (!allOrders || allOrders.length === 0) {
            const users = await prisma.users.findMany({ where: { is_admin: 1 } });

            return NextResponse.json({
                success: true,
                message: 'No orders found for this vendor.',
                dashboard_info: {
                    total_products: totalProducts,
                    total_orders: 0,
                    total_order_amount: 0,
                    total_users: users?.length || 0,
                    order_counts: {}
                }
            });
        }

        // ✅ Group orders by status
        const groupedOrders = allOrders.reduce((acc, order) => {
            const status = order.order_status || 'Unknown';
            if (!acc[status]) acc[status] = [];
            acc[status].push(order);
            return acc;
        }, {});

        // ✅ Compute count per status
        const statusCounts = Object.fromEntries(
            Object.entries(groupedOrders).map(([status, orders]) => [status, orders.length])
        );

        // ✅ Calculate totals for Pending orders only
        const pendingOrders = groupedOrders.Pending || [];
        const totalOrders = pendingOrders.length;
        const totalOrderAmount = pendingOrders.reduce((sum, o) => sum + Number(o.total_amount || 0), 0);

        // ✅ Get total users (admins)
        const users = await prisma.users.findMany({ where: { is_admin: 1 } });

        // ✅ Prepare dashboard info
        const dashboardInfo = {
            total_products: totalProducts,
            total_orders: totalOrders,
            total_order_amount: totalOrderAmount,
            total_users: users?.length || 0,
            order_counts: statusCounts
        };

        // ✅ Return structured response
        return NextResponse.json({
            success: true,
            message: 'Dashboard data fetched successfully',
            dashboard_info: dashboardInfo
        });
    } catch (err) {
        console.error('Error fetching vendor dashboard:', err);
        return NextResponse.json({ success: false, message: err?.message || 'Internal Server Error' }, { status: 500 });
    }
};
