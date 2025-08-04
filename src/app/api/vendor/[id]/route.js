import { NextResponse } from 'next/server';
import prisma from '@/config/prisma';

export const GET = async (req, { params }) => {
    try {
        const { id } = await params;
        const vendor_list = await prisma.vendors.findMany({
            where: {
                location_id: Number(id)
            },
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
            { message: 'Vendor fetched successfully', success: true, vendor_list },
            { status: 200 }
        );
    } catch (err) {
        console.error('Error parsing request body:', err);
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
};
