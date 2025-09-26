import { headers } from 'next/headers';
import bcryptJs from 'bcryptjs';
import { SignJWT } from 'jose';
//import { v4 as uuidv4 } from 'uuid';

const saltRounds = 10;

export const encryptJSPassword = async (password) => await bcryptJs.hash(password, saltRounds);

export const decryptJSPassword = async (password, encryptedPassword) =>
    await bcryptJs.compare(password, encryptedPassword);

export const jwtEncode = async ({ name, email, user_id, role }) => {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const jwt = await new SignJWT({ name: name, email, user_id, role })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(secret);
    return jwt;
};

export const filterArray = (items, searchKey, options) => {
    if (!items?.length) {
        return [];
    }
    return items.filter(filterObject(searchKey, options));
};

export const filterObject = (searchKey, { ignoreCase = false } = {}) => {
    return (item) => {
        if (!searchKey) {
            return true;
        }

        let reduceStr = Object.entries(item).reduce((result, [, value]) => {
            return !(value instanceof Object) ? (result += ` ${value}`) : result;
        }, '');

        if (!ignoreCase) {
            searchKey = searchKey.toLowerCase();
            reduceStr = reduceStr.toLowerCase();
        }

        return reduceStr.includes(searchKey);
    };
};

export const buildUrl = (url, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return queryString ? `${url}?${queryString}` : url;
};

// export const generateInvoiceNumber = (type) => {
//     const chars = '#ABCDEFGHIJKLMNOPQRSTUVWXYZ0123adskwlc456789abcdefghijklmnopqrstuvwxyz';
//     let result = type || 'INV';
//     for (let i = 0; i < 5; i++) {
//         result += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     return result?.toString();
// };

// export const generateInvoiceNumber = (type = 'INV') => {
//     return `${type}-${uuidv4()}`;
// };

export const generateProductCode = (name) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const namePart = (name || 'XX').substring(0, 2).toUpperCase();
    let randomPart = '';

    for (let i = 0; i < 4; i++) {
        randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return `${namePart}${randomPart}`;
};
