import { subjects } from '@/config/data/demo-data'
import { NextResponse } from 'next/server'
import { validateSession } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    await validateSession(request)

    // Simulating database fetch with a slight delay
    await new Promise(resolve => setTimeout(resolve, 300))

    return NextResponse.json({ subjects })
  } catch (error) {
    console.error('Error fetching subjects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subjects' },
      { status: 500 }
    )
  }
}
