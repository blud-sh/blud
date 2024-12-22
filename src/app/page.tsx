'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroSection from '@/components/hero-section';
import Steps from '@/components/steps';
import { InfiniteMovingCards } from '@/components/ui/moving-cards';
import ProfileSection from '@/components/profile-section';
import JoinUs from '@/components/join-us';
import Footer from '@/components/footer';

const items = [
    {
        quote: 'This product has changed my life! The team was incredibly supportive and the service exceeded my expectations.',
        name: 'John Doe',
        title: 'CEO, TechCorp',
    },
    {
        quote: 'Fantastic experience! I highly recommend it to anyone looking for quality and professionalism.',
        name: 'Jane Smith',
        title: 'Marketing Manager, Brandify',
    },
    {
        quote: 'Absolutely top-notch! The results were beyond what I could have hoped for.',
        name: 'Alex Johnson',
        title: 'Freelance Designer',
    },
    {
        quote: 'Great customer service and a seamless experience. I would definitely use this again.',
        name: 'Emily Davis',
        title: 'Founder, StartUpX',
    },
    {
        quote: 'Reliable, efficient, and innovative. Everything you could ask for from a service provider.',
        name: 'Michael Brown',
        title: 'CTO, Innovatech',
    },
    {
        quote: 'Exceeded our expectations! The quality and attention to detail were unparalleled.',
        name: 'Sarah Wilson',
        title: 'Project Manager, BuildIt Inc.',
    },
];

const profiles = [
    {
        name: 'Rachit Srivastava',
        role: 'Founder',
        description:
            'Shinobi of the server, creating the code that runs in the shadows',
        tags: ['WEB DEVELOPMENT', 'BACKEND', 'SEO'],
        imageSrc: '/rachit.jpeg',
        connectHref: 'https://www.linkedin.com/in/rachit-srivastava-3b764527a/',
    },
    {
        name: 'Sai Shankar',
        role: 'Co-Founder',
        description: 'tech wizard and a metamodern mystic',
        tags: ['FRONTEND', 'WEB DEVELOPMENT', 'DESIGN'],
        imageSrc: '/sai.jpg',
        connectHref: 'https://www.linkedin.com/in/sai-shankar101/',
    },
    {
        name: 'Naman Saini',
        role: 'Co-Founder',
        description: 'Crafting beautiful user experiences',
        tags: ['WEB DEVELOPMENT', 'GRAPHIC DESIGN', 'PROTOTYPING'],
        imageSrc: '/naman.jpg',
        connectHref: 'https://www.linkedin.com/in/naman-saini-35003b2b2/',
    },
    {
        name: 'Aditya Chaudhary',
        role: 'Co-Founder',
        description: 'Bringing our vision to the world',
        tags: ['FULL STACK', 'WEB DEVELOPMENT', 'SEO'],
        imageSrc: '/aaditya.jpeg',
        connectHref: 'https://www.linkedin.com/in/aditya-chaudhary-36898a283/',
    },
];

export default function Home() {
    const ref = useRef(null);

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
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-24">
                            colleges with us.
                        </h2>
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
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-32">
                            how to join?
                        </h2>
                        <Steps />
                    </div>
                </section>
            </AnimatedSection>
            <ProfileSection profiles={profiles} />
            <AnimatedSection>
                <JoinUs />
            </AnimatedSection>
            <Footer />
        </motion.div>
    );
}

function AnimatedSection({ children }: { children: React.ReactNode }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const opacity = useTransform(
        scrollYProgress,
        [0, 0.3, 0.7, 1],
        [0, 1, 1, 0]
    );
    const y = useTransform(
        scrollYProgress,
        [0, 0.3, 0.7, 1],
        [100, 0, 0, -100]
    );

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
