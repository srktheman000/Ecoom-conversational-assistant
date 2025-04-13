// Functions mapping to tool calls
// Define one function per tool call - each tool call should have a matching function

import { OpenAI } from 'openai'

// Initialize OpenAI client - make sure to configure environment variables
const openai = new OpenAI({
  apiKey: '${process.env.OPENAI_API_KEY}',
  organization: '${process.env.OPENAI_ORG_ID}',
  dangerouslyAllowBrowser: true
})

// Your vector store ID from OpenAI platform
const VECTOR_STORE_ID = 'vs_67e362f8936881919adb41714537d98c'

export const get_subjects = async () => {
  const response = await fetch('/api/tools/get_subjects', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const result = await response.json()
  return result
}

export const get_chapters = async ({ subjectId }: { subjectId: string }) => {
  const response = await fetch(
    `/api/tools/get_chapters?subjectId=${subjectId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  const result = await response.json()
  return result
}

export const get_topic_details = async ({ topicId }: { topicId: string }) => {
  const response = await fetch(
    `/api/tools/get_topic_details?topicId=${topicId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  const result = await response.json()
  return result
}

export const get_timeline = async ({
  topicId,
  timeframeStart,
  timeframeEnd
}: {
  topicId: string
  timeframeStart?: string
  timeframeEnd?: string
}) => {
  const params = new URLSearchParams()
  params.append('topicId', topicId)
  if (timeframeStart) params.append('timeframeStart', timeframeStart)
  if (timeframeEnd) params.append('timeframeEnd', timeframeEnd)

  const response = await fetch(`/api/tools/get_timeline?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const result = await response.json()
  return result
}

export const generate_quiz = async ({
  topicId,
  difficulty,
  questionCount
}: {
  topicId: string
  difficulty: string
  questionCount: number
}) => {
  const response = await fetch('/api/tools/generate_quiz', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      topicId,
      difficulty,
      questionCount
    })
  })
  const result = await response.json()
  return result
}

export const check_answer = async ({
  questionId,
  studentAnswer
}: {
  questionId: string
  studentAnswer: string
}) => {
  const response = await fetch('/api/tools/check_answer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      questionId,
      studentAnswer
    })
  })
  const result = await response.json()
  return result
}

export const search_concepts = async ({ query }: { query: string }) => {
  const response = await fetch(
    `/api/tools/search_concepts?query=${encodeURIComponent(query)}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  const result = await response.json()
  return result
}

// Format search results into structured data
function formatSearchResults(results: any) {
  return results.map(result => ({
    file_id: result.file_id,
    file_name: result.file_name,
    content: result.content.map(c => c.text),
    score: result.score
  }))
}

// Extract most relevant sections based on the search phrase
function extractRelevantSections(results: any, searchPhrase: any) {
  const relevantSections = []

  for (const result of results) {
    const fileName = result.file_name

    for (const contentPiece of result.content) {
      // Simple relevance scoring - can be enhanced with more sophisticated methods
      const text = contentPiece.text

      // Add source information
      relevantSections.push({
        source: fileName,
        content: text,
        file_id: result.file_id,
        score: result.score
      })
    }
  }

  return relevantSections
}

export const semantic_search = async ({
  searchPhrase,
  exactPhrase = '',
  primaryKeywords = [],
  secondaryKeywords = []
}: any) => {
  try {
    console.log('Performing semantic search for:', searchPhrase)

    // Combine search phrases for better context
    const enhancedSearchPhrase = [searchPhrase, exactPhrase, ...primaryKeywords]
      .filter(Boolean)
      .join(' ')

    // Perform the vector search
    const results = await openai.vectorStores.search(
      VECTOR_STORE_ID, // First argument: vectorStoreId
      {
        query: enhancedSearchPhrase, // Second argument: body
        max_num_results: 5
      }
    )

    // Format the results
    const formattedResults = formatSearchResults(results.data)

    // Extract all text content for context
    const textSources = results.data
      .map(result => result.content.map(c => c.text).join('\n'))
      .join('\n\n')

    return {
      results: formattedResults,
      textSources,
      count: results.data.length,
      relevantContent: extractRelevantSections(results.data, searchPhrase)
    }
  } catch (error) {
    console.log('Error in semantic search:', error)
    return {
      error: 'Error performing semantic search',
      results: [],
      textSources: '',
      count: 0,
      relevantContent: []
    }
  }
}

// Export all functions as a map
export const functionsMap = {
  get_subjects,
  get_chapters,
  get_topic_details,
  get_timeline,
  generate_quiz,
  check_answer,
  search_concepts,
  semantic_search
}
