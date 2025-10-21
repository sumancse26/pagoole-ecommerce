import SideNav from '@/components/dashboard/SideNavbar';

export default function DashboardLayout({ children }) {
    return (
        <div className="bg-light-100  h-[100vh] dark:bg-neutral-900">
            <SideNav />
            <div className="w-full lg:ps-64">
                <div className="p-4 sm:p-6">{children}</div>
            </div>
        </div>
    );
}
