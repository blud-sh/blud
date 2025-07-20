"use client"
import React from "react"
import { EnvelopeSimpleIcon, ArrowElbowRightUpIcon } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import { useSignupStepStore } from "./flow/store"
import { signIn } from "@/actions/auth"

const SignupPage: React.FC = () => {
    const [email, setEmail] = React.useState("")
    const [error, setError] = React.useState("")

    const validateEmail = (email: string) => {
        // Simple email regex
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    const router = useRouter()
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
        setEmailZustand(email)
        // const result = await signIn({ email })
        // if (result?.error) {
        //     setError(result.error)
        //     return
        // }
        router.push("/signup/flow")
    }

    return (
        <main className="min-h-screen flex flex-col bg-[#F5FBF6] font-sans p-8 relative">
            {/* Header */}
            <header className="absolute top-8 left-8">
                <span className="font-bold text-lg">logo</span>
            </header>

            {/* Content Wrapper */}
            <div className="flex-grow flex items-center justify-center">
                {/* Form Container */}
                <div className="w-full max-w-2xl flex flex-col items-center justify-center mx-auto">
                    <h1 className="text-6xl font-primary text-contrast font-semibold mb-16 whitespace-nowrap text-center">
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
                                className="block font-primary whitespace-nowrap text-[2rem] font-normal text-contrast mb-2 mt-8"
                            >
                                what's your email?
                            </label>
                            <div className="relative">
                                {/* Envelope Icon */}
                                <span className="absolute inset-y-0 left-2 top-1/2 -translate-y-1/2 flex items-center pl-3 pointer-events-none">
                                    <EnvelopeSimpleIcon size={28} className="text-gray-400" />
                                </span>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="enter your email address here"
                                    className="block w-full pl-16 pr-8 py-6 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A69B3] text-lg min-h-[72px] min-w-[650px] font-secondary"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="email"
                                />
                                {error && <p className="text-red-500 text-sm mt-2 ml-1">{error}</p>}
                            </div>
                        </div>
                        <div className="w-full max-w-[650px]">
                            <p className="text-lg text-gray-400 font-secondary text-left">
                                by signing in you agree to our{" "}
                                <a
                                    href="#"
                                    className="underline text-gray-400 font-secondary hover:text-primary"
                                >
                                    terms and policies
                                </a>
                            </p>
                        </div>
                        <div className="w-full flex justify-center mt-20">
                            <button
                                type="submit"
                                className="w-48 flex items-center justify-center gap-2 bg-[#7A69B3] text-white font-semibold py-5 rounded-full text-lg hover:bg-[#6a5ca3] transition-colors"
                            >
                                submit
                                <ArrowElbowRightUpIcon size={24} className="ml-1" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Footer */}
            <footer className="absolute bottom-8 right-8 flex gap-4">
                <span className="font-semibold text-contrast font-primary text-xl cursor-pointer ">
                    support
                </span>
                <span className="font-semibold text-contrast font-primary text-xl cursor-pointer">
                    help
                </span>
            </footer>
        </main>
    )
}

export default SignupPage
