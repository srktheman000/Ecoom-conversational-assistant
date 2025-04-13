import { questions } from '@/config/data/demo-data'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { questionId, studentAnswer } = body

    if (!questionId || studentAnswer === undefined) {
      return NextResponse.json(
        { error: 'Question ID and student answer are required' },
        { status: 400 }
      )
    }

    // Find the question by ID
    const question = questions.find(q => q.id === questionId)

    if (!question) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 })
    }

    // Check if the answer is correct
    // For short answers, do a simple case-insensitive contains check
    // In a real app, you'd want more sophisticated answer checking
    let isCorrect = false
    if (question.type === 'short_answer') {
      isCorrect = question.correctAnswer
        .toLowerCase()
        .includes(studentAnswer.toLowerCase())
    } else {
      isCorrect =
        studentAnswer.toLowerCase() === question.correctAnswer.toLowerCase()
    }

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 300))

    return NextResponse.json({
      isCorrect,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation
    })
  } catch (error) {
    console.error('Error checking answer:', error)
    return NextResponse.json(
      { error: 'Failed to check answer' },
      { status: 500 }
    )
  }
}
