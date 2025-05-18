"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const universities = [
  { id: 1, name: "Stanford University", acronym: "SU", color: "bg-primary" },
  { id: 2, name: "MIT", acronym: "MIT", color: "bg-zinc-700" },
  { id: 3, name: "Harvard University", acronym: "HU", color: "bg-zinc-700" },
  { id: 4, name: "UC Berkeley", acronym: "UCB", color: "bg-zinc-700" },
  { id: 5, name: "Princeton", acronym: "PU", color: "bg-zinc-700" },
]

export function ServerSidebar() {
  const [activeServer, setActiveServer] = useState(1)

  return (
    <div className="w-[72px] h-full bg-zinc-900 flex flex-col items-center py-4 gap-4">
      <TooltipProvider delayDuration={200}>
        {universities.map((uni) => (
          <Tooltip key={uni.id}>
            <TooltipTrigger asChild>
              <button
                onClick={() => setActiveServer(uni.id)}
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center text-white font-medium transition-all duration-200 hover:rounded-2xl relative",
                  uni.id === activeServer ? uni.color : "bg-zinc-700 hover:bg-primary/80",
                )}
              >
                {uni.acronym}
                {uni.id === activeServer && <div className="absolute left-0 w-1 h-8 bg-white rounded-r-full" />}
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="font-medium">
              {uni.name}
            </TooltipContent>
          </Tooltip>
        ))}

        <Tooltip>
          <TooltipTrigger asChild>
            <button className="w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center text-white hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:rounded-2xl mt-2">
              <Plus className="w-5 h-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" className="font-medium">
            Join or create university
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
