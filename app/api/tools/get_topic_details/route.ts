import { topics } from '@/config/data/demo-data'
import { NextResponse } from 'next/server'
import { validateSession } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    await validateSession(request)

    const { searchParams } = new URL(request.url)
    const topicId = searchParams.get('topicId')

    if (!topicId) {
      return NextResponse.json(
        { error: 'Topic ID is required' },
        { status: 400 }
      )
    }

    // Find the topic by ID
    const topic = topics.find(topic => topic.id === topicId)

    if (!topic) {
      return NextResponse.json({ error: 'Topic not found' }, { status: 404 })
    }

    // Simulate database fetch
    await new Promise(resolve => setTimeout(resolve, 300))

    return NextResponse.json({ topic })
  } catch (error) {
    console.error('Error fetching topic details:', error)
    return NextResponse.json(
      { error: 'Failed to fetch topic details' },
      { status: 500 }
    )
  }
}
