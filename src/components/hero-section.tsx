import React from "react";

export default function HeroSection() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
            <div className="mb-8 mt-20">
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
                    <span className="block text-[#898989]">Lost?</span>
                    <span className="block">You&apos;ve already arrived.</span>
                </h1>
            </div>
            <div className="text-lg sm:text-xl md:text-2xl lg:text-[2rem] text-[#2E2E2E] dark:text-[#D1D1D1] mb-12">
                tis is some cool shit we&apos;re cooking, stay tuned.
            </div>
            <button className="px-4 py-2 sm:px-6 sm:py-3 mt-10 bg-black text-white rounded-full text-base sm:text-lg font-semibold transition-all duration-300 ease-in-out hover:bg-white hover:text-black hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-black">
                Start Here
            </button>
        </div>
    );
}
