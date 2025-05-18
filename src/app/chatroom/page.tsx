"use client"

import { ChatInterface } from "@/components/chatroom/chat-interface"

export default function ChatroomPage() {
  return (
    <main className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
      <ChatInterface />
    </main>
  )
}
