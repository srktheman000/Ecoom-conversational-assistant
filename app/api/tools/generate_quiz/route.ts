import { questions } from '@/config/data/demo-data'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { topicId, difficulty, questionCount } = body

    if (!topicId) {
      return NextResponse.json(
        { error: 'Topic ID is required' },
        { status: 400 }
      )
    }

    // Filter questions by topic and difficulty
    let filteredQuestions = questions.filter(q => q.topicId === topicId)

    if (difficulty) {
      filteredQuestions = filteredQuestions.filter(
        q => q.difficulty === difficulty
      )
    }

    // If there are not enough questions for the requested topic/difficulty,
    // just return what we have
    const count = Math.min(questionCount || 3, filteredQuestions.length)

    // Select random questions up to the count
    const selectedQuestions = []
    const indices = new Set()

    while (
      selectedQuestions.length < count &&
      indices.size < filteredQuestions.length
    ) {
      const randomIndex = Math.floor(Math.random() * filteredQuestions.length)
      if (!indices.has(randomIndex)) {
        indices.add(randomIndex)
        selectedQuestions.push(filteredQuestions[randomIndex])
      }
    }

    // Create the quiz
    const quiz = {
      id: `dynamic-quiz-${Date.now()}`,
      topicId,
      title: `Quiz on ${filteredQuestions[0]?.topicId || 'Selected Topic'}`,
      difficulty: difficulty || 'mixed',
      questions: selectedQuestions
    }

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500))

    return NextResponse.json({ quiz })
  } catch (error) {
    console.error('Error generating quiz:', error)
    return NextResponse.json(
      { error: 'Failed to generate quiz' },
      { status: 500 }
    )
  }
}
