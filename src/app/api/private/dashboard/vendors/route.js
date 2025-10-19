import { NextResponse } from 'next/server';
import prisma from '@/config/prisma';

export const GET = async (req) => {
    try {
        const vendor_list = await prisma.vendors.findMany({
            select: {
                id: true,
                user_id: true,
                store_name: true,
                store_description: true,
                address: true,
                location_id: true,
                is_active: true,
                store_logo: true
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
