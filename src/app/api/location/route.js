import { NextResponse } from 'next/server';
import prisma from '@/config/prisma';

export const GET = async (req) => {
    try {
        const location_list = await prisma.geo_Locations.findMany({
            select: {
                id: true,
                parent_id: true,
                name: true,
                loc_type: true,
                full_address: true,
                is_active: true
            }
        });

        const processedLocations = location_list.map((loc) => {
            let short_address = loc.full_address;

            if (short_address && short_address.includes('>')) {
                const parts = short_address.split('>').map((p) => p.trim());
                const lastThree = parts.slice(-4).join(' > ');
                short_address = lastThree;
            }

            return {
                ...loc,
                full_address: short_address
            };
        });

        return NextResponse.json(
            {
                message: 'Location fetched successfully',
                success: true,
                total: processedLocations.length || 0,
                location_list: processedLocations
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching locations:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'An error occurred while fetching locations.',
                error: error.message
            },
            { status: 500 }
        );
    }
};
