'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ThemeProvider } from '@/components/shared/theme-provider';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { ModeToggle } from '@/components/shared/mode-toggle';
import NavSearch from '@/components/shared/nav-search';
import HeaderAuth from '@/components/shared/header-auth';
import ThemeLogo from '@/components/shared/theme-logo';
import NavMenu from '@/components/shared/nav-menu';
import HeroSection from '@/components/shared/hero-section';
import Steps from '@/components/shared/steps';
import { InfiniteMovingCards } from '@/components/ui/moving-cards';
import ProfileSection from '@/components/shared/profile-section';
import JoinUs from '@/components/shared/join-us';
import Footer from '@/components/shared/footer';
import '@/app/styles/custom.css';
import '@/app/styles/some.css';

const items = [
    {
        quote: 'This platform would be a brilliant way to support students as they start their careers. It gives them an easier and more organised way to access various resources and opportunities that would otherwise be inaccessible.',
        name: 'Keerthana Manoj',
        title: 'Student',
    },
    {
        quote: "This is a fantastic idea—finally putting students in direct touch with the people running events, internships, and campus news without the usual red tape. It is exactly what today's busy, connected learners need to stay in the loop and grab opportunities on the spot. I can see this taking off fast and really making college life smoother for everyone.",
        name: 'Palak',
        title: 'Student - St Xaviers Calcutta',
    },
    {
        quote: 'Your platform presents an exciting opportunity to support postgraduate students pursuing their studies after MBBS, especially those eager to engage in research. By facilitating collaboration with like-minded individuals internationally, it can have a positive impact on the research community.',
        name: 'Abhirup Das',
        title: 'MBBS Student - RIMSC Ranchi',
    },
    {
        quote: 'I’ve been trying to find freelance work for small design projects but honestly, it’s been super scattered—Telegram groups, Insta DMs, and all that. When I heard about SkillFarm on UniCon, I felt like bro, finally! One proper place where I can post my services and even get hired by startups or students who actually need help. Just waiting for it to launch so I can set up my profile and start getting real gigs.',
        name: 'Rohan Goyal',
        title: 'Freelancer',
    },
    {
        quote: "I can’t wait for it to launch. It’s like finally someone made something just for us college students. A proper place to find teammates, gigs, events—everything in one app. It will create a huge impact on student community and education system.",
        name: 'Ananya Mehta',
        title: 'Student',
    },
];

const profiles = [
    {
        name: 'Rachit Srivastava',
        role: 'Founder',
        description:
            'Shinobi of the server, creating the code that runs in the shadows',
        tags: ['WEB DEVELOPMENT', 'BACKEND', 'SEO'],
        imageSrc: '/images/rachit.jpeg',
        connectHref: 'https://www.linkedin.com/in/rachit-srivastava-3b764527a/',
    },
    {
        name: 'Sai Shankar',
        role: 'Co-Founder',
        description: 'tech wizard and a metamodern mystic',
        tags: ['FRONTEND', 'WEB DEVELOPMENT', 'DESIGN'],
        imageSrc: '/images/sai.jpg',
        connectHref: 'https://www.linkedin.com/in/sai-shankar101/',
    },
    {
        name: 'Naman Saini',
        role: 'Co-Founder',
        description: 'Crafting beautiful user experiences',
        tags: ['WEB DEVELOPMENT', 'GRAPHIC DESIGN', 'PROTOTYPING'],
        imageSrc: '/images/naman.jpg',
        connectHref: 'https://www.linkedin.com/in/naman-saini-35003b2b2/',
    },
    {
        name: 'Kshitij Chandra Roy',
        role: 'Co-Founder',
        description: 'Business Analyst and Finance Enthusiast',
        tags: ['BUSINESS ANALYST', 'FINANCE'],
        imageSrc: '/images/roy.jpg',
        connectHref: 'https://www.linkedin.com/in/kshitij-chandra-roy-4aa1aa220/',
    },
    {
        name: 'Manvitha Pentapati',
        role: 'Co-Founder',
        description: 'Techie with a passion for web development',
        tags: ['FULL STACK', 'WEB DEVELOPMENT', 'BACKEND'],
        imageSrc: '/images/manvita.jpg',
        connectHref: 'https://www.linkedin.com/in/manvitha-pentapati-341a9327a',
    },
];

function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav className="flex items-center justify-between fixed top-0 w-full px-4 sm:px-6 py-4 z-50 bg-transparent">
                <div
                    className={`flex items-center w-24 sm:w-[12.5rem] transition-all duration-300 ${
                        isScrolled ? 'opacity-0' : 'opacity-100'
                    }`}
                >
                    <ThemeLogo />
                </div>
                <div
                    className={`hidden md:flex flex-1 justify-center max-w-[37.5rem] mx-2 lg:mx-4 transition-all duration-300 ${
                        isScrolled ? 'opacity-0' : 'opacity-100'
                    }`}
                >
                    <NavSearch />
                </div>
                <div className="flex items-center justify-end">
                    <div
                        className={`transition-all duration-300 ${
                            isScrolled ? 'opacity-0' : 'opacity-100'
                        }`}
                    >
                        <div className="flex items-center gap-2 sm:gap-4">
                            <ModeToggle />
                            <HeaderAuth />
                        </div>
                    </div>
                </div>
            </nav>
            <div
                className={`fixed top-4 right-4 transition-all duration-300 z-50 ${
                    isScrolled
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 -translate-y-full'
                }`}
            >
                <NavMenu />
            </div>
        </>
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

export default function Home() {
    const ref = useRef(null);

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            <div className="relative min-h-screen">
                <div className="fixed inset-0 z-10">
                    <AuroraBackground />
                </div>
                <div className="fixed inset-0 z-10 pointer-events-none noise-background bg-cover bg-center bg-no-repeat"></div>
                <div className="relative z-20">
                    <Navigation />
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
                                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-24 relative z-30">
                                        what people say
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
                            <section className="py-10 md:py-18 lg:py-22 ">
                                <div className="container mx-auto px-4 relative z-30">
                                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-32 ">
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
                </div>
            </div>
        </ThemeProvider>
    );
}
