'use client';
import { useAlert } from '@/context/AlertContext';
import { useApiLoader } from '@/lib/useApiLoader';
import Loader from '@components/Loader';
import Link from 'next/link';
import { useRouter,useSearchParams,  usePathname } from 'next/navigation';
import { useState } from 'react';
import { signIn, getSession, useSession } from 'next-auth/react';
import { authLogIn } from '@/services/auth.js';
import { doSocialLogin } from '@/app/actions/authAction';
import Logo from '@components/Logo'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loadingState, setLoadingState] = useState(false);

    const { data: session, status } = useSession();
    const router = useRouter();
    const { showAlert } = useAlert();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { start, stop } = useApiLoader();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        setLoadingState(true);
        start();

        let result = {}
        // const authResult = await authLogIn({
        //     user_name: formData.email,
        //     password: formData.password
        // });
        // const token = await authResult.json();
        // console.log(token.accessToken)
        //  if(token.accessToken){
        //     result = await signIn('credentials', {
        //         redirect: false,
        //         email: formData.email,
        //         password: formData.password
        //     });
        //  }

        result = await signIn('credentials', {
                redirect: false,
                email: formData.email,
                password: formData.password
            });
        

        stop();
        setLoadingState(false);

        if (result?.ok && !result?.error) {
            const newSession = await getSession();
            showAlert('Login successful!', 'success');
            if (newSession.user?.role == 1 || newSession.user?.role == 0) {
                router.push('/dashboard');
            } else {
                router.push('/');
            }

            setFormData({ email: '', password: '' });
        } else {
            showAlert('Invalid credentials', 'error');
        }
    };

    const handleSocialLogin = async ()=> {
         const fullPath = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;

            const result = await doSocialLogin('google', fullPath);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="flex flex-col md:flex-row bg-white  rounded-lg overflow-hidden max-w-4xl w-full">
                {/* Left Side - Intro Text */}
                <div className="md:w-1/2 p-8 flex flex-col justify-center bg-gray-100 border-0">
                    {/* <div className="text-3xl font-bold mb-4">
                        <span className="text-red-600">P</span>
                        <span className="text-blue-600">a</span>
                        <span className="text-green-500">g</span>
                        <span className="text-yellow-500">o</span>
                        <span className="text-green-500">o</span>
                        <span className="text-blue-600">l</span>
                        <span className="text-red-600">e</span>
                    </div>  */}
                     <div className="text-xl font-semibold mb-4">
                        <Logo /> 
                     </div>
                    <div className='flex items-center gap-2'>
                        <div className="text-normal font-bold mb-4">
                             <Logo /> 
                            <span className='m-0 ps-2 font-normal'>Lost and Found world wide.</span>
                        </div> 
                        
                    </div> 
                    <p className="text-sm">
                        Not a member?
                        <Link href="/register" className="underline px-2 text-red-600">
                            Sign up now
                        </Link>
                        and join our community.
                    </p>
                </div>

                {/* Right Side - Login Form */}
                <div className="md:w-1/2 p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>
                    <form className="space-y-6" onSubmit={handleFormSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
                            <input
                                type="text"
                                placeholder="you@example.com"
                                name="email"
                                value={formData.email}
                                required
                                autoComplete="email"
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                required
                                autoComplete="current-password"
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                            />
                        </div>

                        <div className="flex justify-between items-center">
                            <label className="inline-flex items-center text-sm text-gray-600">
                                <input type="checkbox" className="form-checkbox h-4 w-4 text-green-600" />
                                <span className="ml-2">Remember me</span>
                            </label>

                            <Link href="/reset-password" className="text-sm base-text hover:underline">
                                Forgot Password?
                            </Link>
                        </div>
                        <button
                            disabled={loadingState}
                            type="submit"
                            className="w-full flex items-center justify-center py-2 mt-4 bg-gradient-to-r from-emerald-400 to-green-500 text-white font-semibold rounded hover:from-green-600 hover:to-emerald-400 focus:outline-none">
                            LOGIN {loadingState && <Loader />}
                        </button>
                    </form>
                    <span className='w-full flex justify-center py-2'>Or</span>
                    <button
                        onClick={handleSocialLogin}
                            type="button"
                            className="w-full flex items-center justify-center py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold rounded hover:from-orange-600 hover:to-orange-400 focus:outline-none">
                            LOGIN WITH GOOGLE
                        </button>
                    <button
                            type="submit"
                            className="w-full flex items-center justify-center py-2 mt-4 bg-gradient-to-r from-blue-400 to-blue-500 text-white font-semibold rounded hover:from-blue-600 hover:to-blue-400 focus:outline-none">
                            LOGIN WITH OTP
                        </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
