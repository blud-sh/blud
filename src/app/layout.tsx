import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { ModeToggle } from '@/components/mode-toggle';
import NavSearch from '@/components/nav-search';
import HeaderAuth from '@/components/header-auth';
import ThemeLogo from '@/components/theme-logo';

export const metadata: Metadata = {
  title: 'Unicon',
  description: 'A platform for all your educational needs',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen">
            <div className="absolute inset-0 z-0">
              <AuroraBackground />
            </div>
            <div className="relative z-10">
              <nav className="flex items-center justify-between fixed top-0 w-full px-6 py-4 z-50 bg-transparent">
                <div className="flex items-center w-[200px]">
                  <ThemeLogo />
                </div>
                <div className="flex-1 max-w-[600px] mx-4">
                  <NavSearch />
                </div>
                <div className="flex items-center gap-4 w-[200px] justify-end">
                  <ModeToggle />
                  <HeaderAuth />
                </div>
              </nav>
              <main className="dark:text-white">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
