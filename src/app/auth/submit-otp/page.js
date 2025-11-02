export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import SubmitOtp from '@components/submitOtp/SubmitOtp.jsx';

const SubmitOtpContent = () => {
    return <SubmitOtp />;
};
const SubmitOtpPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SubmitOtpContent />
        </Suspense>
    );
};

export default SubmitOtpPage;
