'use client'
import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Assistant from '@/components/assistant'

const ChatPage = () => {
  const { subjectId } = useParams()
  const [messages, setMessages] = useState<
    { content: string; sender: string }[]
  >([])
  const [input, setInput] = useState('')

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch(`/api/chat/${subjectId}/messages`)
      const data = await res.json()
      setMessages(data.messages || [])
    }

    fetchMessages()
  }, [subjectId])

  const sendMessage = async () => {
    if (!input.trim()) return

    const res = await fetch(`/api/chat/${subjectId}/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: input })
    })

    const data = await res.json()
    if (data.success) {
      setMessages(prev => [
        ...prev,
        { content: input, sender: 'user' },
        data.message
      ])
      setInput('')
    }
  }

  return (
    <div className="flex h-screen">
      <Assistant />
    </div>
  )
}

export default ChatPage
