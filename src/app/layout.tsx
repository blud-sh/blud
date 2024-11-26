import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { ModeToggle } from "@/components/mode-toggle";
import NavSearch from "@/components/nav-search";
import HeaderAuth from "@/components/header-auth";
import ThemeLogo from "@/components/theme-logo";
import CommandMenu from "@/components/command-menu";

export const metadata: Metadata = {
    title: "Unicon",
    description: "A platform for all your educational needs",
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
                    <AuroraBackground>
                        <nav className="flex items-center justify-between fixed top-0 w-full px-6 py-4 z-50">
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
                        <main>{children}</main>
                        <CommandMenu />
                    </AuroraBackground>
                </ThemeProvider>
            </body>
        </html>
    );
}
