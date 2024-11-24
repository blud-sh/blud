"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import LogoDark from "../public/logo-dark-mode.png";
import LogoLight from "../public/logo-light-mode.png";

export default function ThemeLogo() {
    const { theme } = useTheme();

    return (
        <Image
            src={theme === "light" ? LogoLight : LogoDark}
            alt="Logo"
            width={200}
            height={40}
            className="object-contain"
        />
    );
}
