import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email, password, grade } = await req.json()

  // Mock signup logic (replace with real logic)
  if (email && password && grade) {
    return NextResponse.json({ success: true, message: 'Signup successful' })
  }

  return NextResponse.json(
    { success: false, message: 'Invalid input' },
    { status: 400 }
  )
}
