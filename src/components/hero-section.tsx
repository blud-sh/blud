"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const arrowVariants = {
        initial: { y: 0 },
        animate: {
            y: [0, 10, 0],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <motion.div 
            className="flex flex-col items-center justify-center min-h-screen text-center px-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div className="mb-8 mt-20" variants={itemVariants}>
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
                    <span className="block text-[#898989]">Lost?</span>
                    <span className="block">You&apos;ve already arrived.</span>
                </h1>
            </motion.div>
            <motion.div 
                className="text-lg sm:text-xl md:text-2xl lg:text-[2rem] text-[#2E2E2E] dark:text-[#D1D1D1] mb-12"
                variants={itemVariants}
            >
                tis is some cool shit we&apos;re cooking, stay tuned.
            </motion.div>
            <motion.button 
                className="px-4 py-2 sm:px-6 sm:py-3 mt-10 bg-black text-white rounded-full text-base sm:text-lg font-semibold transition-all duration-300 ease-in-out hover:bg-white hover:text-black hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-black"
                variants={itemVariants}
            >
                Start Here
            </motion.button>
            <motion.div
                className="mt-8"
                variants={itemVariants}
            >
                <motion.div
                    variants={arrowVariants}
                    initial="initial"
                    animate="animate"
                >
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
