import { NextResponse } from 'next/server';
import prisma from '@/config/prisma';

export const GET = async (req) => {
    try {
        const vendor_list = await prisma.vendors.findMany({
            omit: {
                is_active: true,
                is_admin: true,
                otp: true,
                password: true,
                created_at: true,
                updated_at: true
            }
        });
        return NextResponse.json(
            { message: 'Vendor fetched successfully', total: vendor_list.length || 0, success: true, vendor_list },
            { status: 200 }
        );
    } catch (err) {
        console.error('Error parsing request body:', err);
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
};
