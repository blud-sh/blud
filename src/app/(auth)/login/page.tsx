"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"

import { ChevronLeftIcon, EnvelopeIcon } from "@heroicons/react/24/outline"

import { signIn, verifyOtp } from "@/actions/auth"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { createClient } from "@/supabase/client"
import config from "../../../../config"

export default function LoginPage() {
    const [activeTab, setActiveTab] = useState<"signin" | "signup" | "otp">("signin")
    const [email, setEmail] = useState("")
    const [isValidEmail, setIsValidEmail] = useState<boolean | null>(null)
    const [otpValue, setOtpValue] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [timer, setTimer] = useState(0)
    const [canResend, setCanResend] = useState(true)

    const router = useRouter()
    const searchParams = useSearchParams()
    const redirect = searchParams.get("redirect")

    const validateEmail = (email: string) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return regex.test(email)
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputEmail = e.target.value
        setEmail(inputEmail)
        setIsValidEmail(validateEmail(inputEmail))
    }

    const startTimer = () => {
        setTimer(60)
        setCanResend(false)
    }

    useEffect(() => {
        let interval: NodeJS.Timeout
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1)
            }, 1000)
        } else if (timer === 0 && !canResend) {
            setCanResend(true)
        }
        return () => clearInterval(interval)
    }, [timer, canResend])

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!isValidEmail || isSubmitting) return

        setIsSubmitting(true)
        try {
            const result = await signIn({ email })
            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success("OTP sent to your email!")
                setActiveTab("otp")
                startTimer()
            }
        } catch (error) {
            toast.error("Failed to send OTP")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleResendOtp = async () => {
        if (!canResend || isSubmitting) return

        setIsSubmitting(true)
        try {
            const result = await signIn({ email })
            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success("New OTP sent to your email!")
                startTimer()
                setOtpValue("")
            }
        } catch (error) {
            toast.error("Failed to resend OTP")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleOtpComplete = async (value: string) => {
        if (value.length === 6) {
            setIsSubmitting(true)
            try {
                const result = await verifyOtp({ email, token: value })
                if (result?.error) {
                    toast.error(result.error)
                    setOtpValue("")
                }
                toast.success(result.success)
                router.push(redirect || "/chatroom")
            } catch (error) {
                toast.error("Invalid OTP. Please try again.")
                setOtpValue("")
            } finally {
                setIsSubmitting(false)
            }
        }
    }

    const handleBackToEmail = () => {
        setActiveTab("signin")
        setOtpValue("")
        setTimer(0)
        setCanResend(true)
    }

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
        <div className="min-h-screen flex flex-col items-center pt-12 bg-[#1C1B1A] text-white relative">
            {/* Back Button */}
            <Link href="/">
                <button className="absolute top-4 left-4 w-[50px] h-[50px] bg-[#D9D9D9] rounded-full flex items-center justify-center hover:bg-[#c0c0c0] transition-all">
                    <ChevronLeftIcon className="w-5 h-5 text-black" />
                </button>
            </Link>

            {activeTab !== "otp" ? (
                <>
                    <h1 className="text-6xl font-bold text-[#D9D9D9] text-center mb-2">
                        Hi there!
                    </h1>
                    <h2 className="text-2xl font-regular text-[#D9D9D9] mb-12">
                        welcome to unicon community
                    </h2>

                    {/* Tab Switcher */}
                    <div className="w-[360px] mb-10">
                        <div className="h-[60px] flex justify-between items-center bg-[#D9D9D9] rounded-[20px] p-1.5 relative">
                            <button
                                className={`flex-1 h-full flex items-center justify-center text-lg z-10 transition-colors duration-300 ${
                                    activeTab === "signin"
                                        ? "text-black font-semibold"
                                        : "text-[#6B645C]"
                                }`}
                                onClick={() => setActiveTab("signin")}
                            >
                                Sign in
                            </button>
                            <button
                                className={`flex-1 h-full flex items-center justify-center text-lg z-10 transition-colors duration-300 ${
                                    activeTab === "signup"
                                        ? "text-black font-semibold"
                                        : "text-[#6B645C]"
                                }`}
                                onClick={() => setActiveTab("signup")}
                            >
                                Sign up
                            </button>
                            <div
                                className="absolute top-1.5 left-1.5 w-[176px] h-[50px] rounded-[16px] bg-white transition-transform duration-300"
                                style={{
                                    transform:
                                        activeTab === "signup"
                                            ? "translateX(98%)"
                                            : "translateX(0)",
                                }}
                            ></div>
                        </div>
                    </div>

                    {/* Email Form */}
                    <form onSubmit={handleEmailSubmit} className="w-[360px]">
                        <div className="mb-6 relative">
                            <div className="relative w-full">
                                <label
                                    className={`absolute left-16 transition-all duration-300 ${
                                        email
                                            ? "top-2 text-xs text-gray-400"
                                            : "top-1/2 transform -translate-y-1/2 text-gray-500"
                                    }`}
                                >
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    className="w-full h-[65px] bg-[#FFFFFF] rounded-[20px] pt-4 pb-2 pl-16 pr-4 text-[#000000] placeholder-transparent"
                                    required
                                />
                                <EnvelopeIcon className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black" />
                                <div className="absolute left-14 top-1/2 transform -translate-y-1/2 w-px h-5 bg-gray-600" />

                                {/* Email Validation Icons */}
                                {isValidEmail === false && (
                                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500 animate-pulse">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            width="20"
                                            height="20"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M12 1v22m11-11H1"></path>
                                        </svg>
                                    </div>
                                )}

                                {isValidEmail === true && (
                                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500 animate-bounce">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            width="20"
                                            height="20"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M9 11l3 3L22 4"></path>
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full h-[68px] mb-6 text-[#000000] bg-[#D9D9D9] rounded-[20px] text-lg font-semibold hover:bg-[#000000] hover:text-white transition-colors duration-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!isValidEmail || isSubmitting}
                        >
                            {isSubmitting ? "Sending..." : "Continue"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center justify-center mt-5 mb-4 w-full text-gray-400">
                        <div className="w-[130px] h-px bg-gray-600"></div>
                        <span className="mx-3 text-sm">or continue with</span>
                        <div className="w-[130px] h-px bg-gray-600"></div>
                    </div>

                    {/* Google OAuth Button */}
                    <div className="mt-5">
                        <button
                            className="w-[70px] h-[70px] flex items-center justify-center bg-[#D9D9D9] rounded-full transition-all hover:bg-[#c0c0c0]"
                            onClick={handleGoogle}
                        >
                            <Image
                                src="/images/google-icon.svg"
                                alt="Google Icon"
                                width={35}
                                height={35}
                            />
                        </button>
                    </div>
                </>
            ) : (
                // OTP Verification Interface
                <div className="w-[360px] flex flex-col items-center">
                    <button
                        onClick={handleBackToEmail}
                        className="self-start mb-8 flex items-center text-[#D9D9D9] hover:text-white transition-colors"
                    >
                        <ChevronLeftIcon className="w-5 h-5 mr-2" />
                        Back
                    </button>

                    <h1 className="text-4xl font-bold text-[#D9D9D9] text-center mb-4">
                        Enter OTP
                    </h1>
                    <p className="text-lg text-gray-400 text-center mb-2">
                        We've sent a verification code to
                    </p>
                    <p className="text-lg text-[#D9D9D9] font-semibold mb-12">{email}</p>

                    <div className="mb-8">
                        <InputOTP
                            maxLength={6}
                            value={otpValue}
                            onChange={(value) => {
                                setOtpValue(value)
                                if (value.length === 6) {
                                    handleOtpComplete(value)
                                }
                            }}
                            disabled={isSubmitting}
                        >
                            <InputOTPGroup className="gap-3">
                                <InputOTPSlot
                                    index={0}
                                    className="w-12 h-12 text-xl font-semibold bg-[#D9D9D9] text-black border-0 rounded-lg"
                                />
                                <InputOTPSlot
                                    index={1}
                                    className="w-12 h-12 text-xl font-semibold bg-[#D9D9D9] text-black border-0 rounded-lg"
                                />
                                <InputOTPSlot
                                    index={2}
                                    className="w-12 h-12 text-xl font-semibold bg-[#D9D9D9] text-black border-0 rounded-lg"
                                />
                                <InputOTPSlot
                                    index={3}
                                    className="w-12 h-12 text-xl font-semibold bg-[#D9D9D9] text-black border-0 rounded-lg"
                                />
                                <InputOTPSlot
                                    index={4}
                                    className="w-12 h-12 text-xl font-semibold bg-[#D9D9D9] text-black border-0 rounded-lg"
                                />
                                <InputOTPSlot
                                    index={5}
                                    className="w-12 h-12 text-xl font-semibold bg-[#D9D9D9] text-black border-0 rounded-lg"
                                />
                            </InputOTPGroup>
                        </InputOTP>
                    </div>

                    {isSubmitting && (
                        <div className="mb-6 text-center">
                            <div className="inline-flex items-center text-gray-400">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#D9D9D9] mr-2"></div>
                                Verifying...
                            </div>
                        </div>
                    )}

                    <div className="text-center">
                        <p className="text-gray-400 mb-2">Didn't receive the code?</p>
                        {timer > 0 ? (
                            <p className="text-[#D9D9D9]">
                                Resend in <span className="font-semibold">{timer}s</span>
                            </p>
                        ) : (
                            <button
                                onClick={handleResendOtp}
                                disabled={!canResend || isSubmitting}
                                className="text-[#D9D9D9] font-semibold hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed underline"
                            >
                                {isSubmitting ? "Sending..." : "Resend OTP"}
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
