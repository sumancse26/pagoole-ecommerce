'use client';

import { useAlert } from '@/context/AlertContext';
import { useApiLoader } from '@/lib/useApiLoader';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { getUserInfo } from '@/services/users';
import { signOut } from 'next-auth/react';

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
        <header className="sticky top-0 z-50 bg-green-500 text-white shadow-md dark:bg-green-600 border-b border-green-600">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo & Menu Button */}
                    <div className="flex items-center gap-5">
                        <Link href="/dashboard" className="flex items-center">
                            <Image src="/uploads/logo.png" alt="Pagoole Shop Logo" width={80} height={36} priority />
                        </Link>
                        <button
                            className="lg:hidden xl:hidden 2xl:hidden flex items-center justify-center"
                            onClick={() => logoBtnHandler(true)}>
                            <span className="material-icons text-white text-2xl">menu</span>
                        </button>
                    </div>

                    {/* Right Side: Profile Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setDropdownOpen((prev) => !prev)}
                            className="flex items-center gap-2 group focus:outline-none">
                            <div className="relative">
                                {profile.image ? (
                                    <img
                                        className="h-9 w-9 rounded-full object-cover border-2 border-white"
                                        src={profile.image}
                                        alt="User profile"
                                    />
                                ) : (
                                    <div className="h-9 w-9 rounded-full bg-white text-green-500 font-bold flex items-center justify-center text-sm border-2 border-white">
                                        {profile.user_name?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                )}
                                <span className="absolute bottom-0 right-0 h-2 w-2 bg-green-400 rounded-full ring-2 ring-white" />
                            </div>
                            <div className="hidden md:flex flex-col text-left text-sm">
                                <span className="font-medium text-white leading-4">{profile.user_name || ''}</span>
                                <span className="text-xs text-green-100">View profile</span>
                            </div>
                            <svg className="hidden md:block h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>

                        {/* Dropdown */}
                        {dropdownOpen && (
                            <ul className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
                                <li>
                                    <button
                                        onClick={() => router.push('/auth/profile')}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-green-100 dark:hover:bg-green-700">
                                        Profile
                                    </button>
                                </li>
                                <li>
                                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-green-100 dark:hover:bg-green-700">
                                        Settings
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => {
                                            signOut({ callbackUrl: '/' });
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-600/20">
                                        Sign out
                                    </button>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
