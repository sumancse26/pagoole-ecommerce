import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import prisma from '@/config/prisma';

export const POST = async (req) => {
    try {
        // Get headers
        const headersList = await headers();
        const userIdString = headersList.get('user_id');

        // Check if user_id header exists
        if (!userIdString) {
            return NextResponse.json({ message: 'Unauthorized User', success: false }, { status: 401 });
        }

        // Parse user ID from header
        const userId = parseInt(userIdString, 10);
        if (isNaN(userId)) {
            return NextResponse.json({ message: 'Invalid user ID format in header.', success: false }, { status: 400 });
        }

        // Parse request body
        const body = await req.json();
        const { full_name, phone, address_line, region, city, area, address_type, country = 'Bangladesh' } = body;

        // Validate required fields
        if (!full_name || !phone || !address_line || !region || !city || !area || !address_type) {
            return NextResponse.json({ message: 'All fields are required.', success: false }, { status: 400 });
        }

        // Check for existing address by user_id and address_type
        const existedUser = await prisma.shipping_Addresses.findFirst({
            where: { user_id: userId, address_type: address_type }
        });

        if (!existedUser) {
            // Create new shipping address
            await prisma.shipping_Addresses.create({
                data: {
                    user_id: userId,
                    full_name,
                    phone,
                    address_line,
                    region,
                    city,
                    area,
                    address_type: address_type || 'home',
                    country
                }
            });

            return NextResponse.json(
                { message: 'Delivery address added successfully.', success: true },
                { status: 200 }
            );
        } else {
            // Update existing shipping address (use composite key or unique constraint in your model)
            await prisma.shipping_Addresses.updateMany({
                where: { user_id: userId, address_type: address_type },
                data: {
                    full_name,
                    phone,
                    address_line,
                    region,
                    city,
                    area,
                    address_type: address_type || 'home',
                    country
                }
            });

            return NextResponse.json(
                { message: 'Delivery address updated successfully.', success: true },
                { status: 200 }
            );
        }
    } catch (err) {
        // Prisma foreign key error
        if (err.code === 'P2003') {
            return NextResponse.json(
                { message: 'The provided product or user ID does not exist.', success: false },
                { status: 404 }
            );
        }
        // General error
        return NextResponse.json({ message: 'An internal server error occurred.', success: false }, { status: 500 });
    }
};
