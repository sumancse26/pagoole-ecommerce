import { NextResponse } from 'next/server';
import prisma from '@/config/prisma';

export const GET = async (req) => {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get('q') || '';

        const vendorProducts = await prisma.vendor_Products.findMany({
            where: {
                is_active: 1,
                OR: [
                    {
                        products: {
                            prod_name: {
                                contains: query,
                                mode: 'insensitive'
                            }
                        }
                    },
                    {
                        products: {
                            slug: {
                                contains: query,
                                mode: 'insensitive'
                            }
                        }
                    },
                    {
                        vendors: {
                            store_name: {
                                contains: query,
                                mode: 'insensitive'
                            }
                        }
                    },
                    {
                        products: {
                            categories: {
                                category_name: {
                                    contains: query,
                                    mode: 'insensitive'
                                }
                            }
                        }
                    }
                ]
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
                        address: true
                    }
                },
                products: {
                    select: {
                        id: true,
                        slug: true,
                        prod_name: true,
                        description: true,
                        mrp: true,
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
            },
            orderBy: {
                created_at: 'desc'
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
        return NextResponse.json(
            {
                message: 'Invalid request',
                success: false,
                total: 0,
                product_list: []
            },
            { status: 400 }
        );
    }
};
