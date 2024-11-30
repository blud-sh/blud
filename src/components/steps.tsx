'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Steps() {
    return (
        <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-28 py-12 overflow-hidden">
            <div className="space-y-32 md:space-y-48 lg:space-y-64 text-[#333333]">
                <StepItem number="01" imagePosition="right" />
                <StepItem number="02" imagePosition="left" />
                <StepItem number="03" imagePosition="right" />
            </div>
        </div>
    );
}

function StepItem({
    number,
    imagePosition,
}: {
    number: string;
    imagePosition: 'left' | 'right';
}) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'center center'],
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <motion.div
            ref={ref}
            className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16"
        >
            <AnimatedElement
                isLeft={imagePosition === 'left'}
                y={y}
                opacity={opacity}
            >
                {imagePosition === 'left' ? (
                    <Image
                        src="/placeholder.svg?height=200&width=400"
                        width={646}
                        height={440}
                        alt={`Step ${number}`}
                        className="w-full h-auto bg-gray-200 rounded-lg shadow-lg"
                    />
                ) : (
                    <span className="text-6xl md:text-8xl lg:text-[10rem] xl:text-[15.625rem] font-bold text-[#898989] leading-none">
                        {number}.
                    </span>
                )}
            </AnimatedElement>
            <AnimatedElement
                isLeft={imagePosition !== 'left'}
                y={y}
                opacity={opacity}
            >
                {imagePosition === 'right' ? (
                    <Image
                        src="/placeholder.svg?height=200&width=400"
                        width={646}
                        height={440}
                        alt={`Step ${number}`}
                        className="w-full h-auto bg-gray-200 rounded-lg shadow-lg"
                    />
                ) : (
                    <span className="text-6xl md:text-8xl lg:text-[10rem] xl:text-[15.625rem] font-bold text-[#898989] leading-none">
                        {number}.
                    </span>
                )}
            </AnimatedElement>
        </motion.div>
    );
}

function AnimatedElement({
    children,
    isLeft,
    y,
    opacity,
}: {
    children: React.ReactNode;
    isLeft: boolean;
    y: any;
    opacity: any;
}) {
    return (
        <motion.div
            className={`w-full md:w-1/2 ${isLeft ? 'md:pr-8' : 'md:pl-8'}`}
            style={{ y, opacity }}
            initial={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
        >
            {children}
        </motion.div>
    );
}
