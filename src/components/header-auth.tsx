import React from 'react';
import { Button } from '@/components/ui/button';

export default function HeaderAuth() {
    return (
        <div>
            <Button
                variant="outline"
                className="w-[70px] sm:w-auto focus-visible:ring-0"
            >
                Sign In
            </Button>
        </div>
    );
}
