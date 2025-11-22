import Login from '@components/login/Login.jsx';
import { Suspense } from 'react';

const LoginPageContent = () => {
    return <Login />;
};
const LoginPage = async () => {
    return (
        <Suspense fallback={'Loading...'}>
            <LoginPageContent />
        </Suspense>
    );
};
export default LoginPage;
