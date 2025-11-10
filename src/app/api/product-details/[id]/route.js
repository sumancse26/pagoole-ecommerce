import { NextResponse } from 'next/server';
import prisma from '@/config/prisma';

export const GET = async (req, { params }) => {
    try {
        const { id } = await params;

        const vendorProducts = await prisma.vendor_Products.findMany({
            where: {
                product_id: Number(id)
            },
            select: {
                id: true,
                product_id: true,
                price: true,
                stock_qty: true,
                is_active: true,
                vendors: {
                    select: {
                        id: true,
                        store_name: true,
                        store_description: true,
                        address: true,
                        users: {
                            select: {
                                id: true,
                                phone: true,
                                email: true,
                            }
                        }
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
                                name: true,
                                brand_logo: true
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
                message: 'Product fetched successfully',
                success: true,
                product_details: vendorProducts || []
            },
            { status: 200 }
        );
    } catch (err) {
        console.error('Error fetching vendor products:', err);
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
};
