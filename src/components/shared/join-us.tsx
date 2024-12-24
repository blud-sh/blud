'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { UnderlineInput } from '@/components/ui/underline-input';

export default function JoinUs() {
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        setIsEmailValid(value === '' || validateEmail(value));
    };

    return (
        <section className="w-full py-16 sm:py-20 md:py-28 lg:py-32 px-4">
            <div className="container mx-auto max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
                <div className="bg-[#D9D9D9] rounded-3xl p-6 sm:p-8 md:p-12 lg:p-20 relative z-30">
                    <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[150px] font-bold text-center text-[#333333] mb-8 sm:mb-12 md:mb-16">
                        join us?
                    </h2>

                    <div className="flex flex-col sm:flex-row justify-center items-start gap-8 max-w-5xl mx-auto mb-12 sm:mb-16 md:mb-24 lg:mb-[150px]">
                        <div className="space-y-4 w-full max-w-md mx-auto sm:mx-0">
                            <div className="flex items-center gap-4">
                                <span className="text-[#333333] text-lg sm:text-xl font-medium px-2 sm:px-3 py-1 border-2 border-[#333333] rounded-full">
                                    01
                                </span>
                                <h3 className="text-[#333333] text-xl sm:text-2xl font-medium">
                                    What&apos;s your name?
                                </h3>
                            </div>
                            <UnderlineInput
                                placeholder="type your full name"
                                className="text-[#333333] text-lg sm:text-xl md:text-[32px]"
                            />
                        </div>

                        <div className="space-y-4 w-full max-w-md mx-auto sm:mx-0">
                            <div className="flex items-center gap-4">
                                <span className="text-[#333333] text-lg sm:text-xl font-medium px-2 sm:px-3 py-1 border-2 border-[#333333] rounded-full">
                                    02
                                </span>
                                <h3 className="text-[#333333] text-xl sm:text-2xl font-medium">
                                    What&apos;s your email?
                                </h3>
                            </div>
                            <div className="relative">
                                <UnderlineInput
                                    type="email"
                                    placeholder="example@email.com"
                                    className="text-[#333333] text-lg sm:text-xl md:text-[32px]"
                                    value={email}
                                    onChange={handleEmailChange}
                                    error={!isEmailValid}
                                />
                                <AnimatePresence>
                                    {!isEmailValid && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.5 }}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 500,
                                                damping: 30,
                                            }}
                                            className="absolute right-0 top-1/2 -translate-y-1/2"
                                        >
                                            <AlertCircle className="w-6 h-6 text-red-500" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-12 sm:mt-16 md:mt-20 lg:mt-24 mb-16 sm:mb-20 md:mb-24 lg:mb-32">
                        <button className="button--calypso send-button">
                            <span>send →</span>
                        </button>
                    </div>

                    <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 lg:bottom-8 right-4 sm:right-6 md:right-8 lg:right-16 text-right mt-8 sm:mt-12 md:mt-16">
                        <p className="text-[#333333] text-lg sm:text-xl md:text-2xl lg:text-[30px] font-medium">
                            For further queries:
                        </p>
                        <p className="text-[#333333] text-sm sm:text-base md:text-lg lg:text-[20px]">
                            ⮡ hello@unicon.com
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
