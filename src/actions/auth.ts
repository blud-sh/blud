"use server"
import { redirect } from "next/navigation"
import { createClient } from "@/supabase/server"
import { z } from "zod"
import config from "../../config"

const signInSchema = z.object({
    email: z.string().email(),
})

const verifyOtpSchema = z.object({
    email: z.string().email(),
    token: z.string().min(6).max(6),
})

export const signIn = async (data: { email: string }) => {
    try {
        const validatedData = signInSchema.parse(data)
        const supabase = await createClient()
        const { email } = validatedData

        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                shouldCreateUser: true,
            },
        })

        if (error) {
            console.error("Error sending otp:", error)
            return { error: error.message }
        }

        return { success: "OTP has been sent to your email" }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { error: error.errors[0].message }
        }
        console.error(error)
        return { error: "An unexpected error occurred" }
    }
}

export const verifyOtp = async (data: { email: string; token: string }) => {
    try {
        const validatedData = verifyOtpSchema.parse(data)
        const supabase = await createClient()
        const { email, token } = validatedData

        const { error } = await supabase.auth.verifyOtp({
            email,
            token,
            type: "email",
        })

        if (error) {
            console.error("Error verifying OTP:", error)
            return { error: error.message }
        }

        return { success: "OTP has been verified successfully" }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { error: error.errors[0].message }
        }
        return { error: "An unexpected error occurred" }
    }
}

export const signOut = async () => {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect("/login")
}
