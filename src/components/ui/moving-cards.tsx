"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className,
}: {
    items: {
        quote: string;
        name: string;
        title: string;
    }[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const scrollerRef = React.useRef<HTMLUListElement>(null);

    useEffect(() => {
        const getDirection = () => {
            if (containerRef.current) {
                if (direction === "left") {
                    containerRef.current.style.setProperty(
                        "--animation-direction",
                        "forwards"
                    );
                } else {
                    containerRef.current.style.setProperty(
                        "--animation-direction",
                        "reverse"
                    );
                }
            }
        };
        const getSpeed = () => {
            if (containerRef.current) {
                if (speed === "fast") {
                    containerRef.current.style.setProperty(
                        "--animation-duration",
                        "20s"
                    );
                } else if (speed === "normal") {
                    containerRef.current.style.setProperty(
                        "--animation-duration",
                        "40s"
                    );
                } else {
                    containerRef.current.style.setProperty(
                        "--animation-duration",
                        "80s"
                    );
                }
            }
        };
        function addAnimation() {
            if (containerRef.current && scrollerRef.current) {
                const scrollerContent = Array.from(
                    scrollerRef.current.children
                );

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
        addAnimation();
    }, [direction, speed]);
    const [start, setStart] = useState(false);

    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller relative z-20 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)] dark:[mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]",
                className
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
                    start && "animate-scroll ",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}
            >
                {items.map((item, idx) => (
                    <li
                        className="w-[263px] h-[250px] max-w-full relative rounded-[35px] flex-shrink-0 border border-gray-200 dark:border-gray-800 px-8 py-6 transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 hover:border-transparent group"
                        style={{
                            background: "var(--card-bg)",
                        }}
                        key={idx}
                    >
                        <div className="absolute inset-0 rounded-[35px] bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 ease-in-out"></div>
                        <blockquote className="h-full flex flex-col justify-between relative z-10">
                            <span className="relative z-20 text-sm leading-[1.6] text-gray-800 dark:text-gray-200 font-normal line-clamp-5 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                                {item.quote}
                            </span>
                            <div className="relative z-20 mt-6 flex flex-col gap-1">
                                <span className="text-sm leading-[1.6] text-gray-900 dark:text-gray-100 font-medium group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                                    {item.name}
                                </span>
                                <span className="text-sm leading-[1.6] text-gray-500 dark:text-gray-400 font-normal group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                                    {item.title}
                                </span>
                            </div>
                        </blockquote>
                    </li>
                ))}
            </ul>
        </div>
    );
};
