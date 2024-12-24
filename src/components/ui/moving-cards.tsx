'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useState, useRef } from 'react';
import { CardSpotlight } from './card-spotlight';

export const InfiniteMovingCards = ({
    items,
    direction = 'left',
    speed = 'fast',
    pauseOnHover = true,
    className,
}: {
    items: {
        quote: string;
        name: string;
        title: string;
    }[];
    direction?: 'left' | 'right';
    speed?: 'fast' | 'normal' | 'slow';
    pauseOnHover?: boolean;
    className?: string;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollerRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        addAnimation();
    }, [direction, speed, items]);

    const [start, setStart] = useState(false);

    function addAnimation() {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem);
                }
            });

            getDirection();
            getSpeed();
            setStart(true);
        }
    }

    const getDirection = () => {
        if (containerRef.current) {
            if (direction === 'left') {
                containerRef.current.style.setProperty(
                    '--animation-direction',
                    'forwards'
                );
            } else {
                containerRef.current.style.setProperty(
                    '--animation-direction',
                    'reverse'
                );
            }
        }
    };

    const getSpeed = () => {
        if (containerRef.current) {
            if (speed === 'fast') {
                containerRef.current.style.setProperty(
                    '--animation-duration',
                    '20s'
                );
            } else if (speed === 'normal') {
                containerRef.current.style.setProperty(
                    '--animation-duration',
                    '40s'
                );
            } else {
                containerRef.current.style.setProperty(
                    '--animation-duration',
                    '80s'
                );
            }
        }
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                'scroller relative z-30 max-w-7xl mx-auto overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
                className
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    'flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap',
                    start && 'animate-scroll',
                    pauseOnHover && 'hover:[animation-play-state:paused]'
                )}
            >
                {items.map((item, idx) => (
                    <li
                        className="w-[283px] h-[260px] max-w-full relative flex-shrink-0"
                        key={idx}
                    >
                        <CardSpotlight className="h-full">
                            <div className="h-full p-6 rounded-[35px]">
                                <blockquote className="h-full flex flex-col justify-between">
                                    <p className="text-lg leading-[1.6] text-gray-700 dark:text-gray-300 font-normal mb-4">
                                        {item.quote}
                                    </p>
                                    <footer className="mt-auto">
                                        <p className="text-base font-semibold text-gray-900 dark:text-white">
                                            {item.name}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {item.title}
                                        </p>
                                    </footer>
                                </blockquote>
                            </div>
                        </CardSpotlight>
                    </li>
                ))}
            </ul>
        </div>
    );
};
