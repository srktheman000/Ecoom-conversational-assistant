// app/api/auth/session/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '../../../../lib/mongodb'
import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { ObjectId } from 'mongodb'

export async function GET(request: NextRequest) {
  try {
    // Get token from cookies
    const token = cookies().get('auth-token')?.value

    if (!token) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Verify token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
    const { payload } = await jwtVerify(token, secret)
    const userId = payload.id as string

    // Connect to MongoDB
    const { db } = await connectToDatabase()

    // Find user by ID
    const user = await db
      .collection('users')
      .findOne({ _id: new ObjectId(userId) }, { projection: { password: 0 } })

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 401 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Session check error:', error)
    return NextResponse.json(
      { message: 'Invalid or expired token' },
      { status: 401 }
    )
  }
}
