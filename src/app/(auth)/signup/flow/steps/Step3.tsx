"use client"

import React, { useEffect, useState } from "react"
import { ArrowLeft, ChevronUp, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useSignupStepStore } from "../store"
import { useTheme } from "next-themes"
const roles = ["student", "dropout", "alumni", "explorer"]
const ITEM_HEIGHT = 80
const OFFSET = roles.length
export default function Step3() {
    const router = useRouter()
    const [index, setIndex] = useState(OFFSET)
    const { theme } = useTheme();

    const extendedRoles = [...roles, ...roles, ...roles]

    const { setRole, nextStep, reset } = useSignupStepStore()

    const prev = () => setIndex((prev) => prev - 1)
    const next = () => setIndex((prev) => prev + 1)

    // Keyboard support
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowUp") prev()
            if (e.key === "ArrowDown") next()
        }
        window.addEventListener("keydown", handleKey)
        return () => window.removeEventListener("keydown", handleKey)
    }, [])

    // Looping fix
    useEffect(() => {
        if (index <= roles.length - 2) setIndex((i) => i + roles.length)
        else if (index >= roles.length * 2 + 2) setIndex((i) => i - roles.length)
    }, [index])

    const handleSubmit = () => {
        const selected = roles[index % roles.length]
        setRole(selected)
        nextStep()
    }

    const resetSignup = useSignupStepStore((s) => s.reset)

    const handleUseAnotherAccount = () => {
        resetSignup()
        router.push("/signup")
    }

    return (
        <div className="min-h-screen w-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
            {/* Top bar */}
            <div className="flex items-center justify-between px-8 pt-8">
                <button
                    onClick={() => router.back()}
                    className="p-2 rounded-full hover:bg-[var(--muted)]"
                >
                    <ArrowLeft className="w-6 h-6 text-[var(--foreground)]" />
                </button>
                <span className="font-bold text-[var(--foreground)] text-sm mx-auto absolute left-1/2 -translate-x-1/2">
                    logo
                </span>
                <div className="w-6 h-6" />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center text-[var(--foreground)]">
                    welcome to blud.
                </h1>
                <p className="text-lg mb-10 text-center text-[var(--muted)]">
                    What describes you the most?
                </p>

                {/* Role selector */}
                <div className="flex flex-row items-center gap-6 select-none">
                    {/* Arrows */}
                    <div className="flex flex-col gap-4">
                        <button
                            onClick={prev}
                            className="p-2 rounded-full hover:bg-[var(--muted)] transition"
                        >
                            <ChevronUp className="w-10 h-10 text-[var(--muted)]" />
                        </button>
                        <button
                            onClick={next}
                            className="p-2 rounded-full hover:bg-[var(--muted)] transition"
                        >
                            <ChevronDown className="w-10 h-10 text-[var(--muted)]" />
                        </button>
                    </div>

                    {/* Wheel */}
                    <div className="relative w-[340px] h-[240px] overflow-hidden flex flex-col items-center border-y border-[var(--border)]">
                        <motion.div
                            drag="y"
                            dragConstraints={{ top: 0, bottom: 0 }}
                            onDragEnd={(e, info) => {
                                if (info.offset.y < -30) next()
                                else if (info.offset.y > 30) prev()
                            }}
                            className="w-full h-full cursor-grab active:cursor-grabbing"
                        >
                            <motion.div
                                className="flex flex-col"
                                animate={{ y: -(index * ITEM_HEIGHT) + ITEM_HEIGHT }}
                                transition={{ type: "spring", stiffness: 180, damping: 20 }}
                            >
                                {extendedRoles.map((role, i) => {
                                    const isActive = i === index
                                    return (
                                        <div
                                            key={i}
                                            className={`flex items-center justify-center font-bold transition-all whitespace-nowrap ${
                                                isActive
                                                    ? "text-[var(--foreground)] text-5xl scale-105"
                                                    : "text-[var(--muted)] opacity-50 text-3xl scale-95"
                                            }`}
                                            style={{ height: `${ITEM_HEIGHT}px` }}
                                        >
                                            a {role}
                                        </div>
                                    )
                                })}
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Submit */}
                <button
                    onClick={handleSubmit}
                    className="mt-12 px-6 py-3 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] text-lg font-semibold hover:opacity-90 transition"
                >
                    submit ⏎
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
