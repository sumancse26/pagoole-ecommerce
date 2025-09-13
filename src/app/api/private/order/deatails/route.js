import prisma from '@/config/prisma';
import { NextResponse } from 'next/server';

export const GET = async (req) => {
    try {
        const userId = req.headers.get('userId');

        if (!userId) {
            return NextResponse.json({
                success: false,
                message: 'Unauthorized user'
            });
        }

        const orderList = await prisma.orders.findMany({
            where: {
                user_id: Number(userId)
            },
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
            message: 'Order list fetched successfully.'
        });
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
