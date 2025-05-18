'use client';

import Link from 'next/link';
import { FaInstagram, FaGithub, FaTwitter, FaFacebook } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ThemeLogo from './theme-logo';

const socialLinks = [
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: FaGithub, href: '#', label: 'Github' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaFacebook, href: '#', label: 'Facebook' },
];

const legalLinks = [
    { text: 'Terms of Service', href: '#' },
    { text: 'Privacy Policy', href: '#' },
    { text: 'Cookies Policy', href: '#' },
    { text: 'Data Processing', href: '#' },
];

const exploreLinks = [
    { text: 'Popular Communities', href: '#' },
    { text: 'Colleges', href: '#' },
    { text: 'Events & Meetups', href: '#' },
    { text: 'Developer API', href: '#' },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export default function Footer() {
    return (
        <motion.footer
            className="w-full py-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
        >
            <div className="container mx-auto px-4 relative z-30">
                <motion.div
                    className="border-t border-white w-full max-w-[1200px] mx-auto mb-16 relative z-30"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                />

                <div className="flex flex-col md:flex-row justify-between max-w-[1200px] mx-auto mb-16 gap-12">
                    {/* First Container */}
                    <motion.div
                        className="space-y-12"
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                    >
                        <motion.div variants={item}>
                            <ThemeLogo />
                        </motion.div>

                        <motion.div
                            variants={item}
                            className="flex flex-wrap gap-4"
                        >
                            <button className="button--calypso w-[132px] h-[55px] bg-[#393632] text-white rounded-[38px]">
                                <span>join us</span>
                            </button>
                            <button className="button--calypso w-[132px] h-[55px] bg-transparent text-white rounded-[38px] border border-white">
                                <span>sign up</span>
                            </button>
                        </motion.div>

                        <motion.div variants={item} className="flex gap-6">
                            {socialLinks.map((social) => (
                                <motion.div
                                    key={social.label}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        href={social.href}
                                        className="w-10 h-10 bg-[#DFE1E3] rounded-full flex items-center justify-center group relative overflow-hidden transition-colors hover:bg-[#333333]"
                                    >
                                        <social.icon className="w-5 h-5 text-black transition-all duration-300 group-hover:text-white group-hover:scale-110" />
                                        <span className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Second Container */}
                    <motion.div
                        className="flex gap-24"
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                    >
                        <div className="space-y-6">
                            <motion.h3
                                variants={item}
                                className="text-2xl text-white font-medium"
                            >
                                Legal
                            </motion.h3>
                            <motion.ul
                                variants={container}
                                className="space-y-4"
                            >
                                {legalLinks.map((link) => (
                                    <motion.li key={link.text} variants={item}>
                                        <Link
                                            href={link.href}
                                            className="text-[#747474] text-base hover:text-white transition-colors relative group"
                                        >
                                            {link.text}
                                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                                        </Link>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </div>

                        <div className="space-y-6">
                            <motion.h3
                                variants={item}
                                className="text-2xl text-white font-medium"
                            >
                                Explore
                            </motion.h3>
                            <motion.ul
                                variants={container}
                                className="space-y-4"
                            >
                                {exploreLinks.map((link) => (
                                    <motion.li key={link.text} variants={item}>
                                        <Link
                                            href={link.href}
                                            className="text-[#747474] text-base hover:text-white transition-colors relative group"
                                        >
                                            {link.text}
                                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                                        </Link>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    className="border-t border-white w-full max-w-[1200px] mx-auto mb-8"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                />

                <motion.div
                    className="max-w-[1200px] mx-auto text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <p className="text-[18px] text-[#747474]">
                        © 2024 Unicon Inc. All rights reserved.
                    </p>
                </motion.div>
            </div>
        </motion.footer>
    );
}
