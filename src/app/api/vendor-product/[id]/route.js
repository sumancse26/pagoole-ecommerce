import { NextResponse } from 'next/server';
import prisma from '@/config/prisma';

export const GET = async (req, { params }) => {
    try {
        const { id } = await params;

        const url = new URL(req.url);
        const searchString = url.searchParams.get('search');

        const whereClause = {
            vendor_id: Number(id),
            is_active: 1
        };

        if (searchString) {
            whereClause.products = {
                prod_name: {
                    contains: searchString,
                    mode: 'insensitive'
                }
            };
        }

        const vendorProducts = await prisma.vendor_Products.findMany({
            where: whereClause,
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
                        address: true,
                        store_logo: true
                    }
                },
                products: {
                    select: {
                        id: true,
                        slug: true,
                        description: true,
                        mrp: true,
                        prod_name: true,
                        brands: {
                            select: {
                                id: true,
                                name: true
                            }
                        },
                        product_images: {
                            select: {
                                id: true,
                                file_name: true
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
                message: 'Products fetched successfully',
                success: true,
                total: vendorProducts.length || 0,
                product_list: vendorProducts
            },
            { status: 200 }
        );
    } catch (err) {
        console.error('Error fetching vendor products:', err);
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
};
