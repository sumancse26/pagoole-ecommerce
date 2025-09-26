import { NextResponse } from 'next/server';
import prisma from '@/config/prisma';

export const GET = async (req) => {
    try {
        const weights = await prisma.weights.findMany({
            omit: {
                created_at: true,
                updated_at: true
            }
        });

        return NextResponse.json(
            {
                message: 'Weights fetched successfully',
                success: true,
                total: weights.length || 0,
                weights
            },
            { status: 200 }
        );
    } catch (err) {
        console.error('Error fetching  brands:', err);
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
};
