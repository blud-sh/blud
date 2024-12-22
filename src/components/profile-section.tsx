import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import {
    motion,
    useAnimation,
    useInView,
    AnimatePresence,
} from 'framer-motion';
import '@/app/styles/some.css';
import '@/app/styles/custom.css';

interface Profile {
    name: string;
    role: string;
    description: string;
    tags: string[];
    imageSrc: string;
    connectHref: string;
}

interface ProfileSectionProps {
    profiles: Profile[];
}

export default function ProfileSection({ profiles }: ProfileSectionProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const mainControls = useAnimation();
    const slideControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start('visible');
            slideControls.start('visible');
        }
    }, [isInView, mainControls, slideControls]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length);
    };

    const handlePrev = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + profiles.length) % profiles.length
        );
    };

    const currentProfile = profiles[currentIndex];

    const profileVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    return (
        <section ref={ref} className="py-24 md:py-32 lg:py-40 overflow-hidden">
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="container mx-auto px-4"
            >
                <motion.h2
                    variants={{
                        hidden: { opacity: 0, y: 50 },
                        visible: { opacity: 1, y: 0 },
                    }}
                    initial="hidden"
                    animate={mainControls}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-36"
                >
                    /nerds behind this
                </motion.h2>
                <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-8">
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, x: -50 },
                            visible: { opacity: 1, x: 0 },
                        }}
                        initial="hidden"
                        animate={mainControls}
                        transition={{ duration: 0.4, delay: 0.4 }}
                        className="w-full lg:w-1/2 flex flex-col justify-between"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                variants={profileVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                <h3 className="text-8xl font-bold">
                                    {currentProfile.name}
                                </h3>
                                <p className="text-4xl text-muted-foreground">
                                    {currentProfile.role}
                                </p>
                                <p className="text-2xl">
                                    {currentProfile.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {currentProfile.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm border"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                        <div className="flex justify-between items-center mt-12">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 400,
                                    damping: 17,
                                }}
                            >
                                <Button
                                    variant="outline"
                                    asChild
                                    className="button--calypso w-[132px] h-[55px] bg-[#D9D9D9] text-[#000000] rounded-[39px] border-0 flex items-center justify-center gap-2 transition-colors duration-300 hover:bg-[#BDBDBD]"
                                >
                                    <a
                                        href={currentProfile.connectHref}
                                        target="_blank"
                                    >
                                        <span>connect</span>
                                        <ArrowUpRightIcon className="w-5 h-5 scale-125" />
                                    </a>
                                </Button>
                            </motion.div>
                            <div className="flex gap-4 ml-auto relative left-[20%]">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 400,
                                        damping: 17,
                                    }}
                                >
                                    <Button
                                        variant="outline"
                                        onClick={handlePrev}
                                        className="button--calypso w-[132px] h-[55px] bg-[#393632] text-[#ffffff] py-6 px-8 text-lg rounded-[30px] border-0 transition-colors duration-300 hover:bg-[#4A4642]"
                                    >
                                        <span>/prev</span>
                                    </Button>
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 400,
                                        damping: 17,
                                    }}
                                >
                                    <Button
                                        variant="outline"
                                        onClick={handleNext}
                                        className="button--calypso w-[132px] h-[55px] bg-[#393632] text-[#ffffff] py-6 px-8 text-lg rounded-[30px] border-0 transition-colors duration-300 hover:bg-[#4A4642]"
                                    >
                                        <span>/next</span>
                                    </Button>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, x: 50 },
                            visible: { opacity: 1, x: 0 },
                        }}
                        initial="hidden"
                        animate={mainControls}
                        transition={{ duration: 0.4, delay: 0.5 }}
                        className="w-full lg:w-1/2 flex items-center justify-end"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                variants={profileVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{ duration: 0.3 }}
                                className="w-full max-w-lg relative overflow-hidden rounded-lg"
                            >
                                <Image
                                    src={currentProfile.imageSrc}
                                    alt={currentProfile.name}
                                    width={600}
                                    height={600}
                                    className="w-full h-auto object-cover rounded-lg saturate-image"
                                />
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </div>
            </motion.div>
            <motion.div
                variants={{
                    hidden: { left: 0 },
                    visible: { left: '100%' },
                }}
                initial="hidden"
                animate={slideControls}
                transition={{ duration: 0.4, ease: 'easeIn' }}
                style={{
                    position: 'absolute',
                    top: 4,
                    bottom: 4,
                    left: 0,
                    right: 0,
                    background: 'var(--background)',
                    zIndex: 20,
                }}
            />
        </section>
    );
}
