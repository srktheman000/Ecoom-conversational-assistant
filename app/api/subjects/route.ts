// app/api/subjects/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '../../../lib/mongodb'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const grade = searchParams.get('grade')

    if (!grade) {
      return NextResponse.json(
        { message: 'Grade parameter is required' },
        { status: 400 }
      )
    }

    // Connect to MongoDB
    const { db } = await connectToDatabase()

    // Find subjects for the specified grade
    const subjects = await db
      .collection('subjects')
      .find({ grade: parseInt(grade) })
      .toArray()

    return NextResponse.json({ subjects })
  } catch (error) {
    console.error('Error fetching subjects:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
