"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Paperclip, Smile, Send, ImageIcon, Mic } from "lucide-react"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

// Sample message data
const initialMessages = [
  {
    id: 1,
    user: "Alex Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "Hey everyone! Just joined the server. I'm a CS major, second year. Anyone working on any cool projects?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    isNew: false,
    color: "#FF8C61",
  },
  {
    id: 2,
    user: "Jordan Taylor",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "Welcome Alex! I'm working on a machine learning project for my thesis. Would love to chat about it sometime.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1), // 1 hour ago
    isNew: false,
    color: "#5D9CEC",
  },
  {
    id: 3,
    user: "Morgan Lee",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "Has anyone taken Professor Wilson's AI course? Thinking about enrolling next semester.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    isNew: false,
    color: "#AC92EB",
  },
  {
    id: 4,
    user: "Riley Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "I took it last year! It's challenging but definitely worth it. The final project is super interesting.",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    isNew: true,
    color: "#4FC1E8",
  },
  {
    id: 5,
    user: "Casey Williams",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "Anyone going to the hackathon this weekend?",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    isNew: true,
    color: "#FFCE54",
  },
]

export function ChatArea() {
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const message = {
      id: messages.length + 1,
      user: "You",
      avatar: "/placeholder.svg?height=40&width=40",
      content: newMessage,
      timestamp: new Date(),
      isNew: true,
      color: "#4FC1E8",
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })
  }

  // Group messages by date
  const messagesByDate: Record<string, typeof messages> = {}
  messages.forEach((message) => {
    const dateKey = formatDate(message.timestamp)
    if (!messagesByDate[dateKey]) {
      messagesByDate[dateKey] = []
    }
    messagesByDate[dateKey].push(message)
  })

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 relative">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-6">
        {Object.entries(messagesByDate).map(([date, dateMessages]) => (
          <div key={date} className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px flex-1 bg-slate-200"></div>
              <span className="text-xs text-slate-500 font-medium px-2 py-1 bg-slate-100 rounded-full">{date}</span>
              <div className="h-px flex-1 bg-slate-200"></div>
            </div>

            {dateMessages.map((message, index) => {
              const isNewMessageGroup = index === 0 || message.isNew !== dateMessages[index - 1].isNew

              return (
                <div key={message.id} className="group">
                  {message.isNew && isNewMessageGroup && (
                    <div className="flex items-center gap-2 mb-4 mt-6">
                      <div className="h-px flex-1 bg-blue-100"></div>
                      <span className="text-xs text-blue-500 font-medium px-2 py-1 bg-blue-50 rounded-full">
                        New Messages
                      </span>
                      <div className="h-px flex-1 bg-blue-100"></div>
                    </div>
                  )}

                  <div className="flex gap-3 max-w-3xl mx-auto">
                    <div className="flex-shrink-0 mt-1">
                      <div className="relative">
                        <img
                          src={message.avatar || "/placeholder.svg"}
                          alt={message.user}
                          className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium" style={{ color: message.color }}>
                          {message.user}
                        </span>
                        <span className="text-xs text-slate-400">{formatTime(message.timestamp)}</span>
                      </div>

                      <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-slate-100">
                        <p className="text-slate-700 leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-50 rounded-2xl p-2 shadow-sm border border-slate-200">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message #public"
              className="min-h-[60px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent resize-none text-slate-700 placeholder:text-slate-400"
            />

            <div className="flex items-center justify-between pt-2">
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-8 w-8 text-slate-500 hover:text-slate-700 hover:bg-slate-200"
                >
                  <ImageIcon className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-8 w-8 text-slate-500 hover:text-slate-700 hover:bg-slate-200"
                >
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-8 w-8 text-slate-500 hover:text-slate-700 hover:bg-slate-200"
                >
                  <Mic className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-8 w-8 text-slate-500 hover:text-slate-700 hover:bg-slate-200"
                >
                  <Smile className="h-5 w-5" />
                </Button>
              </div>

              <Button
                onClick={handleSendMessage}
                disabled={newMessage.trim() === ""}
                size="sm"
                className={cn(
                  "rounded-full px-4 py-2 h-8 bg-blue-500 hover:bg-blue-600 text-white gap-1.5 transition-all",
                  newMessage.trim() === "" ? "opacity-50" : "opacity-100",
                )}
              >
                <span>Send</span>
                <Send className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
