import prisma from '@/config/prisma';
import { NextResponse } from 'next/server';

export const GET = async (req) => {
    try {
        const userId = req.headers.get('user_id');

        if (!userId) {
            return NextResponse.json({ success: false, message: 'Unauthorized user' }, { status: 401 });
        }

        const productList = await prisma.vendor_Products.findMany({
            where: { vendor_id: Number(userId) },
            select: {
                id: true,
                price: true,
                stock_qty: true,
                is_active: true,
                products: {
                    select: {
                        id: true,
                        prod_name: true,
                        slug: true,
                        description: true,
                        mrp: true,
                        vat: true,
                        file_server: {
                            select: {
                                id: true,
                                name: true,
                                base_url: true
                            }
                        },
                        product_images: {
                            select: {
                                id: true,
                                file_name: true
                            }
                        }
                    }
                },
                categories: {
                    select: {
                        id: true,
                        category_name: true
                    }
                }
            }
        });

        return NextResponse.json({
            success: true,
            message: 'Product list fetched successfully.',
            product_list: productList || []
        });
    } catch (err) {
        return NextResponse.json({ success: false, message: err.message }, { status: 500 });
    }
};
