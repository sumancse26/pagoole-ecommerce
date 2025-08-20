import { NextResponse } from 'next/server';
import prisma from '@/config/prisma';

export const GET = async (request) => {
    try {
        const { searchParams } = new URL(request.url);

        const prod_id = searchParams.get('prod_id');

        if (!prod_id) {
            return NextResponse.json(
                {
                    error: 'Missing required parameters are required.',
                    success: false
                },
                { status: 400 }
            );
        }

        const relatedProducts = await prisma.vendor_Products.findMany({
            take: 4, // This will limit the result to a maximum of 4 records.
            where: {
                product_id: Number(prod_id),
                is_active: 1,
                stock_qty: {
                    gt: 0
                }
            },
            select: {
                id: true,
                price: true,
                stock_qty: true,
                is_active: true,
                vendors: {
                    select: {
                        id: true,
                        store_name: true,
                        store_description: true,
                        address: true
                    }
                },
                products: {
                    select: {
                        id: true,
                        slug: true,
                        description: true,
                        mrp: true,
                        vat: true,
                        brands: {
                            select: {
                                id: true,
                                name: true
                            }
                        },
                        file_server: {
                            select: {
                                id: true,
                                base_url: true
                            }
                        },
                        categories: {
                            select: {
                                id: true,
                                category_name: true
                            }
                        }
                    }
                }
            }
        });

        return NextResponse.json(
            {
                message: 'Related products fetched successfully',
                success: true,
                related_products: relatedProducts || []
            },
            { status: 200 }
        );
    } catch (err) {
        console.error('Error fetching related products:', err);

        return NextResponse.json(
            {
                error: 'An internal server error occurred.',
                success: false
            },
            { status: 500 }
        );
    }
};
