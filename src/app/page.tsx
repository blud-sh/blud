"use client";

import HeroSection from "@/components/hero-section";
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
    // return <HeroSection />;
    return (
        <>
            <HeroSection />
            <InfiniteMovingCards
                items={items}
                direction="left"
                pauseOnHover={false}
                speed="slow"
                className="rounded-md flex flex-col antialiased dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden"
            />
        </>
    );
}
