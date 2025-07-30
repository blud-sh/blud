"use client"
import React, { useEffect } from "react"
import { useSignupStepStore } from "../flow/store"
import Step2 from "./steps/Step2"
import Step3 from "./steps/Step3"
import Step4 from "./steps/Step4"
import Step5 from "./steps/Step5"
import Splash from "./steps/Splash"
import { createClient } from "@/supabase/client"
import { useRouter } from "next/navigation"

const steps = {
    2: Step2,
    3: Step3,
    4: Step4,
    5: Step5,
    6: Splash,
}

export default function SignupFlowPage() {
    const step = useSignupStepStore((s) => s.step)
    const setStep = useSignupStepStore((s) => s.setStep)
    const StepComponent = steps[step] || Step2
    const router = useRouter()

    useEffect(() => {
        const check = async () => {
            const supabase = createClient()

            const {
                data: { user },
            } = await supabase.auth.getUser()

            console.log(user)
            if (user) {
                setStep(3)
                router.push("/signup/flow")
            }
        }

        check()
    }, [])

    return (
        <div className="min-h-screen flex flex-col justify-between bg-gray-50">
            <StepComponent />
        </div>
    )
}
