'use server';

import { cookies } from 'next/headers';
import { auth } from '@/auth';

export const getCookies = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token') || null;
    console.log('server saved cookie', token);

    return { token };
};

export const googleAuthAction = async () => {
    const authResult = await auth();
    console.log('authResult', authResult);
    return authResult;
};
