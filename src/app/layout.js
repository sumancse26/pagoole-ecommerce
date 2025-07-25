'use client';

import { AlertProvider } from '@/context/AlertContext';
import { DialogProvider } from '@/context/DialogContext';
import Alert from '@components/Alert';
import Header from '@components/header/Header';
import SidebarSlider from '@components/slider/SidebarSlider';
import Footer from '@components/footer/Footer';

import './globals.css';
export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            </head>
            <body className="antialiased font-sans">
                <DialogProvider>
                    <AlertProvider>
                        <Alert />
                        {/* Header (full-width) */}
                        <Header />

                        {/* Main Content Layout */}
                        <div className="flex min-h-screen">
                            <SidebarSlider />
                            <main className="flex-1 transition-all duration-300 overflow-x-hidden">{children}</main>
                        </div>

                        <Footer />
                    </AlertProvider>
                </DialogProvider>
            </body>
        </html>
    );
}
