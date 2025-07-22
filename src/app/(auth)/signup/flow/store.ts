import { create } from "zustand"
import { persist } from "zustand/middleware"

interface SignupStepState {
    step: 2 | 3 | 4 | 5 | 6
    email: string
    role: string
    name: string
    username: string
    bio: string
    college: string
    collegeEmail: string
    graduationYear: string
    setStep: (step: number) => void
    setEmail: (email: string) => void
    setRole: (role: string) => void
    setName: (name: string) => void
    setUsername: (username: string) => void
    setBio: (bio: string) => void
    setCollege: (college: string) => void
    setCollegeEmail: (collegeEmail: string) => void
    setGraduationYear: (graduationYear: string) => void
    nextStep: () => void
    prevStep: () => void
}

export const useSignupStepStore = create(
    persist<SignupStepState>(
        (set, get) => ({
            step: 2,
            email: "",
            role: "",
            name: "",
            username: "",
            bio: "",
            college: "",
            collegeEmail: "",
            graduationYear: "",
            setStep: (step) => set({ step }),
            setEmail: (email) => set({ email }),
            setRole: (role) => set({ role }),
            setName: (name) => set({ name }),
            setUsername: (username) => set({ username }),
            setBio: (bio) => set({ bio }),
            setCollege: (college) => set({ college }),
            setCollegeEmail: (collegeEmail) => set({ collegeEmail }),
            setGraduationYear: (graduationYear) => set({ graduationYear }),
            nextStep: () => set((state) => ({ step: state.step + 1 })),
            prevStep: () => set((state) => ({ step: state.step > 2 ? state.step - 1 : 2 })),
        }),
        {
            name: "signup-step-store",
        }
    )
)
