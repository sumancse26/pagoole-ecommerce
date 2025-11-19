import prisma from '@/config/prisma';
import { NextResponse } from 'next/server';

export const GET = async (req) => {
    try {
        const userId = req.headers.get('user_id');

        if (Number(userId) < 0 || userId == null || userId == 'undefine') {
            return NextResponse.json({ success: false, message: 'Unauthorized user' }, { status: 401 });
        }

        const orderList = await prisma.orders.findMany({
            where: { user_id: Number(userId) },
            select: {
                id: true,
                user_id: true,
                order_code: true,
                total_amount: true,
                order_status: true,
                payment_status: true
            }
        });

        return NextResponse.json({
            success: true,
            message: 'Order list fetched successfully.',
            order_list: orderList ?? []
        });
    } catch (err) {
        return NextResponse.json({ success: false, message: err.message }, { status: 500 });
    }
};
