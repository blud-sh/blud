"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroSection from "@/components/hero-section";
import Steps from "@/components/steps";
import { InfiniteMovingCards } from "@/components/ui/moving-cards";

const items = [
    {
        quote: "This product has changed my life! The team was incredibly supportive and the service exceeded my expectations.",
        name: "John Doe",
        title: "CEO, TechCorp",
    },
    {
        quote: "Fantastic experience! I highly recommend it to anyone looking for quality and professionalism.",
        name: "Jane Smith",
        title: "Marketing Manager, Brandify",
    },
    {
        quote: "Absolutely top-notch! The results were beyond what I could have hoped for.",
        name: "Alex Johnson",
        title: "Freelance Designer",
    },
    {
        quote: "Great customer service and a seamless experience. I would definitely use this again.",
        name: "Emily Davis",
        title: "Founder, StartUpX",
    },
    {
        quote: "Reliable, efficient, and innovative. Everything you could ask for from a service provider.",
        name: "Michael Brown",
        title: "CTO, Innovatech",
    },
    {
        quote: "Exceeded our expectations! The quality and attention to detail were unparalleled.",
        name: "Sarah Wilson",
        title: "Project Manager, BuildIt Inc.",
    },
    {
        quote: "Highly impressed by the professionalism and dedication of the team. Will definitely return for future projects.",
        name: "David Lee",
        title: "Software Engineer, CodeWave",
    },
    {
        quote: "Their innovative approach and commitment to customer satisfaction are second to none.",
        name: "Chris Evans",
        title: "Director of Operations, NextGen Solutions",
    },
    {
        quote: "Exceptional service with a personal touch. The results speak for themselves.",
        name: "Jessica Martinez",
        title: "Entrepreneur",
    },
    {
        quote: "The perfect solution to our needs. Efficient, reliable, and affordable.",
        name: "Brian Thompson",
        title: "Finance Analyst, MoneyMatters",
    },
];

export default function Home() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"]
    });

    return (
        <motion.div 
            ref={ref} 
            className="flex flex-col min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <AnimatedSection>
                <HeroSection />
            </AnimatedSection>
            
            <AnimatedSection>
                <section className="py-24 md:py-32 lg:py-34">
                    <div className="container mx-auto px-4">
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-24">colleges with us.</h2>
                        <InfiniteMovingCards
                            items={items}
                            direction="left"
                            speed="slow"
                            className="py-10"
                        />
                    </div>
                </section>
            </AnimatedSection>

            <AnimatedSection>
                <section className="py-10 md:py-18 lg:py-22">
                    <div className="container mx-auto px-4">
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-32">how to join?</h2>
                        <Steps />
                    </div>
                </section>
            </AnimatedSection>
        </motion.div>
    );
}

function AnimatedSection({ children }: { children: React.ReactNode }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);

    return (
        <motion.div
            ref={ref}
            style={{ opacity, y }}
            initial={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.8 }}
        >
            {children}
        </motion.div>
    );
}
