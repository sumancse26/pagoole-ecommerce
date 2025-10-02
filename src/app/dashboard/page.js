import Dashboard from '@components/dashboard/Dashboard.jsx';
import { getDashboardInfo } from '@/services/dashboard';
import { Suspense } from 'react';
import DashboardSkeleton from '@components/dashboard/DashboardSkeleton';

const DashboardPageContent = async () => {
    const res = await getDashboardInfo();
    const data = res.dashboard_info || {};
    return <Dashboard dashboardInfo={data} />;
};
const DashboardPage = async () => {
    return (
        <Suspense fallback={<DashboardSkeleton />}>
            <DashboardPageContent />
        </Suspense>
    );
};

export default DashboardPage;
