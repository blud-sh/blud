"use client"
import React, { useRef, useState, useEffect } from "react"
import gsap from "gsap"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { ArrowElbowRightUpIcon } from "@phosphor-icons/react"
import { useSignupStepStore } from "../store"
// import { verifyOtp as serverVerifyOtp } from "@/actions/auth"
import { createClient as createSupabaseClient } from "@/supabase/client"

export default function Step2() {
    const router = useRouter()
    const [otp, setOtp] = useState(["", "", "", "", "", ""])
    const [active, setActive] = useState(0)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const inputRefs = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null))
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const boxRefs = Array.from({ length: 6 }, () => useRef<HTMLDivElement>(null))

    const handleChange = (idx: number, val: string) => {
        // Only allow numbers, and handle paste/multi-char
        const chars = val.replace(/[^0-9]/g, "").split("")
        if (chars.length === 0) return
        const newOtp = [...otp]
        let nextIdx = idx
        for (const c of chars) {
            if (nextIdx > 5) break
            newOtp[nextIdx] = c
            nextIdx++
        }
        setOtp(newOtp)
        if (nextIdx <= 5) {
            setActive(nextIdx)
        }
    }

    // handler for paste
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const paste = e.clipboardData.getData("text").replace(/[^0-9]/g, "")
        if (paste.length === 6) {
            setOtp(paste.split(""))
            setActive(6)
            e.preventDefault()
        }
    }

    useEffect(() => {
        // Focus the active input
        if (active < 6) {
            inputRefs[active]?.current?.focus()
            // Animate the box
            if (boxRefs[active - 1]?.current && otp[active - 1]) {
                gsap.fromTo(
                    boxRefs[active - 1].current,
                    { scale: 1 },
                    { scale: 1.18, duration: 0.16, yoyo: true, repeat: 1, ease: "power1.out" }
                )
            }
        }
    }, [active, otp, boxRefs, inputRefs])

    const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
            if (otp[idx]) {
                // If current box is not empty, clear it
                const newOtp = [...otp]
                newOtp[idx] = ""
                setOtp(newOtp)
            } else if (idx > 0) {
                // If current box is empty, move to previous and clear it
                inputRefs[idx - 1].current?.focus()
                setActive(idx - 1)
                const newOtp = [...otp]
                newOtp[idx - 1] = ""
                setOtp(newOtp)
            }
        }
    }

    const handleFocus = (idx: number) => setActive(idx)

    const { nextStep } = useSignupStepStore()
    const email = useSignupStepStore((s) => s.email)
    const [error, setError] = useState("")
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const otpCode = otp.join("")
        const supabase = createSupabaseClient()
        const { error } = await supabase.auth.verifyOtp({
            email,
            token: otpCode,
            type: "email",
        })
        if (error) {
            setError(error.message)
        } else {
            setError("")
            nextStep()
        }
    }

    const resetSignup = useSignupStepStore((s) => s.reset)

    const handleUseAnotherAccount = () => {
        resetSignup()
        router.push("/signup")
    }

    return (
        <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] justify-between">
            {/* Top bar */}
            <div className="flex items-center justify-between px-8 pt-8">
                <button
                    onClick={() => router.back()}
                    className="p-2 rounded-full hover:bg-[var(--muted)]"
                >
                    <ArrowLeft className="w-7 h-7 text-[var(--foreground)]" />
                </button>
                <span className="font-bold text-2xl text-[var(--foreground)] mx-auto absolute left-1/2 -translate-x-1/2">
                    logo
                </span>
                <div className="w-7 h-7" /> {/* Spacer for symmetry */}
            </div>
            {/* Centered content */}
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center flex-1 justify-center"
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-[var(--foreground)]">
                    cool, give us the code
                </h1>
                <p className="text-lg mb-10 text-center text-[var(--muted)]">
                    enter the code which you received in your mail
                </p>
                <div className="flex gap-6 mb-10">
                    {otp.map((digit, idx) => (
                        <div
                            key={idx}
                            ref={boxRefs[idx]}
                            className={`flex items-center justify-center w-28 h-32 rounded-full border-4 transition-all duration-200 ${
                                active === idx
                                    ? "bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)]"
                                    : "bg-[var(--input)] text-[var(--foreground)] border-[var(--border)] dark:bg-[var(--bg-black)] dark:text-[var(--foreground)] dark:border-[var(--contrast)]"
                            }`}
                        >
                            <input
                                ref={inputRefs[idx]}
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(idx, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(idx, e)}
                                onFocus={() => handleFocus(idx)}
                                onPaste={handlePaste}
                                className={`bg-transparent w-full h-full text-6xl text-center font-bold outline-none ${
                                    active === idx
                                        ? "text-[var(--primary-foreground)]"
                                        : "text-[var(--foreground)]"
                                }`}
                                style={{
                                    borderRadius: "9999px",
                                }}
                                autoFocus={idx === 0}
                            />
                        </div>
                    ))}
                </div>
                {error && <p className="text-[var(--accent)] text-center mb-4">{error}</p>}
                <button
                    type="submit"
                    className="w-56 py-4 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full text-lg font-semibold mb-4 hover:opacity-90 transition-colors flex items-center justify-center gap-x-2"
                >
                    <span className="flex items-center">
                        submit <ArrowElbowRightUpIcon size={24} className="ml-1" />
                    </span>
                </button>
                {/* Use another email/account link */}
                <button
                    type="button"
                    onClick={handleUseAnotherAccount}
                    className="text-black underline text-base hover:text-gray-700 mb-4 transition-colors dark:text-[var(--foreground)] dark:hover:text-[var(--muted)]"
                >
                    Use another email/account
                </button>
                <button
                    type="button"
                    className="text-black underline text-base hover:text-gray-700 transition-colors dark:text-[var(--foreground)] dark:hover:text-[var(--muted)]"
                    tabIndex={-1}
                >
                    resend code?
                </button>
            </form>
            {/* Footer */}
            <footer className="flex justify-end items-center px-8 pb-8 w-full">
                <div className="flex gap-6">
                    <a
                        href="#"
                        className="font-semibold font-primary text-xl cursor-pointer text-[var(--foreground)]"
                    >
                        support
                    </a>
                    <a
                        href="#"
                        className="font-semibold font-primary text-xl cursor-pointer text-[var(--foreground)]"
                    >
                        help
                    </a>
                </div>
            </footer>
        </div>
    )
}
