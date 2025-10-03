import { NextResponse } from 'next/server';
import prisma from '@/config/prisma';

export const GET = async (req) => {
    try {
        const userId = req.headers.get('user_id');

        if (!Number(userId)) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 401 });
        }

        const vendorId = Number(userId);

        // Fetch orders where this vendor has products (ignore orders.vendor_id)
        const order_list = await prisma.orders.findMany({
            where: {
                order_items: {
                    some: {
                        vendor_products: {
                            vendor_id: vendorId
                        }
                    }
                }
            },
            select: {
                id: true,
                order_code: true,
                delivery_address: true,
                total_amount: true, // full customer order total
                order_status: true,
                payment_method: true,
                payment_status: true,
                created_at: true,
                updated_at: true,
                users: {
                    select: {
                        id: true,
                        user_name: true,
                        email: true,
                        phone: true
                    }
                },
                order_items: {
                    where: {
                        vendor_products: {
                            vendor_id: vendorId
                        }
                    },
                    select: {
                        id: true,
                        quantity: true,
                        unit_price: true,
                        vendor_products: {
                            select: {
                                id: true,
                                price: true,
                                stock_qty: true,
                                is_active: true,
                                vendor_id: true,
                                products: {
                                    select: {
                                        id: true,
                                        prod_name: true,
                                        slug: true,
                                        description: true,
                                        mrp: true,
                                        vat: true
                                    }
                                }
                            }
                        }
                    }
                }
            },
            orderBy: {
                id: 'desc'
            }
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Vendor orders fetched successfully',
                order_list
            },
            { status: 200 }
        );
    } catch (err) {
        console.error(err.message);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
};
