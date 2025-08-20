'use server';

import { auth } from '@/auth';

export const getAuthInfo = async () => {
    const session = await auth();
    console.log('session', session);
    return session;
};
