'use client';

import { SessionProvider } from 'next-auth/react';

export default function Providers({ children }) {
    // The SessionProvider component provides the session context.
    return <SessionProvider>{children}</SessionProvider>;
}
