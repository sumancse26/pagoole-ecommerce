'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function AuthErrorPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const error = searchParams.get('error');

    useEffect(() => {
        if (error === 'OAuthCallbackError' || error === 'AccessDenied') {
            router.back();
        }
    }, [error, router]);

    const getErrorMessage = () => {
        if (error === 'OAuthCallbackError') {
            return 'You have cancelled the sign-in process. You will be redirected back shortly.';
        }
        switch (error) {
            case 'Configuration':
                return 'There is a problem with the server configuration. Please contact support.';
            default:
                return 'An unexpected error occurred during authentication.';
        }
    };

    return (
        <div style={{ fontFamily: 'sans-serif', textAlign: 'center', padding: '5rem 1rem' }}>
            <h1>Authentication Failed</h1>
            <p style={{ color: '#dc3545', marginTop: '1rem' }}>{getErrorMessage()}</p>
            <p style={{ marginTop: '2rem' }}>
                If you are not redirected automatically,{' '}
                <Link href="/" style={{ color: '#0070f3', textDecoration: 'underline' }}>
                    return to the homepage
                </Link>
                .
            </p>
        </div>
    );
}
