import { NextResponse } from 'next/server';
import prisma from '@/config/prisma';
import { encryptJSPassword } from '@/utils';
import fs from 'fs';
import path from 'path';

const UPLOADS_DIR = path.join(process.cwd(), 'src', 'app', 'uploads', 'users');
const UPLOADS_URL_PREFIX = '/uploads/users';

export const POST = async (req) => {
    try {
        const formData = await req.formData();

        const user_name = formData.get('user_name');
        const email = formData.get('email');
        const password = formData.get('password');
        const phone = formData.get('phone');
        const store_name = formData.get('store_name');
        const store_description = formData.get('store_description');
        const address = formData.get('address');
        const location_id = formData.get('location_id');
        const trade_license_no = formData.get('trade_license_no');
        const nid_no = formData.get('nid_no');
        const isCustomer = formData.get('isCustomer');
        const name = formData.get('name') || '';

        const store_logo = formData.get('store_logo');
        const trade_license_image = formData.get('trade_license_image');
        const nid_image = formData.get('nid_image');

        if (!fs.existsSync(UPLOADS_DIR)) {
            fs.mkdirSync(UPLOADS_DIR, { recursive: true });
        }

        const saveFile = async (file, prefix) => {
            if (!file || typeof file === 'string') return { url: '', path: '' };

            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const originalExt = path.extname(file.name);
            const safeExt = originalExt && originalExt.length <= 6 ? originalExt : '.dat';

            const timestamp = Date.now();
            const fileName = `${prefix}_${timestamp}${safeExt}`;
            const filePath = path.join(UPLOADS_DIR, fileName);

            await fs.promises.writeFile(filePath, buffer);

            return {
                url: `${UPLOADS_URL_PREFIX}/${fileName}`,
                path: filePath
            };
        };

        const uploadedFiles = [];
        const storeLogoData = await saveFile(store_logo, 'store_logo');
        if (storeLogoData.path) uploadedFiles.push(storeLogoData.path);

        const tradeLicenseData = await saveFile(trade_license_image, 'trade_license');
        if (tradeLicenseData.path) uploadedFiles.push(tradeLicenseData.path);

        const nidImageData = await saveFile(nid_image, 'nid');
        if (nidImageData.path) uploadedFiles.push(nidImageData.path);

        const isCustomerBool = isCustomer === 'true' || isCustomer === true;

        if (!isCustomerBool) {
            if (!(user_name && email && password && store_name && location_id)) {
                for (const filePath of uploadedFiles) {
                    try {
                        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
                    } catch {}
                }
                return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
            }

            const hashedPassword = (await encryptJSPassword(password?.toString())) || '';

            try {
                await prisma.$transaction(async (tx) => {
                    const savedUser = await tx.users.create({
                        data: {
                            user_name,
                            email,
                            phone: phone || '',
                            password: hashedPassword,
                            otp: 0,
                            is_admin: 1,
                            image: ''
                        }
                    });

                    await tx.vendors.create({
                        data: {
                            user_id: savedUser.id,
                            store_name,
                            store_description: store_description || '',
                            address: address || '',
                            location_id: Number(location_id),
                            store_logo: storeLogoData.url,
                            trade_license_no: trade_license_no || '',
                            nid_no: nid_no || '',
                            trade_license_image: tradeLicenseData.url,
                            nid_image: nidImageData.url
                        }
                    });
                });

                return NextResponse.json({ message: 'User registered successfully', success: true }, { status: 200 });
            } catch (dbError) {
                console.error('Database transaction failed:', dbError);

                for (const filePath of uploadedFiles) {
                    try {
                        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
                    } catch (cleanupErr) {
                        console.error('File cleanup error:', cleanupErr);
                    }
                }

                return NextResponse.json({ error: 'Failed to save data to the database' }, { status: 500 });
            }
        }

        return NextResponse.json({ message: 'Customer registration not implemented yet' }, { status: 200 });
    } catch (error) {
        console.error('Error parsing request body:', error);
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
};
