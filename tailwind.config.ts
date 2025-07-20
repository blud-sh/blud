import type { Config } from "tailwindcss"
// @ts-expect-error - TailwindCSS doesn't have types for this package
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette"
import tailwindcssAnimate from "tailwindcss-animate"

const config: Config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            fontFamily: {
                primary: ["Clash Display", "sans-serif"],
                secondary: ["Inter", "sans-serif"],
            },
            colors: {
                primary: "#645BB2",
                contrast: "#202020",
                base: "#F8FFF5",
                "red-dark": "#F70021",
                "primary-2": "#7C72A8",
                "text-grey": "#A3A3A3",
                "text-grey-2": "#808080",
                "bg-black": "#0C0C0C",
                border: "#E5E7EB",
                background: "#F8FFF5",
                foreground: "#202020",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                aurora: {
                    from: {
                        backgroundPosition: "50% 50%, 50% 50%",
                    },
                    to: {
                        backgroundPosition: "350% 50%, 350% 50%",
                    },
                },
                scroll: {
                    to: {
                        transform: "translate(calc(-50% - 0.5rem))",
                    },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                aurora: "aurora 60s linear infinite",
                scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
            },
        },
    },
    plugins: [tailwindcssAnimate, addVariablesForColors],
}

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
    const allColors = flattenColorPalette(theme("colors"))
    const newVars = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
    )

    addBase({
        ":root": newVars,
    })
}

export default config
