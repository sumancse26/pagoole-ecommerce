import { NextResponse } from 'next/server';
import prisma from '@/config/prisma';

export const GET = async (req, { params }) => {
    try {
        const { id } = await params;
        const locationId = Number(id);

        if (isNaN(locationId)) {
            return NextResponse.json({ success: false, message: 'Invalid location ID format' }, { status: 400 });
        }

        const getAllChildLocationIds = async (parentId) => {
            const children = await prisma.geo_Locations.findMany({
                where: { parent_id: parentId },
                select: { id: true }
            });

            if (children.length === 0) return [parentId];

            const ids = [parentId];
            for (const child of children) {
                const nestedIds = await getAllChildLocationIds(child.id);
                ids.push(...nestedIds);
            }
            return ids;
        };

        const allLocationIds = await getAllChildLocationIds(locationId);

        const vendors = await prisma.vendors.findMany({
            where: {
                location_id: { in: allLocationIds },
                is_active: 1
            },
            select: {
                id: true,
                user_id: true,
                store_name: true,
                store_description: true,
                address: true,
                location_id: true,
                store_logo: true
            }
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Vendors fetched successfully',
                total: vendors.length,
                vendor_list: vendors
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching vendors:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'An error occurred while fetching vendors.',
                error: error.message
            },
            { status: 500 }
        );
    }
};

// export const GET = async (req, { params }) => {
//     try {
//         const { id } = await params;
//         const locationId = Number(id);

//         if (isNaN(locationId)) {
//             return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
//         }

//         const count = await prisma.vendors.count({
//             where: {
//                 location_id: locationId
//             }
//         });

//         let whereClause;

//         if (count > 0) {
//             whereClause = {
//                 location_id: locationId,
//                 is_active: 1
//             };
//         } else {
//             whereClause = {
//                 location_id: locationId,
//                 is_active: 1
//             };
//         }

//         const vendor_list = await prisma.vendors.findMany({
//             where: whereClause,
//             select: {
//                 id: true,
//                 user_id: true,
//                 store_name: true,
//                 store_description: true,
//                 address: true,
//                 location_id: true,
//                 store_logo: true
//             }
//         });

//         return NextResponse.json(
//             {
//                 message: 'Vendor fetched successfully',
//                 success: true,
//                 total: vendor_list.length,
//                 vendor_list
//             },
//             { status: 200 }
//         );
//     } catch (err) {
//         console.error('Error fetching vendors:', err);
//         return NextResponse.json(
//             { message: 'An error occurred while fetching vendors.', success: false, error: err.message },
//             { status: 500 }
//         );
//     }
// };
