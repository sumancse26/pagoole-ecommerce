'use client';

import { useAlert } from '@/context/AlertContext';
import { useApiLoader } from '@/lib/useApiLoader'; 
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { getUserInfo } from '@/services/users';
import { signOut } from 'next-auth/react';
import Logo from '@components/Logo'
import NineDot from './NineDot';

const Header = ({ logoHandler }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [profile, setProfile] = useState({});
    const dropdownRef = useRef(null);
    const router = useRouter();
    const { showAlert } = useAlert();
    const { start, stop } = useApiLoader();

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            start();
            const result = await getUserInfo();
            stop();
            if (result.success) {
                setProfile(result.user_info);
            }
        } catch (error) {
            stop();
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const logoutHandler = async () => {
        // const result = await doLogoutAction();
        if (result.success) {
            showAlert(result.message, 'success');
            // await Cookies.remove('token');
            router.push('/login');
        } else {
            showAlert(result.message, 'error');
        }
    };

    const logoBtnHandler = () => {
        logoHandler();
    };

    return (
        <header className="sticky top-0 z-50 bg-green-600 text-white shadow-md dark:bg-green-600 border-b border-green-600">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-13">
                    {/* Logo & Menu Button */}
                    <div className="flex items-center gap-5">
                        {/* <Link href="/dashboard" className="flex items-center">
                            <Image src="/uploads/logo.png" alt="Pagoole Shop Logo" width={80} height={36} priority />
                        </Link> */}
                        <div className="flex items-center gap-3 justify-center cursor-pointer text-2xl font-extrabold bg-gradient-to-r from-white via-lime-300 to-green-100 bg-clip-text text-transparent drop-shadow-md">
                            <Logo /> Accounts
                        </div>
                        <button
                            className="lg:hidden xl:hidden 2xl:hidden flex items-center justify-center"
                            onClick={() => logoBtnHandler(true)}>
                            <span className="material-icons text-white text-2xl">menu</span>
                        </button>
                    </div>


                    <NineDot />
                </div>
            </div>
        </header>
    );
};

export default Header;
