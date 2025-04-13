import { concepts, topics } from '@/config/data/demo-data'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query')

    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      )
    }

    // Search concepts by name and definition
    const lowercaseQuery = query.toLowerCase()
    const matchedConcepts = concepts.filter(
      concept =>
        concept.name.toLowerCase().includes(lowercaseQuery) ||
        concept.definition.toLowerCase().includes(lowercaseQuery)
    )

    // Enhance results with related topics
    const enhancedResults = matchedConcepts.map(concept => {
      const relatedTopicsList = topics.filter(topic =>
        concept.topicIds.includes(topic.id)
      )

      return {
        ...concept,
        relatedTopics: relatedTopicsList.map(topic => ({
          id: topic.id,
          title: topic.title
        }))
      }
    })

    // Simulate database search
    await new Promise(resolve => setTimeout(resolve, 400))

    return NextResponse.json({
      results: enhancedResults,
      count: enhancedResults.length
    })
  } catch (error) {
    console.error('Error searching concepts:', error)
    return NextResponse.json(
      { error: 'Failed to search concepts' },
      { status: 500 }
    )
  }
}
