import { NextResponse } from 'next/server';
import prisma from '@/config/prisma';

export const GET = async (req) => {
    try {
        const brands = await prisma.wishlists.findMany({
            omit: {
                created_at: true,
                updated_at: true
            }
        });

        return NextResponse.json(
            {
                message: 'Wish List fetched successfully',
                success: true,
                total: brands.length || 0,
                brands
            },
            { status: 200 }
        );
    } catch (err) {
        console.error('Error fetching  brands:', err);
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
};
