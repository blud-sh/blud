"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, ArrowUpRightIcon } from "lucide-react";
import "@/app/styles/some.css";
import Link from "next/link";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const arrowVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, 10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen text-center px-4 relative z-30"
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
        this is some cool stuff we&apos;re cooking, stay tuned.
      </motion.div>
      <motion.div variants={itemVariants}>
        <Link href="/login">
          <motion.button
            className="button--calypso w-[132px] h-[55px] bg-[#D9D9D9] text-[#000000] rounded-[39px] border-0 flex items-center justify-center gap-2 transition-colors duration-300 hover:bg-[#BDBDBD] whitespace-nowrap"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 17,
            }}
          >
            <span className="flex items-center">
              Start Here
              <ArrowUpRightIcon className="w-5 h-5 ml-1" />
            </span>
          </motion.button>
        </Link>
      </motion.div>
      <motion.div className="mt-8" variants={itemVariants}>
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
