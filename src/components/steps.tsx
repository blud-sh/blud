'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Steps() {
    return (
        <div className="space-y-32 md:space-y-48 lg:space-y-64">
            <StepItem
                number="01"
                imagePosition="right"
                imageSrc="/placeholder.svg?height=440&width=646"
            />
            <StepItem
                number="02"
                imagePosition="left"
                imageSrc="/placeholder.svg?height=440&width=646"
            />
            <StepItem
                number="03"
                imagePosition="right"
                imageSrc="/placeholder.svg?height=440&width=646"
            />
        </div>
    );
}

function StepItem({
    number,
    imagePosition,
    imageSrc,
}: {
    number: string;
    imagePosition: 'left' | 'right';
    imageSrc: string;
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
                className="w-full md:w-1/2 flex justify-center items-center"
            >
                {imagePosition === 'left' ? (
                    <Image
                        src={imageSrc}
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
                className="w-full md:w-1/2 flex justify-center items-center"
            >
                {imagePosition === 'right' ? (
                    <Image
                        src={imageSrc}
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
    className,
}: {
    children: React.ReactNode;
    isLeft: boolean;
    y: any;
    opacity: any;
    className?: string;
}) {
    return (
        <motion.div
            className={`${className} ${isLeft ? 'md:pr-8' : 'md:pl-8'}`}
            style={{ y, opacity }}
            initial={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
        >
            {children}
        </motion.div>
    );
}
