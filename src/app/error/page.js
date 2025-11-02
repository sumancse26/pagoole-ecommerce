'use client';

import { Suspense } from 'react';
import AuthErrorPageContent from './AuthErrorPageContent';

export default function AuthErrorPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AuthErrorPageContent />
        </Suspense>
    );
}
