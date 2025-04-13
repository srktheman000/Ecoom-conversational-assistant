// List of tools available to the educational assistant
// No need to include the top-level wrapper object as it is added in lib/tools/tools.ts

export const toolsList = [
  {
    name: 'get_subjects',
    description: 'Fetch the list of available subjects for study',
    parameters: {}
  },
  {
    name: 'get_chapters',
    description: 'Fetch the list of chapters for a specific subject',
    parameters: {
      subjectId: {
        type: 'string',
        description: 'ID of the subject to fetch chapters for'
      }
    }
  },
  {
    name: 'get_topic_details',
    description: 'Fetch detailed information about a specific topic',
    parameters: {
      topicId: {
        type: 'string',
        description: 'ID of the topic to fetch details for'
      }
    }
  },
  {
    name: 'get_timeline',
    description: 'Generate a historical timeline for a specific topic',
    parameters: {
      topicId: {
        type: 'string',
        description: 'ID of the topic to generate timeline for'
      },
      timeframeStart: {
        type: 'string',
        description: 'Starting year/period for the timeline (optional)'
      },
      timeframeEnd: {
        type: 'string',
        description: 'Ending year/period for the timeline (optional)'
      }
    }
  },
  {
    name: 'generate_quiz',
    description: 'Generate a quiz for a specific topic or chapter',
    parameters: {
      topicId: {
        type: 'string',
        description: 'ID of the topic to generate quiz for'
      },
      difficulty: {
        type: 'string',
        enum: ['easy', 'medium', 'hard'],
        description: 'Difficulty level of the quiz'
      },
      questionCount: {
        type: 'integer',
        description: 'Number of questions to generate'
      }
    }
  },
  {
    name: 'check_answer',
    description: 'Check if a student answer is correct',
    parameters: {
      questionId: {
        type: 'string',
        description: 'ID of the question being answered'
      },
      studentAnswer: {
        type: 'string',
        description: 'Answer provided by the student'
      }
    }
  },
  {
    name: 'search_concepts',
    description: 'Search for specific concepts across subjects',
    parameters: {
      query: {
        type: 'string',
        description: 'Search query for finding concepts'
      }
    }
  }
  // {
  //   name: 'semantic_search',
  //   description:
  //     'Search through educational documents using semantic search to find relevant information',
  //   parameters: {
  //     searchPhrase: {
  //       type: 'string',
  //       description: 'The search phrase to find information in documents'
  //     },
  //     exactPhrase: {
  //       type: 'string',
  //       description: 'The exact phrase to match in documents (optional)'
  //     },
  //     primaryKeywords: {
  //       type: 'array',
  //       items: {
  //         type: 'string'
  //       },
  //       description: 'Primary keywords to improve search relevance'
  //     },
  //     secondaryKeywords: {
  //       type: 'array',
  //       items: {
  //         type: 'string'
  //       },
  //       description: 'Secondary keywords to improve search relevance'
  //     }
  //   }
  // }
]
