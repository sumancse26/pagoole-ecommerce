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
        revalidateTag('cartListItem');

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

// export const GET = async (req) => {
//     try {
//         const headerList = headers();
//         const userIdString = headerList.get('user_id');

//         if (!userIdString) {
//             return NextResponse.json({ message: 'Unauthorized User', success: false }, { status: 401 });
//         }

//         const userId = parseInt(userIdString, 10);
//         if (isNaN(userId)) {
//             return NextResponse.json({ message: 'Invalid user ID format in header.', success: false }, { status: 400 });
//         }

//         const selectedCart = await prisma.carts.findFirst({
//             where: {
//                 user_id: userId
//             }
//         });

//         if (!selectedCart) {
//             return NextResponse.json({
//                 message: 'Cart is empty.',
//                 success: true,
//                 cart_items: []
//             });
//         }

//         const cartItems = await prisma.cart_Items.findMany({
//             where: {
//                 cart_id: selectedCart.id
//             },
//             select: {
//                 id: true,
//                 cart_id: true,
//                 vendor_prod_id: true,
//                 qty: true,

//                 vendor_products: {
//                     select: {
//                         id: true,
//                         price: true,
//                         stock_qty: true,
//                         is_active: true,
//                         vendors: true,
//                         products: {
//                             select: {
//                                 id: true,
//                                 prod_name: true,
//                                 slug: true,
//                                 image: true,
//                                 mrp: true,
//                                 file_server: {
//                                     select: {
//                                         id: true,
//                                         base_url: true
//                                     }
//                                 },
//                                 brands: {
//                                     select: {
//                                         id: true,
//                                         name: true,
//                                         brand_logo: true
//                                     }
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }
//         });
//         const modifiedItem = cartItems?.map((cart) => {
//             return {
//                 ...cart,
//                 item_total: Number(cart.qty || 0) * Number(cart.vendor_products?.price || 0)
//             };
//         });
//         return NextResponse.json({
//             message: 'Fetch Cart Items Successfully.',
//             success: true,
//             cart_items: modifiedItem
//         });
//     } catch (err) {
//         console.error('Error fetching cart items:', err);
//         return NextResponse.json(
//             {
//                 message: 'Something went wrong.',
//                 success: false
//             },
//             {
//                 status: 500
//             }
//         );
//     }
// };

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

        const selectedCart = await prisma.carts.findFirst({
            where: {
                user_id: userId
            }
        });

        if (!selectedCart) {
            return NextResponse.json({
                message: 'Cart is empty.',
                success: true,
                cart_items: []
            });
        }

        const cartItems = await prisma.cart_Items.findMany({
            where: {
                cart_id: selectedCart.id
            },
            select: {
                id: true,
                cart_id: true,
                vendor_prod_id: true,
                qty: true,
                vendor_products: {
                    select: {
                        id: true,
                        price: true,
                        stock_qty: true,
                        is_active: true,
                        vendors: {
                            select: {
                                id: true,
                                store_name: true
                            }
                        },
                        products: {
                            select: {
                                id: true,
                                prod_name: true,
                                slug: true,
                                image: true,
                                mrp: true,
                                file_server: {
                                    select: {
                                        id: true,
                                        base_url: true
                                    }
                                },
                                brands: {
                                    select: {
                                        id: true,
                                        name: true,
                                        brand_logo: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        const modifiedItem = cartItems?.map((cart) => {
            return {
                ...cart,
                item_total: Number(cart.qty || 0) * Number(cart.vendor_products?.price || 0)
            };
        });

        const groupedByVendor = modifiedItem.reduce((acc, item) => {
            const vendorId = item.vendor_products?.vendors?.id;
            if (vendorId) {
                if (!acc[vendorId]) {
                    acc[vendorId] = {
                        vendor_info: item.vendor_products.vendors,
                        items: []
                    };
                }
                acc[vendorId].items.push(item);
            }
            return acc;
        }, {});

        const vendorGroupsArray = Object.values(groupedByVendor);

        return NextResponse.json({
            message: 'Fetch Cart Items Successfully.',
            success: true,
            cart_items: vendorGroupsArray
        });
    } catch (err) {
        console.error('Error fetching cart items:', err);
        return NextResponse.json(
            {
                message: 'Something went wrong.',
                success: false
            },
            {
                status: 500
            }
        );
    }
};
