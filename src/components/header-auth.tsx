import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpRightIcon } from 'lucide-react';
import '@/app/styles/some.css';

export default function HeaderAuth() {
    return (
        <div>
            <Button
                variant="outline"
                className="button--calypso w-[90px] h-[45px] bg-[#D9D9D9] text-[#000000] rounded-[39px] border-0 flex items-center justify-center gap-2 transition-colors duration-300 hover:bg-[#BDBDBD] whitespace-nowrap"
            >
                <span className="flex items-center">Sign In</span>
            </Button>
        </div>
    );
}
