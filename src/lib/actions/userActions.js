'use server';

import prisma from '@/config/prisma';
/**
 * Creates a new user in the database.
 * This function is designed to be called internally by NextAuth callbacks.
 *
 * @param {object} userData - The user data from the OAuth provider.
 * @param {string} userData.name - The user's full name.
 * @param {string} userData.email - The user's email address.
 * @param {string} [userData.image] - The user's avatar URL (optional).
 * @returns {Promise<object>} The newly created user object from the database.
 */
export async function registerUser(userData) {
    const { name, email, image } = userData;

    try {
        const newUser = await prisma.users.create({
            data: {
                user_name: name,
                email: email,
                image: image || '',
                otp: 0,
                is_admin: 2,
                is_active: 1
            }
        });
        return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
        throw new Error('Could not register user.', error);
    }
}

// You would also have your getUserByEmail function in this file
export async function getUserByEmail(email) {
    try {
        const user = await prisma.users.findUnique({
            where: { email: email }
        });
        return user ? JSON.parse(JSON.stringify(user)) : null;
    } catch (error) {
        throw new Error('Database query failed.', error);
    }
}
