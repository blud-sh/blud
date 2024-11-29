import React from "react";

export default function HeroSection() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
            <div className="mb-8 mt-20">
                <h1 className="text-[6px] sm:text-[80px] md:text-8xl font-bold leading-tight">
                    <span className="block text-[#898989]">Lost?S</span>
                    <span className="block">You&apos;ve already arrived.</span>
                </h1>
            </div>
            <div className="text-xl sm:text-2xl md:text-[32px] text-[#2E2E2E] dark:text-[#D1D1D1] mb-12">
                tis is some cool shit we&apos;re cooking, stay tuned.
            </div>
            <button className="px-6 py-3 mt-10 sm:px-8 sm:py-4 bg-black text-white rounded-full text-lg sm:text-xl font-semibold transition-all duration-300 ease-in-out hover:bg-white hover:text-black hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-black">
                Start Here
            </button>
        </div>
    );
}
