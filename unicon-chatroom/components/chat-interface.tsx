"use client"

import { useState } from "react"
import { UniversitySelector } from "@/components/university-selector"
import { ChannelTabs } from "@/components/channel-tabs"
import { ChatArea } from "@/components/chat-area"
import { MembersPanel } from "@/components/members-panel"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"

export function ChatInterface() {
  const [showMembers, setShowMembers] = useState(false)

  return (
    <div className="flex flex-col w-full h-full relative">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 shadow-sm">
        <UniversitySelector />
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden"
            onClick={() => setShowMembers(!showMembers)}
          >
            <Users className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Channel Tabs */}
      <ChannelTabs />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        <ChatArea />

        {/* Members Panel - Hidden on mobile unless toggled */}
        <div
          className={`${showMembers ? "block" : "hidden"} lg:block w-full lg:w-72 h-full absolute right-0 top-[105px] bottom-0 lg:relative lg:top-0 z-10`}
        >
          <MembersPanel onClose={() => setShowMembers(false)} />
        </div>
      </div>
    </div>
  )
}
