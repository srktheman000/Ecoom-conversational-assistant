import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  // Mock logout logic (replace with real logic)
  return NextResponse.json({ success: true, message: 'Logout successful' })
}
