import { NextResponse } from 'next/server';
import prisma from '@/config/prisma';

export const GET = async (req) => {
    try {
        const userId = Number(req.headers.get('user_id'));
        if (Number(userId) < 0 || userId == null || userId =='undefine') {
            return NextResponse.json({ success: false, message: 'Unauthorized: invalid user' }, { status: 401 });
        }

        const userInfo = await prisma.users.findFirst({
            where: {
                id: Number(userId)
            },
            select: {
                id: true,
                user_name: true,
                email: true,
                phone: true,
                image: true
            }
        });

        return NextResponse.json({
            success: true,
            user_info: userInfo || []
        });
    } catch (err) {
        console.error('Error fetching user:', err);
        return NextResponse.json({ success: false, message: err?.message || 'Internal Server Error' }, { status: 500 });
    }
};
