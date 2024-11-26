"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import LogoDark from "/public/logo-dark-mode.png";
import LogoLight from "/public/logo-light-mode.png";

export default function ThemeLogo() {
    const { theme } = useTheme();
    const resolvedTheme = (theme === "system" ? "dark" : theme) as
        | "light"
        | "dark";

    return (
        <Image
            src={resolvedTheme === "light" ? LogoLight : LogoDark}
            alt="Logo"
            width={200}
            className="object-contain"
            priority={true} // Avoid lazy loading
        />
    );
}
