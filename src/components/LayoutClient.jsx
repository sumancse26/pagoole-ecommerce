'use client';

import { usePathname } from 'next/navigation';

export default function LayoutManager({ header, sidebar, footer, children }) {
    const pathname = usePathname();

    const hideLayoutComponentsPaths = ['/auth', '/dashboard', '/register', '/login'];
    const shouldShowLayoutComponents = !hideLayoutComponentsPaths.includes(pathname);

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
