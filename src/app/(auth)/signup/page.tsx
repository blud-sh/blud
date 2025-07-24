"use client"
import React from "react"
import { EnvelopeSimpleIcon, ArrowElbowRightUpIcon } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import { useSignupStepStore } from "./flow/store"
import { signIn } from "@/actions/auth"
import Image from "next/image"
import config from "../../../../config"
import { createClient } from "@/supabase/client"
import { ThemeProvider } from "@/components/shared/theme-provider"
import { useTheme } from "next-themes"

function ModeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => {
        setMounted(true);
    }, []);
    return (
        <button
            aria-label="Toggle dark mode"
            className="absolute top-8 right-8 p-2 rounded-full bg-transparent border border-border text-foreground hover:bg-muted transition-colors"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            {mounted ? (theme === "dark" ? "🌙" : "☀️") : null}
        </button>
    );
}

const SignupPage: React.FC = () => {
    const [email, setEmail] = React.useState("")
    const [error, setError] = React.useState("")

    const validateEmail = (email: string) => {
        // Simple email regex
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    const router = useRouter()
    const zustandEmail = useSignupStepStore((s) => s.email)
    const resetSignup = useSignupStepStore((s) => s.reset)
    const setEmailZustand = useSignupStepStore((s) => s.setEmail)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!email) {
            setError("Email is required.")
            return
        }
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.")
            return
        }
        setError("")
        // If the email is different, reset the store first
        if (zustandEmail && zustandEmail !== email) {
            resetSignup()
        }
        setEmailZustand(email)
        const result = await signIn({ email })
        if (result?.error) {
            setError(result.error)
            return
        }
        router.push("/signup/flow")
    }

    // Add Google sign-in handler
    const handleGoogle = async () => {
        const redirectTo = `${config.domain}/auth/callback`
        const supabase = createClient()
        supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${redirectTo}?redirect=${encodeURIComponent("/chatroom")}`,
            },
        })
    }

    return (
        <main className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] font-sans p-8 relative transition-colors duration-300">
            {/* Header */}
            <header className="absolute top-8 left-8">
                <span className="font-bold text-lg text-[var(--foreground)]">logo</span>
            </header>
            <ModeToggle />
            {/* Content Wrapper */}
            <div className="flex-grow flex items-center justify-center">
                {/* Form Container */}
                <div className="w-full max-w-2xl flex flex-col items-center justify-center mx-auto">
                    <h1 className="text-6xl font-primary font-semibold mb-16 whitespace-nowrap text-center text-[var(--foreground)]">
                        Let's get started.
                    </h1>
                    <form
                        className="space-y-6 w-full flex flex-col items-center"
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="block font-primary whitespace-nowrap text-[2rem] font-normal mb-2 mt-8 text-[var(--foreground)]"
                            >
                                what's your email?
                            </label>
                            <div className="relative">
                                {/* Envelope Icon */}
                                <span className="absolute inset-y-0 left-2 top-1/2 -translate-y-1/2 flex items-center pl-3 pointer-events-none text-[var(--muted)]">
                                    <EnvelopeSimpleIcon size={28} />
                                </span>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="enter your email address here"
                                    className="block w-full pl-16 pr-8 py-6 bg-[var(--input)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-lg min-h-[72px] min-w-[650px] font-secondary text-[var(--foreground)]"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="email"
                                />
                                {error && <p className="text-red-500 text-sm mt-2 ml-1">{error}</p>}
                            </div>
                        </div>
                        <div className="w-full max-w-[650px]">
                            <p className="text-lg text-[var(--muted)] font-secondary text-left">
                                by signing in you agree to our{" "}
                                <a
                                    href="#"
                                    className="underline text-[var(--muted)] font-secondary hover:text-[var(--primary)]"
                                >
                                    terms and policies
                                </a>
                            </p>
                        </div>
                        <div className="w-full flex justify-center mt-20">
                            <button
                                type="submit"
                                className="w-48 flex items-center justify-center gap-2 bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold py-5 rounded-full text-lg hover:opacity-90 transition-colors"
                            >
                                submit
                                <ArrowElbowRightUpIcon size={24} className="ml-1" />
                            </button>
                        </div>
                    </form>
                    {/* Divider */}
                    <div className="flex items-center justify-center mt-8 mb-4 w-full text-[var(--muted)]">
                        <div className="w-[130px] h-px bg-[var(--border)]"></div>
                        <span className="mx-3 text-sm text-[var(--foreground)]">or continue with</span>
                        <div className="w-[130px] h-px bg-[var(--border)]"></div>
                    </div>
                    {/* Google OAuth Button */}
                    <div className="mt-2">
                        <button
                            className="w-[70px] h-[70px] flex items-center justify-center bg-[var(--muted)] rounded-full transition-all hover:bg-[var(--border)]"
                            onClick={handleGoogle}
                            type="button"
                        >
                            <Image
                                src="/images/google-icon.svg"
                                alt="Google Icon"
                                width={35}
                                height={35}
                            />
                        </button>
                    </div>
                </div>
            </div>
            {/* Footer */}
            <footer className="absolute bottom-8 right-8 flex gap-4">
                <span className="font-semibold text-[var(--foreground)] font-primary text-xl cursor-pointer ">
                    support
                </span>
                <span className="font-semibold text-[var(--foreground)] font-primary text-xl cursor-pointer">
                    help
                </span>
            </footer>
        </main>
    )
}

export default SignupPage
