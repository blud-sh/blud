"use client";

import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { CommandIcon } from "lucide-react";
import CommandMenu from "@/components/command-menu";

export default function NavSearch() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const down = (e: globalThis.KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    return (
        <div className="w-full relative drop-shadow-md">
            <Input
                type="text"
                placeholder="Search"
                className="w-full px-5 py-3 pr-11 border rounded-2xl placeholder:text-md bg-background  focus-visible:ring-0"
                onFocus={() => setOpen(true)}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                <CommandIcon width={16} height={16} />
                <span className="text-md">K</span>{" "}
            </div>
            <CommandMenu open={open} setOpen={setOpen} />
        </div>
    );
}
