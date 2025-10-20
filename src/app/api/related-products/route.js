import { NextResponse } from 'next/server';
import prisma from '@/config/prisma';

export const GET = async (request) => {
    try {
        const { searchParams } = new URL(request.url);
        const prod_id = searchParams.get('prod_id');

        if (!prod_id) {
            return NextResponse.json(
                {
                    error: 'Missing required product ID.',
                    success: false
                },
                { status: 400 }
            );
        }

        const currentProduct = await prisma.products.findUnique({
            where: {
                id: Number(prod_id)
            },
            select: {
                category_id: true
            }
        });

        if (!currentProduct) {
            return NextResponse.json(
                {
                    error: 'Product not found.',
                    success: false
                },
                { status: 404 }
            );
        }

        const relatedProducts = await prisma.vendor_Products.findMany({
            take: 4,
            where: {
                products: {
                    category_id: currentProduct.category_id
                },
                product_id: {
                    not: Number(prod_id)
                },
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
                },
                wish_lists: true
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
