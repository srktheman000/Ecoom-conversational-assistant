import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  // Mock session retrieval logic (replace with real logic)
  return NextResponse.json({
    success: true,
    user: { email: 'test@example.com', grade: '6' }
  })
}
