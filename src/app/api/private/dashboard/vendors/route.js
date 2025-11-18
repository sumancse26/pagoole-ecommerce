import { NextResponse } from 'next/server';
import prisma from '@/config/prisma';
import { revalidateTag } from 'next/cache';

export const GET = async (req) => {
    try {
        const userId = Number(req.headers.get('user_id'));
           
        if (Number(userId) < 0 || userId == null || userId =='undefine') {
            return NextResponse.json({ success: false, message: 'Unauthorized: invalid user' }, { status: 401 });
        }
        const vendor_list = await prisma.vendors.findMany({
            where: {
                users: {
                    is_admin: 1
                }
            },
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

export const PATCH = async (req) => {
    try {
        const userId = Number(req.headers.get('user_id'));
        if (Number(userId) < 0 || userId == null || userId =='undefine') {
            return NextResponse.json({ success: false, message: 'Unauthorized: invalid user' }, { status: 401 });
        }

       

        const data = await req.json();

         const userInfo = await prisma.vendors.findUnique({
            where: {
                id: Number(data.vendor_id) 
            }
        })

        await prisma.users.update({
            where: { id: Number(userInfo.user_id) },
            data: { is_active: 1 }
        });
        await prisma.vendors.update({
            where: { id: Number(data.vendor_id) },
            data: { is_active: 1 }
        });

        revalidateTag('dashboardVendorList');
        return NextResponse.json({ message: 'Vendor updated successfully', success: true }, { status: 200 });
    } catch (err) {
        console.error('Error parsing request body:', err);
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
};
