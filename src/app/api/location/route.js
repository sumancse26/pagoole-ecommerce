import { NextResponse } from 'next/server';
import prisma from '@/config/prisma';
export const GET = async (req) => {
    try {
        const location_list = await prisma.geo_Locations.findMany({});

        return NextResponse.json(
            {
                message: 'Location fetched successfully',
                success: true,
                total: location_list.length || 0,
                location_list
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error parsing request body:', error);
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
};
