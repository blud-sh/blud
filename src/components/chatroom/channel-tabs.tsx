"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Hash, Lock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

const channels = [
  { id: 1, name: "public", type: "public", memberCount: 1243 },
  { id: 2, name: "members-only", type: "private", memberCount: 567 },
]

export function ChannelTabs() {
  const [activeChannel, setActiveChannel] = useState(1)

  return (
    <div className="flex items-center gap-1 px-4 py-2 bg-white border-b border-slate-200">
      <div className="flex-1 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {channels.map((channel) => (
          <Button
            key={channel.id}
            variant="ghost"
            onClick={() => setActiveChannel(channel.id)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 h-8 rounded-full text-sm transition-all",
              channel.id === activeChannel
                ? "bg-slate-100 text-slate-900 font-medium shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50",
            )}
          >
            {channel.type === "public" ? <Hash className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
            <span>{channel.name}</span>
            <span className="ml-1 text-xs px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-600">
              {channel.memberCount}
            </span>
          </Button>
        ))}
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="ml-auto flex items-center gap-1.5 px-3 py-1.5 h-8 rounded-full text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 lg:hidden"
      >
        <Users className="w-3.5 h-3.5" />
        <span className="text-xs px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-600">
          {channels.find((c) => c.id === activeChannel)?.memberCount}
        </span>
      </Button>
    </div>
  )
}
