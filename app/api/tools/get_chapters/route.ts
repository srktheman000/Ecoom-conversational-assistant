import { chapters } from '@/config/data/demo-data'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const subjectId = searchParams.get('subjectId')

    if (!subjectId) {
      return NextResponse.json(
        { error: 'Subject ID is required' },
        { status: 400 }
      )
    }

    // Filter chapters by subject ID
    const filteredChapters = chapters.filter(
      chapter => chapter.subjectId === subjectId
    )

    // Simulate database fetch
    await new Promise(resolve => setTimeout(resolve, 300))

    return NextResponse.json({ chapters: filteredChapters })
  } catch (error) {
    console.error('Error fetching chapters:', error)
    return NextResponse.json(
      { error: 'Failed to fetch chapters' },
      { status: 500 }
    )
  }
}
