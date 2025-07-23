"use client"
import React, { useState } from "react"
import {
    ArrowLeftIcon,
    BuildingsIcon,
    CaretDownIcon,
    EnvelopeSimpleIcon,
    StudentIcon,
    CalendarStarIcon,
} from "@phosphor-icons/react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { useSignupStepStore } from "../store"

const colleges = [
    "IIT Bombay",
    "IIT Delhi",
    "IIT Kanpur",
    "IIT Madras",
    "IIT Kharagpur",
    "Other...",
]
const years = ["2024", "2025", "2026", "2027", "2028", "2029", "2030"]

export default function Step5() {
    const router = useRouter()
    const { prevStep, nextStep, setCollege, setCollegeEmail, setGraduationYear } =
        useSignupStepStore()
    const [college, setCollegeLocal] = useState("")
    const [collegeSearch, setCollegeSearch] = useState("")
    const [collegeEmail, setCollegeEmailLocal] = useState("")
    const [graduationYear, setGraduationYearLocal] = useState("")
    const [collegeDropdown, setCollegeDropdown] = useState(false)
    const [yearDropdown, setYearDropdown] = useState(false)
    const collegeDropdownRef = React.useRef<HTMLDivElement>(null)
    const yearDropdownRef = React.useRef<HTMLDivElement>(null)
    const resetSignup = useSignupStepStore((s) => s.reset)

    const handleSubmit = () => {
        setCollege(college)
        setCollegeEmail(collegeEmail)
        setGraduationYear(graduationYear)
        nextStep()
    }

    const handleUseAnotherAccount = () => {
        resetSignup()
        router.push("/signup")
    }

    return (
        <div className="min-h-screen w-full flex flex-col bg-[#f1f8f4] text-black font-sans">
            {/* Top bar */}
            <div className="flex items-center justify-between px-8 pt-8">
                <button onClick={prevStep} className="p-2 rounded-full hover:bg-gray-100">
                    <ArrowLeftIcon size={28} weight="bold" />
                </button>
                <span className="font-bold text-black text-sm mx-auto absolute left-1/2 -translate-x-1/2">
                    logo
                </span>
                <div className="w-7 h-7" />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-contrast mb-10 text-center font-primary">
                    college details
                </h1>
                {/* College Dropdown */}
                <div className="w-full max-w-2xl mb-8 mx-auto">
                    <label className="mb-3 font-medium text-3xl font-primary" htmlFor="college">
                        which college are you from?
                    </label>
                    <div
                        className="relative mt-2"
                        onMouseEnter={() => setCollegeDropdown(true)}
                        onMouseLeave={() => setCollegeDropdown(false)}
                        onFocus={() => setCollegeDropdown(true)}
                        onBlur={() => setCollegeDropdown(false)}
                        tabIndex={0}
                        ref={collegeDropdownRef}
                    >
                        <BuildingsIcon
                            size={26}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A69B3]"
                        />
                        <div className="relative w-full">
                            <StudentIcon
                                size={26}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A69B3] z-10"
                            />
                            <input
                                type="text"
                                value={college}
                                onChange={(e) => setCollegeLocal(e.target.value)}
                                onFocus={() => setCollegeDropdown(true)}
                                className="block w-full min-w-[400px] max-w-2xl pl-14 pr-10 py-5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A69B3] text-lg font-secondary text-left relative"
                                placeholder="Select your college"
                                autoComplete="off"
                            />
                            <CaretDownIcon
                                size={22}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                            />
                        </div>
                        <AnimatePresence>
                            {collegeDropdown && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.18 }}
                                    className="absolute z-10 left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto min-w-[400px]"
                                >
                                    {colleges.filter((c) =>
                                        c.toLowerCase().includes(college.toLowerCase())
                                    ).length === 0 ? (
                                        <div className="px-6 py-3 text-gray-400">
                                            No colleges found
                                        </div>
                                    ) : (
                                        colleges
                                            .filter((c) =>
                                                c.toLowerCase().includes(college.toLowerCase())
                                            )
                                            .map((c) => (
                                                <div
                                                    key={c}
                                                    className={`px-6 py-3 cursor-pointer text-lg transition-colors ${
                                                        college === c
                                                            ? "bg-[#f1f8f4] text-[#7A69B3] font-semibold"
                                                            : "hover:bg-[#f1f8f4]"
                                                    }`}
                                                    onClick={() => {
                                                        setCollegeLocal(c)
                                                        setCollegeDropdown(false)
                                                    }}
                                                >
                                                    {c}
                                                </div>
                                            ))
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                {/* Email and Year */}
                <div className="w-full max-w-2xl flex flex-col md:flex-row gap-6 mb-8 mx-auto">
                    {/* College Email */}
                    <div className="flex-1 flex flex-col">
                        <label
                            className="mb-3 font-medium text-3xl font-primary whitespace-nowrap"
                            htmlFor="collegeEmail"
                        >
                            enter your college email address
                        </label>
                        <div className="relative">
                            <EnvelopeSimpleIcon
                                size={26}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A69B3]"
                            />
                            <input
                                id="collegeEmail"
                                type="email"
                                value={collegeEmail}
                                onChange={(e) => setCollegeEmailLocal(e.target.value)}
                                className="block w-full min-w-[200px] max-w-2xl pl-14 pr-8 py-5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A69B3] text-lg font-secondary"
                                placeholder="enter your college email address here"
                            />
                        </div>
                    </div>
                    {/* Graduation Year Dropdown */}
                    <div className="flex-1 flex flex-col mt-6 md:mt-0 justify-end">
                        <label
                            className="mb-3 font-medium text-3xl font-primary whitespace-nowrap"
                            htmlFor="graduationYear"
                        >
                            graduation year
                        </label>
                        <div
                            className="relative mt-2 flex items-center"
                            onMouseEnter={() => setYearDropdown(true)}
                            onMouseLeave={() => setYearDropdown(false)}
                            onFocus={() => setYearDropdown(true)}
                            onBlur={() => setYearDropdown(false)}
                            tabIndex={0}
                            ref={yearDropdownRef}
                        >
                            <CalendarStarIcon
                                size={26}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A69B3] z-2"
                            />
                            <button
                                type="button"
                                onClick={() => setYearDropdown((v) => !v)}
                                className="block w-full min-w-[200px] max-w-2xl pl-14 pr-10 py-5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A69B3] text-lg font-secondary text-left relative flex items-center"
                                tabIndex={-1}
                            >
                                <span className="flex-1">
                                    {graduationYear || (
                                        <span className="text-gray-400">Select year</span>
                                    )}
                                </span>
                                <CaretDownIcon size={22} className="ml-2 text-gray-400" />
                            </button>
                            <AnimatePresence>
                                {yearDropdown && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.18 }}
                                        className="absolute z-10 left-0 right-0 top-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto min-w-[200px]"
                                    >
                                        {years.map((y) => (
                                            <div
                                                key={y}
                                                className={`px-6 py-3 cursor-pointer text-lg transition-colors ${
                                                    graduationYear === y
                                                        ? "bg-[#f1f8f4] text-[#7A69B3] font-semibold"
                                                        : "hover:bg-[#f1f8f4]"
                                                }`}
                                                onClick={() => {
                                                    setGraduationYearLocal(y)
                                                    setYearDropdown(false)
                                                }}
                                            >
                                                {y}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
                {/* Submit button */}
                <button
                    onClick={handleSubmit}
                    className="mt-6 px-8 py-4 rounded-full bg-[#7A69B3] text-white text-lg font-semibold flex items-center gap-2 hover:bg-[#5a4a8a] transition"
                >
                    submit ⏎
                </button>
                {/* Use another email/account link */}
                <button
                    type="button"
                    onClick={handleUseAnotherAccount}
                    className="text-black underline text-base hover:text-gray-700 mt-4 transition-colors"
                >
                    Use another email/account
                </button>
            </div>

            {/* Footer */}
            <div className="flex justify-end px-8 pb-4 text-sm gap-4 text-black font-medium">
                <span className="cursor-pointer hover:underline">support</span>
                <span className="cursor-pointer hover:underline">help</span>
            </div>
        </div>
    )
}
