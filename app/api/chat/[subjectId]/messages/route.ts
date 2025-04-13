import { NextRequest, NextResponse } from 'next/server'

const mockMessages = [
  { content: 'Welcome to the chat!', sender: 'assistant' },
  { content: 'How can I help you today?', sender: 'assistant' }
]

export async function GET(req: NextRequest) {
  // Mock fetching messages for a subject (replace with real logic)
  return NextResponse.json({ messages: mockMessages })
}
