"use client"

import { useState } from "react"
import { Hash, Lock, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const channels = [
  { id: 1, name: "public", type: "public", memberCount: 1243 },
  { id: 2, name: "members-only", type: "private", memberCount: 567 },
]

export function ChannelsPanel() {
  const [activeChannel, setActiveChannel] = useState(1)
  const activeServer = "Stanford University"

  return (
    <div className="w-60 h-full bg-zinc-800 flex flex-col">
      <div className="h-14 border-b border-zinc-700 flex items-center px-4">
        <h2 className="font-semibold text-white truncate">{activeServer}</h2>
        <ChevronDown className="w-4 h-4 ml-auto text-zinc-400" />
      </div>

      <div className="p-4">
        <div className="text-xs font-semibold text-zinc-400 mb-2 flex items-center">
          <span>CHANNELS</span>
        </div>

        <div className="space-y-1">
          {channels.map((channel) => (
            <button
              key={channel.id}
              onClick={() => setActiveChannel(channel.id)}
              className={cn(
                "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm group transition-colors",
                channel.id === activeChannel
                  ? "bg-primary/10 text-primary"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700/50",
              )}
            >
              {channel.type === "public" ? <Hash className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              <span className="truncate">{channel.name}</span>
              <span
                className={cn(
                  "ml-auto text-xs px-1.5 py-0.5 rounded-full",
                  channel.id === activeChannel
                    ? "bg-primary/20 text-primary"
                    : "bg-zinc-700 text-zinc-400 group-hover:bg-zinc-600 group-hover:text-zinc-300",
                )}
              >
                {channel.memberCount}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
