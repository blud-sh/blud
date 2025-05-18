"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Sample user data
const users = [
  {
    id: 1,
    name: "Alex Chen",
    status: "online",
    avatar: "/placeholder.svg?height=40&width=40",
    course: "Computer Science",
    year: "Sophomore",
  },
  {
    id: 2,
    name: "Jordan Taylor",
    status: "online",
    avatar: "/placeholder.svg?height=40&width=40",
    course: "Data Science",
    year: "Senior",
  },
  {
    id: 3,
    name: "Morgan Lee",
    status: "online",
    avatar: "/placeholder.svg?height=40&width=40",
    course: "Electrical Engineering",
    year: "Junior",
  },
  {
    id: 4,
    name: "Riley Johnson",
    status: "idle",
    avatar: "/placeholder.svg?height=40&width=40",
    course: "Computer Science",
    year: "Freshman",
  },
  {
    id: 5,
    name: "Casey Williams",
    status: "online",
    avatar: "/placeholder.svg?height=40&width=40",
    course: "Mechanical Engineering",
    year: "Senior",
  },
  {
    id: 6,
    name: "Taylor Smith",
    status: "idle",
    avatar: "/placeholder.svg?height=40&width=40",
    course: "Physics",
    year: "Junior",
  },
  {
    id: 7,
    name: "Jamie Garcia",
    status: "offline",
    avatar: "/placeholder.svg?height=40&width=40",
    course: "Mathematics",
    year: "Sophomore",
  },
  {
    id: 8,
    name: "Quinn Murphy",
    status: "offline",
    avatar: "/placeholder.svg?height=40&width=40",
    course: "Biology",
    year: "Senior",
  },
]

// Group users by status
const groupedUsers = {
  online: users.filter((user) => user.status === "online"),
  idle: users.filter((user) => user.status === "idle"),
  offline: users.filter((user) => user.status === "offline"),
}

export function ProfilesPanel() {
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
    <div className="w-60 h-full bg-zinc-800 flex flex-col">
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-400" />
          <Input
            type="text"
            placeholder="Search members"
            className="pl-9 bg-zinc-700 border-zinc-700 text-zinc-200 placeholder:text-zinc-400 focus-visible:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <TooltipProvider delayDuration={300}>
          {filteredUsers.online.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-zinc-400 mb-2">ONLINE — {filteredUsers.online.length}</h3>
              <div className="space-y-1">
                {filteredUsers.online.map((user) => (
                  <Tooltip key={user.id}>
                    <TooltipTrigger asChild>
                      <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-zinc-700 group">
                        <div className="relative">
                          <img
                            src={user.avatar || "/placeholder.svg"}
                            alt={user.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-800" />
                        </div>
                        <span className="text-sm text-zinc-300 truncate">{user.name}</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="p-0 overflow-hidden">
                      <div className="p-4 bg-zinc-800 w-64">
                        <div className="flex gap-3">
                          <div className="relative">
                            <img
                              src={user.avatar || "/placeholder.svg"}
                              alt={user.name}
                              className="w-12 h-12 rounded-full"
                            />
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-800" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-white">{user.name}</h4>
                            <p className="text-sm text-zinc-400">{user.course}</p>
                            <p className="text-sm text-zinc-400">{user.year}</p>
                          </div>
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          )}

          {filteredUsers.idle.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-zinc-400 mb-2">IDLE — {filteredUsers.idle.length}</h3>
              <div className="space-y-1">
                {filteredUsers.idle.map((user) => (
                  <Tooltip key={user.id}>
                    <TooltipTrigger asChild>
                      <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-zinc-700 group">
                        <div className="relative">
                          <img
                            src={user.avatar || "/placeholder.svg"}
                            alt={user.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-yellow-500 rounded-full border-2 border-zinc-800" />
                        </div>
                        <span className="text-sm text-zinc-300 truncate">{user.name}</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="p-0 overflow-hidden">
                      <div className="p-4 bg-zinc-800 w-64">
                        <div className="flex gap-3">
                          <div className="relative">
                            <img
                              src={user.avatar || "/placeholder.svg"}
                              alt={user.name}
                              className="w-12 h-12 rounded-full"
                            />
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-yellow-500 rounded-full border-2 border-zinc-800" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-white">{user.name}</h4>
                            <p className="text-sm text-zinc-400">{user.course}</p>
                            <p className="text-sm text-zinc-400">{user.year}</p>
                          </div>
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          )}

          {filteredUsers.offline.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-zinc-400 mb-2">OFFLINE — {filteredUsers.offline.length}</h3>
              <div className="space-y-1">
                {filteredUsers.offline.map((user) => (
                  <Tooltip key={user.id}>
                    <TooltipTrigger asChild>
                      <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-zinc-700 group">
                        <div className="relative">
                          <img
                            src={user.avatar || "/placeholder.svg"}
                            alt={user.name}
                            className="w-8 h-8 rounded-full opacity-70"
                          />
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-zinc-500 rounded-full border-2 border-zinc-800" />
                        </div>
                        <span className="text-sm text-zinc-500 truncate">{user.name}</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="p-0 overflow-hidden">
                      <div className="p-4 bg-zinc-800 w-64">
                        <div className="flex gap-3">
                          <div className="relative">
                            <img
                              src={user.avatar || "/placeholder.svg"}
                              alt={user.name}
                              className="w-12 h-12 rounded-full opacity-70"
                            />
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-zinc-500 rounded-full border-2 border-zinc-800" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-white">{user.name}</h4>
                            <p className="text-sm text-zinc-400">{user.course}</p>
                            <p className="text-sm text-zinc-400">{user.year}</p>
                          </div>
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          )}
        </TooltipProvider>
      </div>
    </div>
  )
}
