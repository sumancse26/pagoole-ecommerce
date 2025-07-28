import { NextResponse } from 'next/server';
import prisma from '@/config/prisma';
import { encryptPassword } from '@/utils';
export const POST = async (req) => {
    try {
        const body = await req.json();
        const {
            user_name,
            email,
            password,
            phone,
            store_name,
            store_description,
            address,
            location_id,
            image,
            store_logo
        } = body;

        if (!user_name || !email || !password || !store_name || !location_id) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }
        const hashedPassword = await encryptPassword(password?.toString());
        await prisma.$transaction([
            prisma.users.create({
                data: {
                    user_name,
                    email,
                    phone,
                    password: hashedPassword,
                    otp: 0,
                    is_admin: 0,
                    image
                }
            }),

            prisma.vendors.create({
                data: {
                    user_id: 1,
                    store_name,
                    store_description,
                    address,
                    location_id,
                    otp: 0,
                    store_logo
                }
            })
        ]);

        return NextResponse.json({ message: 'User registered successfully', success: true }, { status: 200 });
    } catch (error) {
        console.error('Error parsing request body:', error);
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
};
