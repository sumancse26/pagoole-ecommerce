import { NextResponse } from 'next/server';
import prisma from '@/config/prisma';
import { revalidateTag } from 'next/cache';
import fs from 'fs';
import sharp from 'sharp';
import path from 'path';

export const runtime = 'nodejs';

const UPLOADS_DIR = path.join(process.cwd(), 'src', 'app', 'uploads', 'products');
const UPLOADS_URL_PREFIX = '/uploads/products';

// function formatFileNameForDB(fileName, maxLength = 64) {
//     if (!fileName) return '';

//     const ext = path.extname(fileName);
//     const base = path.basename(fileName, ext);

//     const prefix = `${UPLOADS_URL_PREFIX}/`;
//     const availableForBase = maxLength - prefix.length - ext.length;

//     const trimmedBase =
//         availableForBase > 0 ? base.slice(0, availableForBase) : base.slice(0, maxLength - prefix.length);

//     return `${prefix}${trimmedBase}${ext}`;
// }

// function generateShortFileName(originalName, index) {
//     const ext = path.extname(originalName).toLowerCase();
//     let base = path.basename(originalName, ext).replace(/[^a-zA-Z0-9]/g, ''); // safe characters

//     // Limit base length to leave room for index + extension
//     const maxBaseLength = 25 - ext.length - index.toString().length;
//     base = base.slice(0, Math.max(1, maxBaseLength));

//     return `${base}${index}${ext}`; // e.g., "myfile0.jpg"
// }

export const POST = async (req) => {
    let imagePath = null;
    let absoluteImageUrl = null;
    const savedFiles = [];
    const savedFilePaths = [];

    try {
        const userId = Number(req.headers.get('user_id'));
        if (!Number.isInteger(userId) || userId <= 0) {
            return NextResponse.json({ success: false, message: 'Unauthorized: invalid user' }, { status: 401 });
        }

        const formData = await req.formData();
        const origin = new URL(req.url).origin;

        const prod_name = formData.get('prod_name');
        const price = formData.get('price');
        const mrp = formData.get('mrp') || 0;
        const stock_qty = formData.get('stock_qty');
        const description = formData.get('description');
        const brand_id = formData.get('brand_id');
        const category_id = formData.get('category_id');
        const weight_id = formData.get('weight_id');
        const server_id = formData.get('server_id');

        const imagesInput = [
            ...formData.getAll('image'),
            ...formData.getAll('images'),
            ...formData.getAll('images[]')
        ].filter(Boolean);

        // Coerce numeric values
        const priceNum = price ? parseFloat(price) : 0;
        const mrpNum = mrp ? parseFloat(mrp) : 0;
        const stockQtyNum = stock_qty ? parseInt(stock_qty, 10) : 0;
        const brandIdNum = brand_id ? parseInt(brand_id, 10) : null;
        const categoryIdNum = category_id ? parseInt(category_id, 10) : null;
        const weightIdNum = weight_id ? parseInt(weight_id, 10) : null;
        const serverIdNum = server_id ? parseInt(server_id, 10) : null;

        const requiredIdsValid = [brandIdNum, categoryIdNum, weightIdNum].every((v) => Number.isInteger(v));
        if (!prod_name || isNaN(priceNum) || isNaN(stockQtyNum) || !requiredIdsValid) {
            return NextResponse.json({ success: false, message: 'All fields are required' }, { status: 400 });
        }

        // Handle uploaded files
        if (imagesInput.length > 0) {
            let uploadDir = UPLOADS_DIR;
            try {
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }
            } catch (e) {
                uploadDir = path.join('/tmp', 'uploads', 'products');
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }
            }

            for (let i = 0; i < imagesInput.length; i++) {
                const file = imagesInput[i];
                if (!file || !file.arrayBuffer || file.size <= 0) continue;

                const buffer = Buffer.from(await file.arrayBuffer());

                const originalName = file.name || 'upload';
                const ext = path.extname(originalName).toLowerCase();
                const baseRaw = path.basename(originalName, ext);
                const safeBaseRaw = baseRaw.replace(/[^a-zA-Z0-9-_]/g, '');
                const timePart = Date.now().toString();
                const uniquePart = `${timePart}-${i}`;
                const maxTotal = 64;
                const reserved = uniquePart.length + ext.length + 1;
                const maxBase = Math.max(1, maxTotal - reserved);
                const safeBase = (safeBaseRaw || 'file').slice(0, maxBase);
                let fileName = `${uniquePart}-${safeBase}${ext}`;
                if (fileName.length > maxTotal) {
                    const over = fileName.length - maxTotal;
                    const reducedBase = safeBase.slice(0, Math.max(0, safeBase.length - over));
                    fileName = `${uniquePart}-${reducedBase}${ext}`;
                }

                const filePath = path.join(uploadDir, fileName);

                let compressedBuffer;
                try {
                    const img = sharp(buffer).resize({
                        width: 1200,
                        withoutEnlargement: true
                    });

                    if (ext === '.png') {
                        compressedBuffer = await img.png({ compressionLevel: 9 }).toBuffer();
                    } else if (ext === '.webp') {
                        compressedBuffer = await img.webp({ quality: 10 }).toBuffer();
                    } else {
                        compressedBuffer = await img.jpeg({ quality: 10 }).toBuffer();
                    }
                } catch (err) {
                    console.error('Image compression error:', err);
                    compressedBuffer = buffer;
                }

                fs.writeFileSync(filePath, compressedBuffer);
                savedFilePaths.push(filePath);

                const url = `${UPLOADS_URL_PREFIX}/${fileName}`;
                const abs = `${origin}${url}`;
                savedFiles.push({ fileName, url, abs, filePath });
            }

            // for (let i = 0; i < imagesInput.length; i++) {
            //     const file = imagesInput[i];
            //     if (!file || !file.arrayBuffer || file.size <= 0) continue;

            //     const buffer = Buffer.from(await file.arrayBuffer());

            //     const fileName = generateShortFileName(file.name || 'upload', i);
            //     const filePath = path.join(uploadDir, fileName);

            //     fs.writeFileSync(filePath, buffer); // save file as is
            //     savedFilePaths.push(filePath);

            //     const url = `${UPLOADS_URL_PREFIX}/${fileName}`;
            //     const abs = `${origin}${url}`;
            //     savedFiles.push({ fileName, url, abs, filePath });
            // }

            if (savedFiles.length > 0) {
                imagePath = savedFiles[0].url;
                absoluteImageUrl = savedFiles[0].abs;
            }
        }

        const userInfo = await prisma.vendors.findFirst({
            where: { user_id: userId }
        });
        if (!userInfo) return NextResponse.json({ success: false, message: 'User not found' }, { status: 400 });

        const [brandExists, categoryExists, weightExists] = await Promise.all([
            prisma.brands.findUnique({ where: { id: brandIdNum } }),
            prisma.categories.findUnique({ where: { id: categoryIdNum } }),
            prisma.weights.findUnique({ where: { id: weightIdNum } })
        ]);
        if (!brandExists || !categoryExists || !weightExists) {
            return NextResponse.json({ success: false, message: 'Invalid brand/category/weight' }, { status: 400 });
        }

        // Check if product exists
        const product = await prisma.products.findFirst({
            where: {
                prod_name: { equals: prod_name, mode: 'insensitive' },
                brand_id: brandIdNum ?? null,
                category_id: categoryIdNum ?? null,
                weight_id: weightIdNum ?? null
            }
        });

        let vendorProduct;

        if (!product) {
            vendorProduct = await prisma.$transaction(async (tx) => {
                const slug = prod_name.replace(/\s+/g, '-').toLowerCase();

                let fileServer = null;
                if (serverIdNum) {
                    fileServer = await tx.file_Server.findUnique({ where: { id: serverIdNum } });
                } else if (savedFiles.length > 0) {
                    const fsName = origin.slice(0, 64);
                    fileServer = await tx.file_Server.upsert({
                        where: { name: fsName },
                        create: { name: fsName, base_url: origin },
                        update: { base_url: origin }
                    });
                }

                const savedProduct = await tx.products.create({
                    data: {
                        prod_name,
                        slug,
                        description,
                        mrp: mrpNum || 0,
                        server_id: fileServer?.id ?? null,
                        category_id: categoryIdNum || null,
                        weight_id: weightIdNum || null,
                        brand_id: brandIdNum || null
                    }
                });

                const vendorProductCreated = await tx.vendor_Products.create({
                    data: {
                        product_id: savedProduct.id,
                        vendor_id: userInfo.id,
                        price: priceNum || 0,
                        stock_qty: stockQtyNum || 0,
                        category_id: categoryIdNum || null,
                        is_active: 0
                    }
                });

                if (savedFiles.length > 0 && fileServer) {
                    for (const f of savedFiles) {
                        await tx.product_Images.create({
                            data: {
                                product_id: savedProduct.id,
                                vendor_product_id: vendorProductCreated.id,
                                vendor_id: userInfo.id,
                                server_id: fileServer.id,
                                file_name: f.url
                            }
                        });
                    }
                }

                return vendorProductCreated;
            });
        } else {
            vendorProduct = await prisma.vendor_Products.create({
                data: {
                    product_id: product.id,
                    vendor_id: userInfo.id,
                    category_id: categoryIdNum,
                    price: priceNum || 0,
                    stock_qty: stockQtyNum || 0,
                    is_active: 0
                }
            });

            let fileServer = null;
            if (serverIdNum) {
                fileServer = await prisma.file_Server.findUnique({ where: { id: serverIdNum } });
            } else if (savedFiles.length > 0) {
                const fsName = origin.slice(0, 64);
                fileServer = await prisma.file_Server.upsert({
                    where: { name: fsName },
                    create: { name: fsName, base_url: origin },
                    update: { base_url: origin }
                });
            }

            if (savedFiles.length > 0 && fileServer) {
                for (const f of savedFiles) {
                    await prisma.product_Images.create({
                        data: {
                            product_id: product.id,
                            vendor_product_id: vendorProduct.id,
                            vendor_id: userInfo.id,
                            server_id: fileServer.id,
                            file_name: f.fileName.slice(0, 64)
                        }
                    });
                }

                await prisma.products.update({
                    where: { id: product.id },
                    data: { server_id: fileServer.id }
                });
            }
        }

        revalidateTag('vendorProductList');

        return NextResponse.json({
            success: true,
            message: 'Product added successfully',
            data: vendorProduct
        });
    } catch (err) {
        console.error('Upload error:', err);

        if (savedFilePaths && savedFilePaths.length > 0) {
            for (const fileFullPath of savedFilePaths) {
                try {
                    if (fs.existsSync(fileFullPath)) {
                        fs.unlinkSync(fileFullPath);
                    }
                } catch (unlinkErr) {
                    console.error('Error deleting file:', unlinkErr);
                }
            }
        }

        return NextResponse.json({ success: false, message: err?.message || 'Internal Server Error' }, { status: 500 });
    }
};

export const GET = async (req) => {
    try {
        const userId = Number(req.headers.get('user_id'));
        const userRole = Number(req.headers.get('user_role'));

        if (!Number.isInteger(userId) || userId <= 0) {
            return NextResponse.json({ success: false, message: 'Unauthorized: invalid user' }, { status: 401 });
        }

        const vendor = await prisma.vendors.findFirst({
            where: {
                user_id: Number(userId)
            }
        });

        let whereClause = {};

        if (userRole == 1) {
            whereClause.vendor_id = vendor.id;
            whereClause.is_active = 1;
        }
        const products = await prisma.vendor_Products.findMany({
            where: whereClause,
            select: {
                id: true,
                price: true,
                stock_qty: true,
                is_active: true,
                product_id: true,
                products: {
                    select: {
                        id: true,
                        prod_name: true,
                        slug: true,
                        description: true,
                        mrp: true,
                        created_at: true,
                        categories: {
                            select: {
                                id: true,
                                category_name: true
                            }
                        },
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
                                product_id: true,
                                file_name: true,
                                file_server: true
                            }
                        },

                        weights: {
                            select: {
                                id: true,
                                unit: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                id: 'desc'
            },
            take: 50
        });

        return NextResponse.json({
            success: true,
            products_list: products || []
        });
    } catch (err) {
        console.error('Error fetching product:', err);
        return NextResponse.json({ success: false, message: err?.message || 'Internal Server Error' }, { status: 500 });
    }
};

export const PUT = async (req) => {
    let savedFiles = [];
    let savedFilePaths = [];

    try {
        // --- Validate user ---
        const userId = Number(req.headers.get('user_id'));
        if (!Number.isInteger(userId) || userId <= 0) {
            return NextResponse.json({ success: false, message: 'Unauthorized: invalid user' }, { status: 401 });
        }

        const formData = await req.formData();
        const origin = new URL(req.url).origin;

        const vendorProductId = Number(formData.get('id'));
        const productId = Number(formData.get('product_id'));

        if (!vendorProductId || !productId) {
            return NextResponse.json({ success: false, message: 'Missing product/vendor IDs' }, { status: 400 });
        }

        // --- Extract fields ---
        const prod_name = formData.get('prod_name');
        const price = parseFloat(formData.get('price') || '0');
        const mrp = parseFloat(formData.get('mrp') || '0');
        const stock_qty = parseInt(formData.get('stock_qty') || '0', 10);
        const description = formData.get('description') || '';
        const brand_id = parseInt(formData.get('brand_id') || '0', 10);
        const category_id = parseInt(formData.get('category_id') || '0', 10);
        const weight_id = parseInt(formData.get('weight_id') || '0', 10);
        const server_id = formData.get('server_id');
        const is_active = formData.get('is_active') !== null ? Number(formData.get('is_active')) : undefined;

        // --- Handle existing images (IDs only) ---
        const existingImageIds = formData
            .getAll('existing_images[]')
            .map((id) => Number(id))
            .filter((id) => !isNaN(id));

        // --- Handle new uploads ---
        const imagesInput = [...formData.getAll('images'), ...formData.getAll('images[]')].filter(Boolean);

        if (imagesInput.length > 0) {
            if (!fs.existsSync(UPLOADS_DIR)) {
                fs.mkdirSync(UPLOADS_DIR, { recursive: true });
            }

            for (let i = 0; i < imagesInput.length; i++) {
                const file = imagesInput[i];
                if (!file || !file.arrayBuffer || file.size <= 0) continue;

                const buffer = Buffer.from(await file.arrayBuffer());
                const ext = path.extname(file.name || '.jpg').toLowerCase();
                const safeBase = path.basename(file.name, ext).replace(/[^a-zA-Z0-9-_]/g, '');
                const unique = `${Date.now()}-${i}`;
                const fileName = `${unique}-${safeBase}${ext}`.slice(0, 64);

                const filePath = path.join(UPLOADS_DIR, fileName);

                let compressedBuffer;
                try {
                    const img = sharp(buffer).resize({
                        width: 1200,
                        withoutEnlargement: true
                    });

                    if (ext === '.png') {
                        compressedBuffer = await img.png({ compressionLevel: 8 }).toBuffer();
                    } else if (ext === '.webp') {
                        compressedBuffer = await img.webp({ quality: 8 }).toBuffer();
                    } else {
                        compressedBuffer = await img.jpeg({ quality: 8 }).toBuffer();
                    }
                } catch (err) {
                    console.error('Image compression failed:', err);
                    compressedBuffer = buffer;
                }

                fs.writeFileSync(filePath, compressedBuffer);
                savedFilePaths.push(filePath);

                const url = `${UPLOADS_URL_PREFIX}/${fileName}`;
                savedFiles.push({ fileName, url });
            }
        }

        // --- Check vendor ---
        const vendor = await prisma.vendors.findFirst({
            where: { user_id: userId }
        });
        if (!vendor) {
            return NextResponse.json({ success: false, message: 'Vendor not found' }, { status: 400 });
        }

        // --- Ensure product exists ---
        const existingProduct = await prisma.products.findUnique({
            where: { id: productId }
        });
        if (!existingProduct) {
            return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
        }

        // --- Update product ---
        await prisma.products.update({
            where: { id: productId },
            data: {
                prod_name,
                description,
                mrp,
                brand_id,
                category_id,
                weight_id
            }
        });

        // --- Update vendor product ---
        await prisma.vendor_Products.updateMany({
            where: { id: vendorProductId, vendor_id: vendor.id },
            data: {
                price,
                stock_qty,
                category_id,
                ...(is_active !== undefined ? { is_active } : {})
            }
        });

        // --- Handle images ---
        if (existingImageIds.length > 0) {
            await prisma.product_Images.deleteMany({
                where: {
                    product_id: productId,
                    vendor_product_id: vendorProductId,
                    id: { notIn: existingImageIds }
                }
            });
        } else {
            if (savedFiles.length === 0) {
                // keep current images
            } else {
                await prisma.product_Images.deleteMany({
                    where: {
                        product_id: productId,
                        vendor_product_id: vendorProductId
                    }
                });
            }
        }

        // --- Attach new uploads ---
        if (savedFiles.length > 0) {
            let fileServer = null;
            if (server_id) {
                fileServer = await prisma.file_Server.findUnique({
                    where: { id: Number(server_id) }
                });
            } else {
                const fsName = origin.slice(0, 64);
                fileServer = await prisma.file_Server.upsert({
                    where: { name: fsName },
                    create: { name: fsName, base_url: origin },
                    update: { base_url: origin }
                });
            }

            for (const f of savedFiles) {
                await prisma.product_Images.create({
                    data: {
                        product_id: productId,
                        vendor_product_id: vendorProductId,
                        vendor_id: vendor.id,
                        server_id: fileServer.id,
                        file_name: f.url
                    }
                });
            }
        }

        revalidateTag('vendorProductList');

        return NextResponse.json({
            success: true,
            message: 'Product updated successfully'
        });
    } catch (err) {
        console.error('Update error:', err);

        // Clean up failed uploads
        if (savedFilePaths.length > 0) {
            for (const p of savedFilePaths) {
                try {
                    if (fs.existsSync(p)) fs.unlinkSync(p);
                } catch (e) {
                    console.error('Cleanup failed:', e);
                }
            }
        }

        return NextResponse.json({ success: false, message: err.message || 'Internal server error' }, { status: 500 });
    }
};

export const PATCH = async (req) => {
    try {
        const userId = Number(req.headers.get('user_id'));
        if (!Number.isInteger(userId) || userId <= 0) {
            return NextResponse.json({ success: false, message: 'Unauthorized: invalid user' }, { status: 401 });
        }

        // Parse body
        const data = await req.json();

        const productId = Number(data.id);
        if (!productId) {
            return NextResponse.json({ success: false, message: 'Product ID is required' }, { status: 400 });
        }

        // Update product
        await prisma.vendor_Products.update({
            where: { id: productId },
            data: {
                is_active: 1
            }
        });

        revalidateTag('vendorProductList');

        return NextResponse.json({
            success: true,
            message: 'Product updated successfully'
        });
    } catch (err) {
        return NextResponse.json({ success: false, message: err.message || 'Internal server error' }, { status: 500 });
    }
};
