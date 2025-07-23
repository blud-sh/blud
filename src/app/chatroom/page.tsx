"use client"

import { ChatInterface } from "@/components/chatroom/chat-interface"
import { useEffect } from "react"
import { useSignupStepStore } from "@/app/(auth)/signup/flow/store"

export default function ChatroomPage() {
  const resetSignup = useSignupStepStore((s) => s.reset)
  useEffect(() => {
    resetSignup()
  }, [resetSignup])

  return (
    <main className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
      <ChatInterface />
    </main>
  )
}
