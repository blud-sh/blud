'use client';

import { Menu } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import '@/app/styles/some.css';

export default function NavMenu() {
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="button--calypso w-[50px] h-[50px] bg-[#D9D9D9] text-[#000000] rounded-full border-0 flex items-center justify-center transition-all duration-300 hover:bg-[#BDBDBD] p-0 overflow-hidden shadow-lg"
                >
                    <span className="flex items-center justify-center w-full h-full relative">
                        <Menu className="w-6 h-6" />
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-[280px] p-4 mt-2 bg-[#D9D9D9] border-none rounded-2xl z-50"
                sideOffset={8}
            >
                <div className="flex items-center justify-between gap-4">
                    <ModeToggle />
                    <Button
                        variant="outline"
                        className="button--calypso h-[45px] bg-[#393632] text-white rounded-[39px] border-2 flex items-center justify-center gap-2 transition-colors duration-300 hover:bg-[#4A4642] flex-grow"
                    >
                        <span className="flex items-center">Sign In</span>
                    </Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
