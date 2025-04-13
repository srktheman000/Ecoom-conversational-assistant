// Define custom components to replace the default function call UI
// These will be displayed in the chat when a tool call is triggered

import React from 'react'
import { CheckCircle, BookOpen, Clock, Award } from 'lucide-react'

const QuizSubmitted: React.FC = () => {
  return (
    <div className="flex items-center rounded-md border border-green-500 bg-green-50 p-2.5">
      <CheckCircle className="mr-2 text-green-600" />
      <div>Answer submitted successfully!</div>
    </div>
  )
}

const TopicSelected: React.FC = () => {
  return (
    <div className="flex items-center rounded-md border border-blue-500 bg-blue-50 p-2.5">
      <BookOpen className="mr-2 text-blue-600" />
      <div>Topic selected. Fetching learning materials...</div>
    </div>
  )
}

const TimelineGenerated: React.FC = () => {
  return (
    <div className="flex items-center rounded-md border border-purple-500 bg-purple-50 p-2.5">
      <Clock className="mr-2 text-purple-600" />
      <div>Historical timeline generated!</div>
    </div>
  )
}

const QuizGenerated: React.FC = () => {
  return (
    <div className="flex items-center rounded-md border border-amber-500 bg-amber-50 p-2.5">
      <Award className="mr-2 text-amber-600" />
      <div>Quiz generated! Test your knowledge.</div>
    </div>
  )
}

export const toolDisplayMap = {
  check_answer: QuizSubmitted,
  select_topic: TopicSelected,
  get_timeline: TimelineGenerated,
  generate_quiz: QuizGenerated
  // add more components as you define them
}
