import React from "react";
import { Button } from "./ui/button";

export default function HeaderAuth() {
    return (
        <div>
            <Button variant="outline" className="focus-visible:ring-0">
                Sign In
            </Button>
        </div>
    );
}
