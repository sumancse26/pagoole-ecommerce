import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import prisma from '@/config/prisma';

export const POST = async (req) => {
    try {
        const headersList = headers();

        const userIdString = headersList.get('user_id');

        if (!userIdString) {
            return NextResponse.json(
                { message: 'Unauthorized: User authentication header is missing.', success: false },
                { status: 401 }
            );
        }

        const userId = parseInt(userIdString, 10);
        if (isNaN(userId)) {
            return NextResponse.json({ message: 'Invalid user ID format in header.', success: false }, { status: 400 });
        }

        const body = await req.json();
        const { vendorProdId, quantity } = body;

        if (!vendorProdId || !quantity || quantity <= 0) {
            return NextResponse.json(
                { message: 'A valid product ID and a positive quantity are required.', success: false },
                { status: 400 }
            );
        }

        const result = await prisma.$transaction(async (tx) => {
            let userCart = await tx.carts.findFirst({
                where: { user_id: userId }
            });

            if (!userCart) {
                userCart = await tx.carts.create({
                    data: { user_id: userId }
                });
            }

            const existingCartItem = await tx.cart_Items.findFirst({
                where: {
                    cart_id: userCart.id,
                    vendor_prod_id: vendorProdId
                }
            });

            if (existingCartItem) {
                return tx.cart_Items.update({
                    where: { id: existingCartItem.id },
                    data: { qty: { increment: quantity } }
                });
            } else {
                return tx.cart_Items.create({
                    data: {
                        cart_id: userCart.id,
                        vendor_prod_id: vendorProdId,
                        qty: quantity
                    }
                });
            }
        });

        return NextResponse.json(
            { message: 'Item added to cart successfully.', success: true, cart_item: result },
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
