"use server"

import { redirect } from "next/navigation"

import { createClient } from "@/supabase/server"

import { z } from "zod"
import { validatedAction } from "@/lib/auth/middleware"
import config from "../../config"

export const signin = validatedAction(
    z.object({
        email: z.string().email(),
    }),
    async (data) => {
        const supabase = await createClient()
        const { email } = data
        const redirectTo = `${config.domain}/auth/callback`

        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${redirectTo}?redirect=${encodeURIComponent("/")}`,
            },
        })

        if (error) {
            console.error("Error sending magic link:", error)
            return { error: error.message }
        }

        return { success: "Magic link sent to your email" }
    }
)

export const signOut = async () => {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect("/login")
}
