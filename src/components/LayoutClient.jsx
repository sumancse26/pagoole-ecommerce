'use client';

import { usePathname } from 'next/navigation';

export default function LayoutManager({ header, sidebar, footer, children }) {
    const pathname = usePathname();

    const hideLayoutComponentsPaths = ['/auth', '/dashboard', '/register', '/login', '/reset-password'];
    const shouldShowLayoutComponents = !hideLayoutComponentsPaths.some((path) => pathname.startsWith(path));

    return (
        <>
            {shouldShowLayoutComponents && header}
            <div className="flex min-h-screen">
                {shouldShowLayoutComponents && sidebar}
                <main className="flex-1 transition-all duration-300 overflow-x-hidden">{children}</main>
            </div>
            {shouldShowLayoutComponents && footer}
        </>
    );
}
