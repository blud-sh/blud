"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

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
    <div className="relative">
      <Button
        variant="outline"
        className="w-auto justify-between border-slate-200 bg-white text-slate-900 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-200 px-3 py-5 h-9 rounded-full"
        onClick={() => setOpen(!open)}
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
      
      {open && (
        <div className="absolute top-full left-0 mt-2 w-[250px] p-2 bg-white/95 backdrop-blur-sm border border-slate-200 shadow-lg rounded-xl z-50">
          <input 
            type="text" 
            placeholder="Search university..." 
            className="w-full h-9 px-3 py-2 border border-slate-200 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="max-h-[200px] overflow-y-auto">
            {universities.map((university) => (
              <button
                key={university.id}
                onClick={() => {
                  setSelectedUniversity(university)
                  setOpen(false)
                }}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg mx-1 text-slate-700 w-full hover:bg-slate-100"
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium"
                  style={{ backgroundColor: university.color }}
                >
                  {university.acronym}
                </div>
                <span>{university.name}</span>
                {selectedUniversity.id === university.id && <Check className="ml-auto h-4 w-4 text-emerald-500" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
