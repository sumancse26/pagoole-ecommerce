import { NextResponse } from 'next/server';
import prisma from '@/config/prisma';
import { encryptJSPassword, jwtEncode } from '@/utils';
import { cookies } from 'next/headers';

export const POST = async (req) => {
    try {
        //setting cookie in server side
        const cookieStore = await cookies();
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
            store_logo,
            isCustomer,
            name = ''
        } = body;

        if (!isCustomer) {
            if (!(user_name || email || password || store_name || location_id)) {
                return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
            }
            const hashedPassword = (await encryptJSPassword(password?.toString())) || '';
            await prisma.$transaction(async (tx) => {
                const savedUser = await tx.users.create({
                    data: {
                        user_name,
                        email,
                        phone: phone || '',
                        password: hashedPassword,
                        otp: 0,
                        is_admin: 0,
                        image: image || ''
                    }
                });

                const savedVendor = await tx.vendors.create({
                    data: {
                        user_id: savedUser.id,
                        store_name,
                        store_description: store_description || '',
                        address: address || '',
                        location_id,
                        otp: 0,
                        store_logo: store_logo || ''
                    }
                });

                return savedVendor;
            });

            return NextResponse.json({ message: 'User registered successfully', success: true }, { status: 200 });
        }
    } catch (error) {
        console.error('Error parsing request body:', error);
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
};
