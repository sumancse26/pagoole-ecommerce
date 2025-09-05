import { NextResponse } from 'next/server';
import prisma from '@/config/prisma';

export const POST = async (req) => {
    try {
        const userId = await req.headers.get('user_id');
        const payload = await req.json();

        const userInfo = await prisma.vendors.findFirst({
            where: {
                user_id: Number(userId)
            }
        });

        if (!userInfo) return NextResponse.json({ success: false, message: 'User not found' }, { status: 400 });

        const {
            prod_name,
            price,
            stock_qty,
            description,
            unit_price,
            trade_price,
            mrp,
            vat,
            brand_id,
            category_id,
            weight_id,
            server_id,
            image
        } = payload;

        if (!prod_name || !price || !stock_qty)
            return NextResponse.json({ success: false, message: 'All fields are required' }, { status: 400 });

        const product = await prisma.products.findFirst({
            where: {
                prod_name: {
                    equals: prod_name,
                    mode: 'insensitive'
                },
                brand_id: brand_id,
                category_id: category_id,
                weight_id: weight_id
            }
        });

        if (!product) {
            const response = await prisma.$transaction(async (tx) => {
                const savedProduct = await tx.products.create({
                    data: {
                        prod_name: prod_name,
                        slug: prod_name.replace(/\s+/g, '-').toLowerCase(),
                        description: description,
                        unit_price: unit_price || 0,
                        trade_price: trade_price || 0,
                        mrp,
                        vat,
                        server_id: server_id,
                        category_id: category_id || null,
                        weight_id: weight_id || null,
                        brand_id: brand_id || null
                    }
                });

                const vendorProduct = await tx.vendor_Products.create({
                    data: {
                        product_id: savedProduct.id,
                        vendor_id: Number(userInfo.id),
                        price: mrp,
                        stock_qty,
                        is_active: 0
                    }
                });

                return vendorProduct;
            });

            return NextResponse.json(
                { success: true, message: 'Product added successfully', data: response },
                { status: 200 }
            );
        } else {
            const vendorProduct = await prisma.vendor_Products.create({
                data: {
                    product_id: product.id,
                    vendor_id: Number(userInfo.id),
                    category_id: Number(category_id),
                    price: mrp,
                    stock_qty,
                    is_active: 0
                }
            });

            return NextResponse.json(
                { success: true, message: 'Product added successfully', vendorProduct },
                { status: 200 }
            );
        }
    } catch (err) {
        console.log(err.message);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
};
