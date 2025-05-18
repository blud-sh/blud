"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"

const universities = [
  { id: 1, name: "Stanford University", acronym: "SU", color: "#FF8C61" },
  { id: 2, name: "MIT", acronym: "MIT", color: "#5D9CEC" },
  { id: 3, name: "Harvard University", acronym: "HU", color: "#AC92EB" },
  { id: 4, name: "UC Berkeley", acronym: "UCB", color: "#4FC1E8" },
  { id: 5, name: "Princeton", acronym: "PU", color: "#FFCE54" },
]

export function UniversitySelector() {
  const [open, setOpen] = useState(false)
  const [selectedUniversity, setSelectedUniversity] = useState(universities[0])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-auto justify-between border-slate-200 bg-white text-slate-900 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-200 px-3 py-5 h-9 rounded-full"
        >
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium"
              style={{ backgroundColor: selectedUniversity.color }}
            >
              {selectedUniversity.acronym}
            </div>
            <span className="font-medium">{selectedUniversity.name}</span>
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0 bg-white/95 backdrop-blur-sm border border-slate-200 shadow-lg rounded-xl">
        <Command className="bg-transparent">
          <CommandInput placeholder="Search university..." className="h-9 border-none focus:ring-0" />
          <CommandList>
            <CommandEmpty>No university found.</CommandEmpty>
            <CommandGroup className="py-1">
              {universities.map((university) => (
                <CommandItem
                  key={university.id}
                  value={university.name}
                  onSelect={() => {
                    setSelectedUniversity(university)
                    setOpen(false)
                  }}
                  className="flex items-center gap-2 px-2 py-1.5 aria-selected:bg-slate-100 rounded-lg mx-1 text-slate-700"
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium"
                    style={{ backgroundColor: university.color }}
                  >
                    {university.acronym}
                  </div>
                  <span>{university.name}</span>
                  {selectedUniversity.id === university.id && <Check className="ml-auto h-4 w-4 text-emerald-500" />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
