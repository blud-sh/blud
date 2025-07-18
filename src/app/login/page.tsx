"use client"

import { useState, useRef } from "react"
import { EnvelopeIcon, ChevronLeftIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import Link from "next/link"
import config from "../../../config"
import { createClient } from "@/supabase/client"

export default function LoginPage() {
    const [activeTab, setActiveTab] = useState("signin")
    const [email, setEmail] = useState("")
    const [isValidEmail, setIsValidEmail] = useState<boolean | null>(null) // To store the validation result
    const inputRef = useRef<HTMLInputElement>(null)

    const handleContainerClick = () => {
        inputRef.current?.focus()
    }

    const validateEmail = (email: string) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return regex.test(email)
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputEmail = e.target.value
        setEmail(inputEmail)
        setIsValidEmail(validateEmail(inputEmail)) // Validate email as user types
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
            {/* Circular Button with Left Arrow */}
            <Link href="/">
                <button className="absolute top-4 left-4 w-[50px] h-[50px] bg-[#D9D9D9] rounded-full flex items-center justify-center hover:bg-[#c0c0c0] transition-all">
                    <ChevronLeftIcon className="w-5 h-5 text-black" />
                </button>
            </Link>

            <h1 className="text-6xl font-bold text-[#D9D9D9] text-center mb-2">Hi there!</h1>
            <h2 className="text-2xl font-regular text-[#D9D9D9] mb-12">
                welcome to unicon community
            </h2>

            <div className="w-[360px] mb-10">
                <div className="h-[60px] flex justify-between items-center bg-[#D9D9D9] rounded-[20px] p-1.5 relative">
                    <button
                        className={`flex-1 h-full flex items-center justify-center text-lg z-10 transition-colors duration-300 ${
                            activeTab === "signin" ? "text-black font-semibold" : "text-[#6B645C]"
                        }`}
                        onClick={() => setActiveTab("signin")}
                    >
                        Sign in
                    </button>
                    <button
                        className={`flex-1 h-full flex items-center justify-center text-lg z-10 transition-colors duration-300 ${
                            activeTab === "signup" ? "text-black font-semibold" : "text-[#6B645C]"
                        }`}
                        onClick={() => setActiveTab("signup")}
                    >
                        Sign up
                    </button>
                    <div
                        className="absolute top-1.5 left-1.5 w-[176px] h-[50px] rounded-[16px] bg-white transition-transform duration-300"
                        style={{
                            transform: activeTab === "signup" ? "translateX(98%)" : "translateX(0)",
                        }}
                    ></div>
                </div>
            </div>

            <div className="w-[360px] mb-6 relative" onClick={handleContainerClick}>
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
                        ref={inputRef}
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        className="w-full h-[65px] bg-[#FFFFFF] rounded-[20px] pt-4 pb-2 pl-16 pr-4 text-[#000000] placeholder-transparent"
                    />
                    <EnvelopeIcon className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black" />
                    <div className="absolute left-14 top-1/2 transform -translate-y-1/2 w-px h-5 bg-gray-600" />

                    {/* Email Validation Feedback Icon */}
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

            <button className="w-[360px] h-[68px] mb-6 text-[#000000] bg-[#D9D9D9] rounded-[20px] text-lg font-semibold hover:bg-[#000000] hover:text-white transition-colors duration-600">
                Continue
            </button>

            {/* "or continue with" section */}
            <div className="flex items-center justify-center mt-5 mb-4 w-full text-gray-400">
                <div className="w-[130px] h-px bg-gray-600"></div>
                <span className="mx-3 text-sm">or continue with</span>
                <div className="w-[130px] h-px bg-gray-600"></div>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-5 mt-5">
                {/* Google Icon */}
                <button
                    className="w-[70px] h-[70px] flex items-center justify-center bg-[#D9D9D9] rounded-full transition-all"
                    onClick={handleGoogle}
                >
                    <Image src="/images/google-icon.svg" alt="Google Icon" width={35} height={35} />
                </button>

                {/* GitHub Icon */}
                <button className="w-[70px] h-[70px] flex items-center justify-center bg-[#D9D9D9] rounded-full transition-all">
                    <Image src="/images/github-icon.svg" alt="GitHub Icon" width={35} height={35} />
                </button>

                {/* Discord Icon */}
                <button className="w-[70px] h-[70px] flex items-center justify-center bg-[#5865F2] rounded-full transition-all">
                    <Image
                        src="/images/discord-icon.svg"
                        alt="Discord Icon"
                        width={35}
                        height={35}
                    />
                </button>
            </div>
        </div>
    )
}
