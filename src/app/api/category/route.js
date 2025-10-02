import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const categories = await prisma.categories.findMany({
            where: { is_active: 1 },
            include: {
                children: {
                    include: {
                        children: true // grandchildren (you can nest more if needed)
                    }
                }
            },
            orderBy: {
                order_by: 'asc'
            }
        });

        return NextResponse.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
