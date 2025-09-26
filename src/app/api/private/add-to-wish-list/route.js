import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import prisma from '@/config/prisma';
import { revalidateTag } from 'next/cache';

export const POST = async (req) => {
    try {
        const headersList = await headers();

        const userIdString = headersList.get('user_id');

        if (!userIdString) {
            return NextResponse.json({ message: 'Unauthorized User', success: false }, { status: 401 });
        }

        const userId = parseInt(userIdString, 10);
        if (isNaN(userId)) {
            return NextResponse.json({ message: 'Invalid user ID format in header.', success: false }, { status: 400 });
        }

        const body = await req.json();
        const { vendor_prod_id } = body;

        if (!vendor_prod_id) {
            return NextResponse.json({ message: 'A valid product ID is required.', success: false }, { status: 400 });
        }

        const vendorProd = await prisma.wishlists.findFirst({
            where: {
                user_id: userId,
                vendor_prod_id: Number(vendor_prod_id)
            }
        });

        if (vendorProd) {
            return NextResponse.json(
                {
                    message: 'Already added in list',
                    success: false
                },
                { status: 200 }
            );
        }
        const result = await prisma.wishlists.create({
            data: {
                user_id: userId,
                vendor_prod_id: Number(vendor_prod_id)
            }
        });
        revalidateTag('wishListItem');

        return NextResponse.json(
            { message: 'Item added to wishlist successfully.', success: true, cart_item: result },
            { status: 200 }
        );
    } catch (err) {
        if (err.code === 'P2003') {
            return NextResponse.json(
                { message: 'The provided product or user ID does not exist.', success: false },
                { status: 404 }
            );
        }
        return NextResponse.json({ message: 'An internal server error occurred.', success: false }, { status: 500 });
    }
};

export const GET = async (req) => {
    try {
        const headerList = await headers();
        const userIdString = headerList.get('user_id');

        if (!userIdString) {
            return NextResponse.json({ message: 'Unauthorized User', success: false }, { status: 401 });
        }

        const userId = parseInt(userIdString, 10);
        if (isNaN(userId)) {
            return NextResponse.json({ message: 'Invalid user ID format in header.', success: false }, { status: 400 });
        }

        const wishList = await prisma.wishlists.findMany({
            where: { user_id: userId },
            select: {
                id: true,
                user_id: true, // removed duplicate user_id
                vendor_prod_id: true,
                vendor_products: {
                    select: {
                        id: true,
                        price: true,
                        stock_qty: true,
                        products: {
                            select: {
                                id: true,
                                prod_name: true,
                                slug: true,
                                mrp: true,
                                product_images: {
                                    select: {
                                        id: true,
                                        file_name: true
                                    }
                                },
                                brands: true
                            }
                        },
                        vendors: {
                            select: {
                                id: true,
                                address: true,
                                store_description: true,
                                store_logo: true,
                                store_name: true
                            }
                        }
                    }
                }
            }
        });

        return NextResponse.json({
            message: 'Fetch Wish List Successfully.',
            success: true,
            wish_lists: wishList || []
        });
    } catch (err) {
        console.error('Error fetching wish list items:', err);
        return NextResponse.json({ message: 'Something went wrong.', success: false }, { status: 500 });
    }
};

export const DELETE = async (req) => {
    try {
        const headerList = headers();
        const userIdString = headerList.get('user_id');

        if (!userIdString) {
            return NextResponse.json({ message: 'Unauthorized User', success: false }, { status: 401 });
        }

        const userId = parseInt(userIdString, 10);
        if (isNaN(userId)) {
            return NextResponse.json({ message: 'Invalid user ID format in header.', success: false }, { status: 400 });
        }

        const { id } = await req.json();

        if (!id || isNaN(Number(id))) {
            return NextResponse.json({ message: 'Invalid or missing ID.', success: false }, { status: 400 });
        }

        await prisma.wishlists.delete({
            where: { id: Number(id) }
        });

        revalidateTag('wishListItem');

        return NextResponse.json({ message: 'Deleted Successfully', success: true }, { status: 200 });
    } catch (err) {
        console.error('DELETE error:', err);
        return NextResponse.json({ message: 'Something went wrong', success: false }, { status: 500 });
    }
};
