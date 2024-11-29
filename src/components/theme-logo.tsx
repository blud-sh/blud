"use client";

import Image from "next/image";
import LogoDark from "/public/logo-dark-mode.png";
import LogoLight from "/public/logo-light-mode.png";

export default function ThemeLogo() {
    return (
        <>
            <Image
                src={LogoDark}
                alt="Logo"
                width={200}
                className="object-contain hidden dark:block"
                priority={true}
            />
            <Image
                src={LogoLight}
                alt="Logo"
                width={200}
                className="object-contain block dark:hidden"
                priority={true}
            />
        </>
    );
}
