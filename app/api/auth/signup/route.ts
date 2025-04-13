// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '../../../../lib/mongodb'
import { hash } from 'bcryptjs'
import { SignJWT } from 'jose'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Name, email, password, and grade are required' },
        { status: 400 }
      )
    }

    // Connect to MongoDB
    const { db } = await connectToDatabase()

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email })

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await hash(password, 12)

    // Create new user
    const result = await db.collection('users').insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date()
    })

    // Get the created user (without password)
    const user = await db
      .collection('users')
      .findOne({ _id: result.insertedId }, { projection: { password: 0 } })

    // Create JWT token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
    const token = await new SignJWT({
      id: user._id.toString(),
      email: user.email,
      name: user.name
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(secret)

    // Set HTTP-only cookie
    cookies().set({
      name: 'auth-token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/'
    })

    return NextResponse.json({
      message: 'User created successfully',
      user
    })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
