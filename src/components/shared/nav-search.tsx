"use client";

import React, { useState, useEffect } from "react";
import { Command } from "cmdk";
import { Search } from "lucide-react";

export default function NavSearch() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }

            if (e.key == "Escape") {
                e.preventDefault();
                setOpen(false);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    return (
        <div className="relative w-full max-w-lg">
            <button
                onClick={() => setOpen(true)}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-400 transition-colors bg-white/10 border border-gray-200 rounded-full backdrop-blur-xl hover:bg-white/20 dark:bg-gray-800/30 dark:border-gray-700 dark:hover:bg-gray-800/40"
            >
                <Search className="w-4 h-4 mr-2" />
                <span>Search...</span>
                <kbd className="ml-auto text-xs text-gray-400 dark:text-gray-500">
                    <span className="font-sans">⌘</span> K
                </kbd>
            </button>
            {open && (
                <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24">
                    <div
                        className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
                        onClick={() => setOpen(false)}
                    />
                    <Command className="relative w-full max-w-lg border border-gray-200 rounded-xl shadow-2xl bg-white/90 backdrop-blur-xl dark:bg-gray-800/90 dark:border-gray-700">
                        <div className="flex items-center px-4 border-b border-gray-200 dark:border-gray-700">
                            <Search className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
                            <Command.Input
                                autoFocus
                                placeholder="Search..."
                                className="w-full py-3 text-sm text-gray-900 placeholder-gray-400 bg-transparent border-0 focus:outline-none focus:ring-0 dark:text-white"
                            />
                        </div>
                        <Command.List className="max-h-[18.75rem] overflow-y-auto p-2">
                            <Command.Empty className="py-6 text-sm text-center text-gray-400 dark:text-gray-500">
                                No results found.
                            </Command.Empty>
                            <Command.Group heading="Suggestions">
                                <Command.Item className="px-2 py-1 text-sm rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                                    Search Docs
                                </Command.Item>
                                <Command.Item className="px-2 py-1 text-sm rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                                    Create New Page
                                </Command.Item>
                            </Command.Group>
                        </Command.List>
                    </Command>
                </div>
            )}
        </div>
    );
}
