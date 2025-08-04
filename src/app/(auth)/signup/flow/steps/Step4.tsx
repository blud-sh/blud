"use client"
import React, { useState } from "react"
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    // UserIcon,
    IdentificationBadgeIcon,
    IdentificationCardIcon,
} from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import { useSignupStepStore } from "../store"

export default function Step4() {
    const router = useRouter()
    const { prevStep, nextStep, setName, setUsername, setBio } = useSignupStepStore()
    const [name, setNameLocal] = useState("")
    const [username, setUsernameLocal] = useState("")
    const [bio, setBioLocal] = useState("")
    const resetSignup = useSignupStepStore((s) => s.reset)

    const handleNext = () => {
        setName(name)
        setUsername(username)
        setBio(bio)
        nextStep()
    }

    const handleUseAnotherAccount = () => {
        resetSignup()
        router.push("/signup")
    }

    return (
        <div className="min-h-screen w-full flex flex-col bg-[var(--background)] text-[var(--foreground)] font-sans">
            {/* Top bar */}
            <div className="flex items-center justify-between px-8 pt-8">
                <button onClick={prevStep} className="p-2 rounded-full hover:bg-[var(--muted)]">
                    <ArrowLeftIcon size={28} weight="bold" className="text-[var(--foreground)]" />
                </button>
                <span className="font-bold text-[var(--foreground)] text-sm mx-auto absolute left-1/2 -translate-x-1/2">
                    logo
                </span>
                <div className="w-7 h-7" /> {/* Spacer for symmetry */}
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-4">
                <h1 className="text-5xl md:text-6xl font-bold mt-16 mb-10 text-center text-[var(--foreground)]">
                    a little more about you…
                </h1>
                <div className="flex flex-col md:flex-row gap-6 w-full max-w-2xl mb-8 mx-auto">
                    {/* Name input */}
                    <div className="flex-1 flex flex-col">
                        <label
                            className="mb-2 font-medium text-2xl font-primary text-[var(--foreground)]"
                            htmlFor="name"
                        >
                            what is your name?
                        </label>
                        <div className="relative">
                            <IdentificationCardIcon
                                size={26}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--primary)]"
                            />
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setNameLocal(e.target.value)}
                                className="block w-full min-w-[400px] max-w-2xl pl-14 pr-8 py-5 text-lg font-secondary text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                style={{
                                    background: "var(--input)",
                                    border: "1px solid var(--border)",
                                    borderRadius: "15px",
                                    ...(typeof window !== "undefined" &&
                                    document.documentElement.getAttribute("data-theme") === "dark"
                                        ? {
                                              background: "var(--bg-black)",
                                              border: "1px solid var(--contrast)",
                                          }
                                        : {}),
                                }}
                                placeholder="tobi henderson"
                            />
                        </div>
                    </div>
                    {/* Username input */}
                    <div className="flex-1 flex flex-col mt-6 md:mt-0">
                        <label
                            className="mb-2 font-medium text-2xl font-primary text-[var(--foreground)]"
                            htmlFor="username"
                        >
                            what should people call you?
                        </label>
                        <div className="relative">
                            <IdentificationBadgeIcon
                                size={26}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--primary)]"
                            />
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsernameLocal(e.target.value)}
                                className="block w-full min-w-[400px] max-w-2xl pl-14 pr-8 py-5 text-lg text-[var(--foreground)] font-secondary focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                style={{
                                    background: "var(--input)",
                                    border: "1px solid var(--border)",
                                    borderRadius: "15px",
                                    ...(typeof window !== "undefined" &&
                                    document.documentElement.getAttribute("data-theme") === "dark"
                                        ? {
                                              background: "var(--bg-black)",
                                              border: "1px solid var(--contrast)",
                                          }
                                        : {}),
                                }}
                                placeholder="a.k.a tobi"
                            />
                        </div>
                    </div>
                </div>
                {/* Bio textarea */}
                <div className="w-full max-w-2xl flex flex-col mb-8 mx-auto">
                    <label
                        className="mb-2 font-medium text-2xl font-primary text-[var(--foreground)]"
                        htmlFor="bio"
                    >
                        bio (flex about urself)
                    </label>
                    <textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBioLocal(e.target.value)}
                        className="block w-full min-w-[400px] max-w-2xl min-h-[160px] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] outline-none text-lg p-5 resize-none font-secondary text-[var(--foreground)]"
                        style={{
                            background: "var(--input)",
                            border: "1px solid var(--border)",
                            borderRadius: "15px",
                            ...(typeof window !== "undefined" &&
                            document.documentElement.getAttribute("data-theme") === "dark"
                                ? {
                                      background: "var(--bg-black)",
                                      border: "1px solid var(--contrast)",
                                  }
                                : {}),
                        }}
                        placeholder="i did some cool shit bro…"
                    />
                </div>
                {/* Next button */}
                <button
                    onClick={handleNext}
                    className="mt-6 px-8 py-4 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] text-lg font-semibold flex items-center gap-2 hover:opacity-90 transition"
                >
                    next <ArrowRightIcon size={20} weight="bold" />
                </button>
                {/* Use another email/account link */}
                <button
                    type="button"
                    onClick={handleUseAnotherAccount}
                    className="text-black underline text-base hover:text-gray-700 mt-4 transition-colors dark:text-[var(--foreground)] dark:hover:text-[var(--muted)]"
                >
                    Use another email/account
                </button>
            </div>

            {/* Footer */}
            <div className="flex justify-end px-8 pb-4 text-sm gap-4 text-[var(--foreground)] font-medium">
                <span className="cursor-pointer hover:underline">support</span>
                <span className="cursor-pointer hover:underline">help</span>
            </div>
        </div>
    )
}
