import { NextResponse } from 'next/server';
import prisma from '@/config/prisma';

export const GET = async (req) => {
    try {
        const vendorProducts = await prisma.vendor_Products.findMany({
            select: {
                id: true,
                price: true,
                stock_qty: true,
                is_active: true,
                Products: {
                    select: {
                        id: true,
                        slug: true,
                        description: true,
                        mrp: true,
                        vat: true
                    }
                }
            }
        });

        return NextResponse.json(
            {
                message: 'Products fetched successfully',
                success: true,
                product_list: vendorProducts
            },
            { status: 200 }
        );
    } catch (err) {
        console.error('Error fetching vendor products:', err);
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
};
