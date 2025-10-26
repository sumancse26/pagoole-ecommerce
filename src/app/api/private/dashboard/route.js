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

        // 🧮 Vendor (userRole == 1)
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
                    },
                    order_status: {
                        in: [
                            'Pending',
                            'Processing',
                            'Shipped',
                            'InTransit',
                            'OutForDelivery',
                            'Delivered',
                            'Completed',
                            'Returned',
                            'Cancelled'
                        ]
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
                    order_counts: {
                        Pending: 0,
                        Processing: 0,
                        Shipped: 0,
                        InTransit: 0,
                        OutForDelivery: 0,
                        Delivered: 0,
                        Completed: 0,
                        Returned: 0,
                        Cancelled: 0
                    }
                }
            });
        }

        // ✅ Initialize order status map
        const validStatuses = [
            'Pending',
            'Processing',
            'Shipped',
            'InTransit',
            'OutForDelivery',
            'Delivered',
            'Completed',
            'Returned',
            'Cancelled'
        ];

        const statusCounts = Object.fromEntries(validStatuses.map((s) => [s, 0]));
        const statusAmounts = Object.fromEntries(validStatuses.map((s) => [s, 0]));

        // ✅ Compute counts and totals
        for (const order of allOrders) {
            const status = order.order_status || 'Unknown';
            if (validStatuses.includes(status)) {
                statusCounts[status]++;
                statusAmounts[status] += Number(order.total_amount || 0);
            }
        }

        // ✅ Compute overall totals
        const totalOrders = allOrders.length;
        const totalOrderAmount = allOrders.reduce((sum, o) => sum + Number(o.total_amount || 0), 0);

        // ✅ Get total users (admins)
        const users = await prisma.users.findMany({ where: { is_admin: 1 } });

        // ✅ Prepare dashboard info
        const dashboardInfo = {
            total_products: totalProducts,
            total_orders: totalOrders,
            total_order_amount: totalOrderAmount,
            total_users: users?.length || 0,
            order_counts: statusCounts,
            order_amounts: statusAmounts
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
