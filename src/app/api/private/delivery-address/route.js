import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import prisma from '@/config/prisma';
import { revalidateTag } from 'next/cache';

export const POST = async (req) => {
    try {
        const headersList = await headers();
        const userIdString = headersList.get('user_id');

        if (Number(userIdString) < 0 || userIdString == null || userIdString =='undefine') {
            return NextResponse.json({ message: 'Unauthorized User', success: false }, { status: 401 });
        }

        const userId = parseInt(userIdString, 10);
        if (isNaN(userId)) {
            return NextResponse.json({ message: 'Invalid user ID format in header.', success: false }, { status: 400 });
        }

        const body = await req.json();

        const { full_name, phone, address_line, region, city, area, address_type, country = 'Bangladesh' } = body;

        if (!full_name || !phone || !address_line || !region || !city || !area || !address_type) {
            return NextResponse.json({ message: 'All fields are required.', success: false }, { status: 400 });
        }

        const existedUser = await prisma.shipping_Addresses.findFirst({
            where: { user_id: userId, address_type: address_type }
        });

        if (!existedUser) {
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
            revalidateTag('deliveryAddressList');

            return NextResponse.json(
                { message: 'Delivery address added successfully.', success: true },
                { status: 200 }
            );
        } else {
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

            revalidateTag('deliveryAddressList');
            return NextResponse.json(
                { message: 'Delivery address updated successfully.', success: true },
                { status: 200 }
            );
        }
    } catch (err) {
        if (err.code === 'P2003') {
            return NextResponse.json(
                { message: 'The provided product or user ID does not exist.', success: false },
                { status: 404 }
            );
        }
        return NextResponse.json({ message: 'An internal server error occurred.', success: false }, { status: 500 });
    }
};

export const GET = async (req) => {
    try {
        const headersList = await headers();
        const userIdString = headersList.get('user_id');

        if (Number(userIdString) < 0 || userIdString == null || userIdString =='undefine') {
            return NextResponse.json({ message: 'Unauthorized User', success: false }, { status: 401 });
        }

        const userId = parseInt(userIdString, 10);
        if (isNaN(userId)) {
            return NextResponse.json({ message: 'Invalid user ID format in header.', success: false }, { status: 400 });
        }

        const address = await prisma.shipping_Addresses.findMany({
            where: { user_id: userId }
        });

        if (!address) {
            return NextResponse.json({ message: 'No delivery address found.', success: false }, { status: 404 });
        }

        return NextResponse.json(
            { message: 'Delivery addresses fetched successfully.', success: true, address_list: address },
            { status: 200 }
        );
    } catch (err) {
        if (err.code === 'P2003') {
            return NextResponse.json(
                { message: 'The provided product or user ID does not exist.', success: false },
                { status: 404 }
            );
        }
        return NextResponse.json({ message: 'An internal server error occurred.', success: false }, { status: 500 });
    }
};

export const PUT = async (req) => {
    try {
        // Get user ID from headers
        const headersList = await headers();
        const userIdString = headersList.get('user_id');

        if (Number(userIdString) < 0 || userIdString == null || userIdString =='undefine'){
            return NextResponse.json({ message: 'Unauthorized User', success: false }, { status: 401 });
        }

        const userId = parseInt(userIdString, 10);
        if (isNaN(userId)) {
            return NextResponse.json({ message: 'Invalid user ID format in header.', success: false }, { status: 400 });
        }

        // Get address_id from request body
        const body = await req.json();
        const { address_id } = body;

        if (!address_id) {
            return NextResponse.json({ message: 'Address ID is required.', success: false }, { status: 400 });
        }

        // Verify that the address exists and belongs to the user
        const address = await prisma.shipping_Addresses.findFirst({
            where: { id: address_id, user_id: userId }
        });

        if (!address) {
            return NextResponse.json({ message: 'Address not found.', success: false }, { status: 404 });
        }

        // Reset default_address for all other addresses of the user
        await prisma.shipping_Addresses.updateMany({
            where: { user_id: userId, id: { not: address_id } }, // all except selected
            data: { default_address: '0' }
        });

        // 2️⃣ Set the selected address as default
        await prisma.shipping_Addresses.update({
            where: { id: address_id },
            data: { default_address: '1' }
        });

        revalidateTag('deliveryAddressList');

        return NextResponse.json({ message: 'Default address updated successfully.', success: true }, { status: 200 });
    } catch (err) {
        console.error('Error updating default address:', err);

        // Prisma foreign key error
        if (err?.code === 'P2003') {
            return NextResponse.json(
                { message: 'The provided address or user ID does not exist.', success: false },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: 'An internal server error occurred.', success: false }, { status: 500 });
    }
};
