"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { SpinnerGap } from "@phosphor-icons/react"
import { motion, AnimatePresence } from "framer-motion"
import { useSignupStepStore } from "../store"

export default function Splash() {
    const resetSignup = useSignupStepStore((s) => s.reset)
    const router = useRouter()
    const [showExit, setShowExit] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowExit(true)

            // Push route after exit animation
            setTimeout(() => {
                router.push("/chatroom")
            }, 1200) // exit duration
        }, 3000)

        return () => clearTimeout(timeout)
    }, [router])

    return (
        <div className="relative w-full min-h-screen bg-primary overflow-hidden">
            {/* ENTRY: Centered Content */}
            <AnimatePresence>
                {!showExit && (
                    <motion.div
                        key="splash-main"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-base"
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.4,
                                duration: 0.8,
                                type: "spring",
                                stiffness: 120,
                            }}
                            className="text-white text-3xl md:text-5xl font-bold text-center"
                        >
                            welcome to your internet dorm
                        </motion.h1>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
                        >
                            <SpinnerGap size={40} className="mt-12 animate-spin text-white" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* EXIT TRANSITION: Radial Reveal */}
            <AnimatePresence>
                {showExit && (
                    <motion.div
                        key="exit"
                        initial={{ scale: 0, opacity: 0.5 }}
                        animate={{ scale: 20, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="absolute z-50 top-1/2 left-1/2 w-32 h-32 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"
                    />
                )}
            </AnimatePresence>
        </div>
    )
}
