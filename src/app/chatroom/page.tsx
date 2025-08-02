"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Send, MoreHorizontal, Search, Plus, Smile, ChevronDown, Lock, Hash, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { useSignupStepStore } from "@/app/(auth)/signup/flow/store"
import dynamic from 'next/dynamic'

const EmojiPicker = dynamic(
  () => import('emoji-picker-react'),
  { ssr: false }
)

interface Message {
  id: string
  user: string
  text: string
  timestamp: Date
  avatar: string
  likes: number
  isLiked: boolean
  reactions: { [emoji: string]: { count: number; users: string[] } }
}

interface User {
  id: string
  name: string
  avatar: string
  status: "online" | "offline"
  lastSeen?: Date
}

interface Chatroom {
  id: string
  name: string
  type: "general" | "private"
  unread?: number
}

export default function ChatroomPage() {
  const resetSignup = useSignupStepStore((s) => s.reset)
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      user: "alex",
      text: "hey everyone! just finished working on this new project, super excited to share it with you all",
      timestamp: new Date(Date.now() - 300000),
      avatar: "alex",
      likes: 12,
      isLiked: false,
      reactions: {
        "🔥": { count: 3, users: ["maya", "jordan", "sam"] },
        "👏": { count: 2, users: ["riley", "casey"] },
      },
    },
    {
      id: "2",
      user: "maya",
      text: "can't wait to see what you've been working on!",
      timestamp: new Date(Date.now() - 280000),
      avatar: "maya",
      likes: 5,
      isLiked: true,
      reactions: {
        "❤️": { count: 4, users: ["alex", "jordan", "sam", "you"] },
      },
    },
    {
      id: "3",
      user: "sam",
      text: "anyone else think we should plan a meetup soon?",
      timestamp: new Date(Date.now() - 180000),
      avatar: "sam",
      likes: 8,
      isLiked: false,
      reactions: {
        "✅": { count: 5, users: ["riley", "casey", "maya", "jordan", "alex"] },
      },
    },
    {
      id: "4",
      user: "casey",
      text: "working late tonight, anyone else still up?",
      timestamp: new Date(Date.now() - 60000),
      avatar: "casey",
      likes: 15,
      isLiked: true,
      reactions: {},
    },
  ])

  const [users] = useState<User[]>([
    { id: "1", name: "alex", avatar: "alex", status: "online" },
    { id: "2", name: "maya", avatar: "maya", status: "online" },
    { id: "3", name: "jordan", avatar: "jordan", status: "online" },
    { id: "4", name: "sam", avatar: "sam", status: "offline", lastSeen: new Date(Date.now() - 1800000) },
    { id: "5", name: "riley", avatar: "riley", status: "online" },
    { id: "6", name: "casey", avatar: "casey", status: "online" },
    { id: "7", name: "taylor", avatar: "taylor", status: "offline", lastSeen: new Date(Date.now() - 3600000) },
    { id: "8", name: "morgan", avatar: "morgan", status: "offline", lastSeen: new Date(Date.now() - 7200000) },
  ])

  const [chatrooms] = useState<Chatroom[]>([
    { id: "1", name: "general", type: "general" },
    { id: "2", name: "private", type: "private" },
    { id: "3", name: "announcements", type: "general", unread: 2 },
    { id: "4", name: "random", type: "general" },
    { id: "5", name: "dev-team", type: "private", unread: 5 },
    { id: "6", name: "design", type: "general" },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [currentUser] = useState("you")
  const [currentChatroom, setCurrentChatroom] = useState<Chatroom>(chatrooms[0])
  const [showChatroomDropdown, setShowChatroomDropdown] = useState(false)
  const [showChatroomSearch, setShowChatroomSearch] = useState(false)
  const [chatroomSearch, setChatroomSearch] = useState("")
  const [showReactionPicker, setShowReactionPicker] = useState<string | null>(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [hoveredMessage, setHoveredMessage] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const { theme, setTheme } = useTheme()

  const reactions = ["❤️", "👍", "👎", "😂", "😮", "😢", "🔥", "👏", "✅", "❌"]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    resetSignup()
  }, [resetSignup])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      user: currentUser,
      text: newMessage,
      timestamp: new Date(),
      avatar: "you",
      likes: 0,
      isLiked: false,
      reactions: {},
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")
    inputRef.current?.focus()
  }

  const handleReaction = (messageId: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId) {
          const reactions = { ...msg.reactions }
          if (reactions[emoji]) {
            if (reactions[emoji].users.includes(currentUser)) {
              // removes the reaction if user already reacted
              reactions[emoji].users = reactions[emoji].users.filter((user) => user !== currentUser)
              reactions[emoji].count -= 1
              if (reactions[emoji].count === 0) {
                delete reactions[emoji]
              }
            } else {
              // adds the reaction if user hasn't reacted
              reactions[emoji].users.push(currentUser)
              reactions[emoji].count += 1
            }
          } else {
            // Create new reaction
            reactions[emoji] = { count: 1, users: [currentUser] }
          }
          return { ...msg, reactions }
        }
        return msg
      }),
    )
    setShowReactionPicker(null)
  }

  const insertEmoji = (emojiData: any) => {
    const textarea = inputRef.current
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const text = newMessage
      const newText = text.substring(0, start) + emojiData.emoji + text.substring(end)
      setNewMessage(newText)
      
      // Set cursor position after emoji
      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start + emojiData.emoji.length, start + emojiData.emoji.length)
      }, 0)
    }
    setShowEmojiPicker(false)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const formatLastSeen = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (hours < 1) return "just now"
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  const filteredChatrooms = chatrooms.filter((room) => room.name.toLowerCase().includes(chatroomSearch.toLowerCase()))

  const onlineUsers = users.filter((user) => user.status === "online")
  const offlineUsers = users.filter((user) => user.status === "offline")

  const MessageComponent = ({ message }: { message: Message }) => {
    const isCurrentUser = message.user === currentUser

    return (
      <div 
        className="group mb-4 relative"
        onMouseEnter={() => setHoveredMessage(message.id)}
        onMouseLeave={() => setHoveredMessage(null)}
      >
        <div className={`flex gap-3 ${isCurrentUser ? "flex-row-reverse" : ""}`}>
          {/* avatar */}
          {!isCurrentUser && (
            <div className="w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-1">
              {message.avatar.charAt(0).toUpperCase()}
            </div>
          )}

          {/* message content */}
          <div className={`flex flex-col max-w-xs sm:max-w-md ${isCurrentUser ? "items-end" : "items-start"}`}>
            {/* user name and time */}
            {!isCurrentUser && (
              <div className="flex items-center gap-2 mb-1 px-1">
                <span className="text-sm font-medium text-black dark:text-white">{message.user}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{formatTime(message.timestamp)}</span>
              </div>
            )}

            {/* Message bubble */}
            <div
              className={`px-4 py-3 rounded-3xl max-w-full break-words transition-all duration-200 ${
                isCurrentUser
                  ? "bg-black text-white rounded-br-lg"
                  : "bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-bl-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <p className="text-[15px] leading-relaxed">{message.text}</p>
            </div>

            {/* time for current user */}
            {isCurrentUser && (
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-1">{formatTime(message.timestamp)}</div>
            )}

            {/* reactions */}
            {Object.keys(message.reactions).length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {Object.entries(message.reactions).map(([emoji, data]) => (
                  <button
                    key={emoji}
                    onClick={() => handleReaction(message.id, emoji)}
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-all duration-200 ${
                      data.users.includes(currentUser)
                        ? "bg-black dark:bg-white text-white dark:text-black"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    <span>{emoji}</span>
                    <span className="font-medium">{data.count}</span>
                  </button>
                ))}
              </div>
            )}

            {/* actions */}
            <div
              className={`flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${isCurrentUser ? "flex-row-reverse" : ""}`}
            >
              <div className="relative">
                <button
                  onClick={() => setShowReactionPicker(showReactionPicker === message.id ? null : message.id)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
                >
                  <Smile size={12} />
                  <span>react</span>
                </button>

                {/* reaction picker */}
                {showReactionPicker === message.id && (
                  <div className="absolute bottom-full mb-2 left-0 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg z-10">
                    <EmojiPicker
                      reactionsDefaultOpen={true}
                      reactions={reactions}
                      onReactionClick={(emojiData) => handleReaction(message.id, emojiData.emoji)}
                      theme={theme as any}
                      width={320}
                      height={300}
                    />
                  </div>
                )}
              </div>

              <button className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200">
                <MoreHorizontal size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* hover reaction picker */}
        {hoveredMessage === message.id && (
          <div className={`absolute top-0 transform -translate-y-full z-20 ${
            isCurrentUser ? 'right-0' : 'left-0'
          }`}>
            <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-2">
              <div className="flex gap-1">
                {reactions.slice(0, 6).map((reaction) => (
                  <button
                    key={reaction}
                    onClick={() => {
                      handleReaction(message.id, reaction)
                      setHoveredMessage(null)
                    }}
                    className="w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center text-lg transition-all duration-200 hover:scale-110"
                  >
                    {reaction}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setShowReactionPicker(message.id)
                    setHoveredMessage(null)
                  }}
                  className="w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center text-lg transition-all duration-200 hover:scale-110"
                >
                  <Smile size={16} className="text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="h-screen bg-white dark:bg-black flex">
      {/* main chat area */}
      <div className="flex-1 flex flex-col">
        {/* header */}
        <div className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
          {/* left - chatroom info */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setShowChatroomDropdown(!showChatroomDropdown)}
                className="flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg px-3 py-2 transition-colors"
              >
                <div className="w-10 h-10 bg-black dark:bg-white rounded-full flex items-center justify-center">
                  {currentChatroom.type === "private" ? (
                    <Lock size={18} className="text-white dark:text-black" />
                  ) : (
                    <Hash size={18} className="text-white dark:text-black" />
                  )}
                </div>
                <div className="text-left">
                  <h1 className="text-xl font-semibold text-black dark:text-white">{currentChatroom.name}</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{onlineUsers.length} online</p>
                </div>
                <ChevronDown size={16} className="text-gray-500 dark:text-gray-400" />
              </button>

              {/* chatroom dropdown */}
              {showChatroomDropdown && (
                <div className="absolute top-full left-0 mt-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20 min-w-48">
                  <div className="p-2">
                    <button
                      onClick={() => {
                        setCurrentChatroom(chatrooms[0])
                        setShowChatroomDropdown(false)
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                    >
                      <Hash size={16} className="text-gray-600 dark:text-gray-300" />
                      <span className="text-sm font-medium text-black dark:text-white">general</span>
                    </button>
                    <button
                      onClick={() => {
                        setCurrentChatroom(chatrooms[1])
                        setShowChatroomDropdown(false)
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                    >
                      <Lock size={16} className="text-gray-600 dark:text-gray-300" />
                      <span className="text-sm font-medium text-black dark:text-white">private</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* center - chatroom selector */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <button
                onClick={() => setShowChatroomSearch(!showChatroomSearch)}
                className="w-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full px-4 py-2 flex items-center gap-3 transition-colors"
              >
                <Search size={16} className="text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300">search chatrooms...</span>
              </button>

                {/* chatroom search dropdown */}
              {showChatroomSearch && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20 max-h-80 overflow-y-auto">
                  <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                    <input
                      type="text"
                      value={chatroomSearch}
                      onChange={(e) => setChatroomSearch(e.target.value)}
                      placeholder="search chatrooms..."
                      className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 text-sm outline-none text-black dark:text-white"
                      autoFocus
                    />
                  </div>
                  <div className="p-2">
                    {filteredChatrooms.map((room) => (
                      <button
                        key={room.id}
                        onClick={() => {
                          setCurrentChatroom(room)
                          setShowChatroomSearch(false)
                          setChatroomSearch("")
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {room.type === "private" ? (
                            <Lock size={16} className="text-gray-600 dark:text-gray-300" />
                          ) : (
                            <Hash size={16} className="text-gray-600 dark:text-gray-300" />
                          )}
                          <span className="text-sm font-medium text-black dark:text-white">{room.name}</span>
                        </div>
                        {room.unread && (
                          <div className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">
                            {room.unread}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* right - actions */}
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <Plus size={18} className="text-gray-600 dark:text-gray-300" />
            </button>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {theme === "dark" ? (
                <Sun size={18} className="text-gray-600 dark:text-gray-300" />
              ) : (
                <Moon size={18} className="text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* messages container */}
        <div className="flex-1 overflow-y-auto px-6 py-6 bg-white dark:bg-black">
          <div className="max-w-4xl mx-auto">
            {messages.map((message) => (
              <MessageComponent key={message.id} message={message} />
            ))}
          </div>
          <div ref={messagesEndRef} />
        </div>

        {/* input area */}
        <div className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSendMessage} className="flex items-end gap-3">
              <div className="flex-1 relative">
                <div className="flex items-end bg-gray-100 dark:bg-gray-800 rounded-3xl px-4 py-2">
                  <textarea
                    ref={inputRef}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="message"
                    className="flex-1 bg-transparent resize-none outline-none text-[16px] leading-relaxed py-2 placeholder-gray-500 dark:placeholder-gray-400 max-h-32 text-black dark:text-white"
                    rows={1}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage(e)
                      }
                    }}
                    style={{
                      height: "auto",
                      minHeight: "24px",
                    }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement
                      target.style.height = "auto"
                      target.style.height = target.scrollHeight + "px"
                    }}
                  />
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="p-1 ml-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Smile size={20} className="text-gray-500 dark:text-gray-400" />
                    </button>

                    {/* emoji picker */}
                    {showEmojiPicker && (
                      <div className="absolute bottom-full right-0 mb-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg z-20">
                        <EmojiPicker
                          onEmojiClick={insertEmoji}
                          theme={theme as any}
                          width={350}
                          height={400}
                        />
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="ml-2 w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* right sidebar - user status */}
      <div className="w-64 bg-gray-50 dark:bg-black border-l border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-black dark:text-white mb-1">Members</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{users.length} total</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* online users */}
          <div>
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
              Online — {onlineUsers.length}
            </h4>
            <div className="space-y-2">
              {onlineUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-white dark:hover:bg-gray-900 transition-colors"
                >
                  <div className="relative">
                    <div className="w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center text-sm font-medium">
                      {user.avatar.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-black rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium text-black dark:text-white">{user.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* offline users */}
          <div>
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
              Offline — {offlineUsers.length}
            </h4>
            <div className="space-y-2">
              {offlineUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-white dark:hover:bg-gray-900 transition-colors"
                >
                  <div className="relative">
                    <div className="w-8 h-8 bg-gray-400 dark:bg-gray-700 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {user.avatar.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-gray-400 dark:bg-gray-700 border-2 border-white dark:border-black rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{user.name}</div>
                    {user.lastSeen && (
                      <div className="text-xs text-gray-400 dark:text-gray-500">{formatLastSeen(user.lastSeen)}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* click outside handlers */}
      {(showChatroomDropdown || showChatroomSearch || showReactionPicker || showEmojiPicker) && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => {
            setShowChatroomDropdown(false)
            setShowChatroomSearch(false)
            setShowReactionPicker(null)
            setShowEmojiPicker(false)
            setHoveredMessage(null)
          }}
        />
      )}
    </div>
  )
}
