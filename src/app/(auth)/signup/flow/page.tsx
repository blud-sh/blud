"use client"
import React from "react"
import { useSignupStepStore } from "../flow/store"
import Step2 from "./steps/Step2"
import Step3 from "./steps/Step3"
import Step4 from "./steps/Step4"
import Step5 from "./steps/Step5"
import Splash from "./steps/Splash"

const steps = {
    2: Step2,
    3: Step3,
    4: Step4,
    5: Step5,
    6: Splash,
}

export default function SignupFlowPage() {
    const step = useSignupStepStore((s) => s.step)
    const StepComponent = steps[step] || Step2
    return (
        <div className="min-h-screen flex flex-col justify-between bg-gray-50">
            <StepComponent />
        </div>
    )
}
