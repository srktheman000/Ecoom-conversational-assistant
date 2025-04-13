import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  // Mock authentication logic (replace with real logic)
  if (email === 'test@example.com' && password === 'password') {
    return NextResponse.json({ success: true, message: 'Login successful' })
  }

  return NextResponse.json(
    { success: false, message: 'Invalid credentials' },
    { status: 401 }
  )
}
