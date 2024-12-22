'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface UnderlineInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
}

const UnderlineInput = React.forwardRef<HTMLInputElement, UnderlineInputProps>(
    ({ className, type, error, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    'flex w-full bg-transparent border-b-2 border-[#333333]/30 px-0 py-2 text-[32px] placeholder:text-[#333333]/40',
                    'focus:outline-none focus:border-[#333333] transition-all duration-300',
                    'hover:border-[#333333]/60',
                    error &&
                        'border-red-500 focus:border-red-500 hover:border-red-500',
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
UnderlineInput.displayName = 'UnderlineInput';

export { UnderlineInput };
