"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Sample user data
const users = [
  {
    id: 1,
    name: "Alex Chen",
    status: "online",
    avatar: "/placeholder.svg?height=40&width=40",
    course: "Computer Science",
    year: "Sophomore",
    color: "#FF8C61",
  },
  {
    id: 2,
    name: "Jordan Taylor",
    status: "online",
    avatar: "/placeholder.svg?height=40&width=40",
    course: "Data Science",
    year: "Senior",
    color: "#5D9CEC",
  },
  {
    id: 3,
    name: "Morgan Lee",
    status: "online",
    avatar: "/placeholder.svg?height=40&width=40",
    course: "Electrical Engineering",
    year: "Junior",
    color: "#AC92EB",
  },
  {
    id: 4,
    name: "Riley Johnson",
    status: "idle",
    avatar: "/placeholder.svg?height=40&width=40",
    course: "Computer Science",
    year: "Freshman",
    color: "#4FC1E8",
  },
  {
    id: 5,
    name: "Casey Williams",
    status: "online",
    avatar: "/placeholder.svg?height=40&width=40",
    course: "Mechanical Engineering",
    year: "Senior",
    color: "#FFCE54",
  },
  {
    id: 6,
    name: "Taylor Smith",
    status: "idle",
    avatar: "/placeholder.svg?height=40&width=40",
    course: "Physics",
    year: "Junior",
    color: "#A0D568",
  },
  {
    id: 7,
    name: "Jamie Garcia",
    status: "offline",
    avatar: "/placeholder.svg?height=40&width=40",
    course: "Mathematics",
    year: "Sophomore",
    color: "#ED5565",
  },
  {
    id: 8,
    name: "Quinn Murphy",
    status: "offline",
    avatar: "/placeholder.svg?height=40&width=40",
    course: "Biology",
    year: "Senior",
    color: "#FC6E51",
  },
]

// Group users by status
const groupedUsers = {
  online: users.filter((user) => user.status === "online"),
  idle: users.filter((user) => user.status === "idle"),
  offline: users.filter((user) => user.status === "offline"),
}

interface MembersPanelProps {
  onClose: () => void
}

export function MembersPanel({ onClose }: MembersPanelProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredUsers =
    searchQuery.trim() === ""
      ? groupedUsers
      : {
          online: groupedUsers.online.filter(
            (user) =>
              user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              user.course.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
          idle: groupedUsers.idle.filter(
            (user) =>
              user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              user.course.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
          offline: groupedUsers.offline.filter(
            (user) =>
              user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              user.course.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        }

  return (
    <div className="h-full bg-white border-l border-slate-200 flex flex-col shadow-lg lg:shadow-none">
      <div className="flex items-center justify-between p-4 border-b border-slate-200">
        <h3 className="font-medium text-slate-900">Members</h3>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full lg:hidden" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-4 border-b border-slate-200">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search members"
            className="pl-9 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-blue-500 rounded-full h-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {filteredUsers.online.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-slate-500 mb-3">ONLINE — {filteredUsers.online.length}</h4>
            <div className="space-y-2">
              {filteredUsers.online.map((user) => (
                <div key={user.id} className="group">
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors">
                    <div className="relative">
                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        className="w-9 h-9 rounded-full border-2 border-white shadow-sm"
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium" style={{ color: user.color }}>
                        {user.name}
                      </span>
                      <span className="text-xs text-slate-500">{user.course}</span>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredUsers.idle.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-slate-500 mb-3">IDLE — {filteredUsers.idle.length}</h4>
            <div className="space-y-2">
              {filteredUsers.idle.map((user) => (
                <div key={user.id} className="group">
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors">
                    <div className="relative">
                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        className="w-9 h-9 rounded-full border-2 border-white shadow-sm"
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-amber-500 rounded-full border-2 border-white" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium" style={{ color: user.color }}>
                        {user.name}
                      </span>
                      <span className="text-xs text-slate-500">{user.course}</span>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredUsers.offline.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-slate-500 mb-3">OFFLINE — {filteredUsers.offline.length}</h4>
            <div className="space-y-2">
              {filteredUsers.offline.map((user) => (
                <div key={user.id} className="group">
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors">
                    <div className="relative">
                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        className="w-9 h-9 rounded-full border-2 border-white shadow-sm opacity-70"
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-slate-400 rounded-full border-2 border-white" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium text-slate-500">{user.name}</span>
                      <span className="text-xs text-slate-400">{user.course}</span>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
