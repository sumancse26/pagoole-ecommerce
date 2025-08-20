import { NextResponse } from 'next/server';
import prisma from '@/config/prisma';

export const GET = async (req, { params }) => {
    try {
        const { id } = await params;
        const locationId = Number(id);

        if (isNaN(locationId)) {
            return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
        }

        const count = await prisma.vendors.count({
            where: {
                parent_location_id: locationId
            }
        });

        let whereClause;

        if (count > 0) {
            whereClause = {
                parent_location_id: locationId
            };
        } else {
            whereClause = {
                location_id: locationId
            };
        }

        const vendor_list = await prisma.vendors.findMany({
            where: whereClause,
            select: {
                id: true,
                user_id: true,
                store_name: true,
                store_description: true,
                address: true,
                location_id: true,
                parent_location_id: true,
                store_logo: true
            }
        });

        return NextResponse.json(
            {
                message: 'Vendor fetched successfully',
                success: true,
                total: vendor_list.length,
                vendor_list
            },
            { status: 200 }
        );
    } catch (err) {
        console.error('Error fetching vendors:', err);
        return NextResponse.json(
            { message: 'An error occurred while fetching vendors.', success: false, error: err.message },
            { status: 500 }
        );
    }
};
