import { NextRequest, NextResponse } from 'next/server'

const mockSubjects = [
  {
    id: 'math',
    title: 'Mathematics',
    description: 'Learn about numbers and equations.',
    chapterCount: 12
  },
  {
    id: 'science',
    title: 'Science',
    description: 'Explore the world of physics, chemistry, and biology.',
    chapterCount: 15
  },
  {
    id: 'history',
    title: 'History',
    description: 'Dive into the past and learn about historical events.',
    chapterCount: 10
  }
]

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const grade = searchParams.get('grade')

  // Mock filtering logic based on grade (replace with real logic)
  const filteredSubjects = mockSubjects.filter(subject => subject)

  return NextResponse.json({ subjects: filteredSubjects })
}
