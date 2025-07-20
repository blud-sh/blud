import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <Toaster />
            <body>{children}</body>
        </html>
    )
}
