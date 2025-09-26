import { NextResponse } from 'next/server';
import prisma from '@/config/prisma';
import Category from '@/app/dashboard/category/page';

export const GET = async (req) => {
    try {
        const categories = await prisma.categories.findMany({
            omit: {
                is_active: true,
                order_by: true,
                created_at: true,
                updated_at: true
            }
        });

        console.log('category', Category);

        return NextResponse.json(
            { message: 'Category fetched successfully', success: true, categories },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error parsing request body:', error);
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
};
