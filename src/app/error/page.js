'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function AuthErrorPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const error = searchParams.get('error');

    useEffect(() => {
        // 👇 THIS IS THE UPDATED LOGIC
        // We now check for 'OAuthCallbackError' which is what NextAuth v5 uses
        // when the user cancels the OAuth consent screen.
        // We keep 'AccessDenied' as a fallback for other scenarios or versions.
        if (error === 'OAuthCallbackError' || error === 'AccessDenied') {
            // Redirect the user back to the previous page in their history.
            router.back();
        }
    }, [error, router]);

    // This UI provides a fallback in case the redirect fails or for other errors.
    const getErrorMessage = () => {
        // Now we can provide a user-friendly message for this specific error
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
