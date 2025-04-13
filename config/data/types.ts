// Educational types.ts

export interface Subject {
  id: string
  name: string
  description: string
  gradeLevel: string[]
  image: string
}

export interface Chapter {
  id: string
  subjectId: string
  title: string
  description: string
  order: number
}

export interface Topic {
  id: string
  chapterId: string
  title: string
  summary: string
  keyPoints: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export interface TimelineEvent {
  id: string
  date: string
  title: string
  description: string
  importance: 'low' | 'medium' | 'high'
}

export interface Timeline {
  id: string
  topicId: string
  title: string
  events: TimelineEvent[]
}

export interface Question {
  id: string
  topicId: string
  question: string
  type: 'multiple_choice' | 'true_false' | 'short_answer'
  options?: string[]
  correctAnswer: string
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface Quiz {
  id: string
  topicId: string
  title: string
  difficulty: 'easy' | 'medium' | 'hard'
  questions: Question[]
}

export interface Concept {
  id: string
  name: string
  definition: string
  topicIds: string[]
  relatedConcepts: string[]
}
