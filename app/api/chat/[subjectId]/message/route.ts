import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { content } = await req.json()

  // Mock AI response logic (replace with real logic)
  const aiResponse = { content: `You said: ${content}`, sender: 'assistant' }

  return NextResponse.json({ success: true, message: aiResponse })
}
