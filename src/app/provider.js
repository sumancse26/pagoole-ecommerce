'use client';

import { SessionProvider } from 'next-auth/react';

/**
 * This is a client-side component that wraps the entire application
 * with the NextAuth SessionProvider. This makes the session data
 * available to all components via the `useSession` hook.
 */
export default function Providers({ children }) {
    // The SessionProvider component provides the session context.
    return <SessionProvider>{children}</SessionProvider>;
}
