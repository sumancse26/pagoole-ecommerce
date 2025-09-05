import { NextResponse } from 'next/server';
import prisma from '@/config/prisma';

export const GET = async (req) => {
    try {
        const { searchParams } = req.nextUrl;
        const type = searchParams.get('type');
        const parent_id = searchParams.get('parent_id');

        if (!type) {
            return NextResponse.json({ error: "Missing 'type' parameter" }, { status: 400 });
        }

        const list = await prisma.geo_Locations.findMany({
            where: {
                loc_type: type,
                parent_id: Number(parent_id) || undefined
            },
            select: {
                id: true,
                name: true,
                loc_type: true,
                full_address: true,
                is_active: true,
                parent_id: true
            }
        });

        return NextResponse.json(
            {
                message: 'List fetched successfully',
                success: true,
                list_data: list || []
            },
            { status: 200 }
        );
    } catch (err) {
        console.error('Error fetching regions:', err);
        return NextResponse.json({ error: 'Invalid req or server error.' }, { status: 400 });
    }
};
