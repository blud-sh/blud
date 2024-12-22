'use client';

import { useState, useEffect } from 'react';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { ModeToggle } from '@/components/mode-toggle';
import NavSearch from '@/components/nav-search';
import HeaderAuth from '@/components/header-auth';
import ThemeLogo from '@/components/theme-logo';
import '@/app/styles/custom.css';
import '@/app/styles/some.css';

function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className="flex items-center justify-between fixed top-0 w-full px-4 sm:px-6 py-4 z-30 bg-transparent">
            <div className="flex items-center w-24 sm:w-[12.5rem]">
                <ThemeLogo />
            </div>
            <div
                className={`hidden md:flex flex-1 justify-center max-w-[37.5rem] mx-2 lg:mx-4 transition-all duration-300 ${
                    isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
            >
                <NavSearch />
            </div>
            <div className="flex items-center gap-2 sm:gap-4 justify-end">
                <ModeToggle />
                <HeaderAuth />
            </div>
        </nav>
    );
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased bg-zinc-50 dark:bg-zinc-900">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="relative min-h-screen">
                        <div className="fixed inset-0 z-0">
                            <AuroraBackground />
                        </div>
                        <div className="fixed inset-0 z-0 pointer-events-none noise-background bg-cover bg-center bg-no-repeat"></div>
                        <div className="relative z-10">
                            <Navigation />
                            <main className="dark:text-white">{children}</main>
                        </div>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
