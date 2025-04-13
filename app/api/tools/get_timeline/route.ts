import { timelines } from '@/config/data/demo-data'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const topicId = searchParams.get('topicId')
    const timeframeStart = searchParams.get('timeframeStart')
    const timeframeEnd = searchParams.get('timeframeEnd')

    if (!topicId) {
      return NextResponse.json(
        { error: 'Topic ID is required' },
        { status: 400 }
      )
    }

    // Find the timeline by topic ID
    const timeline = timelines.find(timeline => timeline.topicId === topicId)

    if (!timeline) {
      return NextResponse.json(
        { error: 'Timeline not found for this topic' },
        { status: 404 }
      )
    }

    // Filter events by timeframe if provided
    let filteredEvents = [...timeline.events]

    if (timeframeStart || timeframeEnd) {
      filteredEvents = timeline.events.filter(event => {
        // Simple string comparison for demo purposes
        // In a real app, would parse dates properly
        if (timeframeStart && timeframeEnd) {
          return event.date >= timeframeStart && event.date <= timeframeEnd
        } else if (timeframeStart) {
          return event.date >= timeframeStart
        } else if (timeframeEnd) {
          return event.date <= timeframeEnd
        }
        return true
      })
    }

    // Simulate database fetch
    await new Promise(resolve => setTimeout(resolve, 300))

    const result = {
      id: timeline.id,
      topicId: timeline.topicId,
      title: timeline.title,
      events: filteredEvents
    }

    return NextResponse.json({ timeline: result })
  } catch (error) {
    console.error('Error fetching timeline:', error)
    return NextResponse.json(
      { error: 'Failed to fetch timeline' },
      { status: 500 }
    )
  }
}
