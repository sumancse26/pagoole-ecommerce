import { NextResponse } from 'next/server';
import prisma from '@/config/prisma';

export const GET = async (req, { params }) => {
    try {
        const { id } = params; // params already contains the id directly

        // Extract search string from URL query parameters
        const url = new URL(req.url);
        const searchString = url.searchParams.get('search'); // Get the 'search' query parameter
        console.log('searchString', searchString);
        // Define the base `where` clause
        const whereClause = {
            vendor_id: Number(id),
            is_active: 1
        };

        // If a search string is provided, add the product name filter
        if (searchString) {
            // We need to filter by product name, which is nested under `products`
            // Prisma allows filtering on related models like this:
            whereClause.products = {
                name: {
                    contains: searchString,
                    mode: 'insensitive' // Case-insensitive search
                }
            };
        }

        const vendorProducts = await prisma.vendor_Products.findMany({
            where: whereClause, // Use the dynamically constructed where clause
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
