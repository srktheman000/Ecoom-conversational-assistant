// Placeholder demo data - used in the API routes

import {
  Subject,
  Chapter,
  Topic,
  Timeline,
  TimelineEvent,
  Question,
  Quiz,
  Concept
} from './types'

export const subjects: Subject[] = [
  {
    id: 'hist-101',
    name: 'History',
    description:
      'Explore the past and understand how it shapes our present and future.',
    gradeLevel: ['6', '7', '8', '9', '10'],
    image: 'history.webp'
  },
  {
    id: 'sci-101',
    name: 'Science',
    description:
      'Discover the natural world through scientific inquiry and experimentation.',
    gradeLevel: ['6', '7', '8', '9', '10'],
    image: 'science.webp'
  },
  {
    id: 'geog-101',
    name: 'Geography',
    description:
      "Learn about Earth's landscapes, environments, and the relationship between people and their surroundings.",
    gradeLevel: ['6', '7', '8', '9', '10'],
    image: 'geography.webp'
  },
  {
    id: 'eng-101',
    name: 'English',
    description:
      'Develop language skills through reading, writing, speaking, and listening.',
    gradeLevel: ['6', '7', '8', '9', '10'],
    image: 'english.webp'
  }
]

export const chapters: Chapter[] = [
  {
    id: 'hist-ch1',
    subjectId: 'hist-101',
    title: 'Ancient Civilizations',
    description:
      'Study the rise and fall of early human civilizations and their lasting impact.',
    order: 1
  },
  {
    id: 'hist-ch2',
    subjectId: 'hist-101',
    title: 'Medieval Period',
    description:
      'Explore the Middle Ages, feudalism, and the development of nations.',
    order: 2
  },
  {
    id: 'sci-ch1',
    subjectId: 'sci-101',
    title: 'Matter and Energy',
    description:
      'Learn about the fundamental properties of matter and energy transformations.',
    order: 1
  },
  {
    id: 'sci-ch2',
    subjectId: 'sci-101',
    title: 'Living Organisms',
    description:
      'Study the characteristics, structure, and functions of living organisms.',
    order: 2
  }
]

export const topics: Topic[] = [
  {
    id: 'topic-101',
    chapterId: 'hist-ch1',
    title: 'Mesopotamian Civilization',
    summary:
      'Mesopotamia, often referred to as the "Cradle of Civilization," was located in the fertile region between the Tigris and Euphrates rivers in present-day Iraq. This ancient civilization emerged around 4000 BCE and developed the first cities, writing system (cuneiform), legal codes, and complex social structures.',
    keyPoints: [
      "Developed the world's first writing system called cuneiform",
      'Created the Code of Hammurabi, one of the earliest legal codes',
      'Built advanced irrigation systems to control flooding',
      'Established city-states like Ur, Uruk, and Babylon'
    ],
    difficulty: 'intermediate'
  },
  {
    id: 'topic-102',
    chapterId: 'hist-ch1',
    title: 'Ancient Egypt',
    summary:
      'Ancient Egypt was a civilization that thrived along the Nile River from around 3100 BCE to 30 BCE. Famous for its monumental architecture, intricate religious beliefs, and advanced knowledge in mathematics, medicine, and astronomy, Egypt was one of the most powerful and influential civilizations of the ancient world.',
    keyPoints: [
      'Developed a complex religious system centered around many gods',
      'Built pyramids as tombs for pharaohs, believed to be divine rulers',
      'Created a hieroglyphic writing system',
      'Pioneered techniques in agriculture, medicine, and mathematics'
    ],
    difficulty: 'beginner'
  },
  {
    id: 'topic-201',
    chapterId: 'sci-ch1',
    title: 'States of Matter',
    summary:
      'Matter can exist in different states: solid, liquid, gas, and plasma. Each state has unique properties regarding shape, volume, and particle arrangement. Changes between these states occur through processes like melting, freezing, evaporation, condensation, and sublimation.',
    keyPoints: [
      'Solids have definite shape and volume with tightly packed particles',
      'Liquids have definite volume but take the shape of their container',
      'Gases have neither definite shape nor volume and fill their container',
      'Plasma is an ionized state of matter found in stars and lightning'
    ],
    difficulty: 'beginner'
  }
]

export const timelines: Timeline[] = [
  {
    id: 'timeline-101',
    topicId: 'topic-101',
    title: 'Rise and Fall of Mesopotamian Civilizations',
    events: [
      {
        id: 'event-101',
        date: 'c. 4000 BCE',
        title: 'Rise of Sumerian Civilization',
        description:
          "The world's first urban civilization emerged in southern Mesopotamia.",
        importance: 'high'
      },
      {
        id: 'event-102',
        date: 'c. 3500 BCE',
        title: 'Invention of Cuneiform',
        description: 'The earliest writing system was developed in Sumer.',
        importance: 'high'
      },
      {
        id: 'event-103',
        date: 'c. 2334-2279 BCE',
        title: 'Akkadian Empire',
        description: 'Sargon of Akkad established the world first empire.',
        importance: 'medium'
      },
      {
        id: 'event-104',
        date: 'c. 1792-1750 BCE',
        title: 'Hammurabi Rule',
        description: 'Hammurabi created one of the first written legal codes.',
        importance: 'high'
      },
      {
        id: 'event-105',
        date: '539 BCE',
        title: 'Fall of Babylon',
        description:
          'The Neo-Babylonian Empire fell to Cyrus the Great of Persia.',
        importance: 'medium'
      }
    ]
  }
]

export const questions: Question[] = [
  {
    id: 'q-101',
    topicId: 'topic-101',
    question:
      'What was the name of the writing system developed in ancient Mesopotamia?',
    type: 'multiple_choice',
    options: ['Hieroglyphics', 'Cuneiform', 'Sanskrit', 'Runes'],
    correctAnswer: 'Cuneiform',
    explanation:
      'Cuneiform was developed by the Sumerians around 3500 BCE and is considered the earliest form of writing. The name comes from the Latin word "cuneus" meaning wedge, referring to the wedge-shaped marks made by pressing a reed stylus into clay tablets.',
    difficulty: 'easy'
  },
  {
    id: 'q-102',
    topicId: 'topic-101',
    question:
      'The Code of Hammurabi is one of the earliest examples of written law.',
    type: 'true_false',
    correctAnswer: 'true',
    explanation:
      'The Code of Hammurabi, created around 1754 BCE, is one of the oldest deciphered writings of significant length in the world. It consists of 282 laws with punishments, often based on the principle of "an eye for an eye."',
    difficulty: 'easy'
  },
  {
    id: 'q-103',
    topicId: 'topic-201',
    question: 'Explain the difference between evaporation and boiling.',
    type: 'short_answer',
    correctAnswer:
      'Evaporation occurs at the surface of a liquid at any temperature, while boiling occurs throughout the liquid at a specific temperature (boiling point).',
    explanation:
      'Evaporation is a surface phenomenon that can occur at any temperature, with molecules that have enough kinetic energy escaping from the liquid surface. Boiling happens when the vapor pressure equals the atmospheric pressure at a specific temperature, causing bubbles to form throughout the liquid.',
    difficulty: 'medium'
  }
]

export const quizzes: Quiz[] = [
  {
    id: 'quiz-101',
    topicId: 'topic-101',
    title: 'Mesopotamian Civilization Quiz',
    difficulty: 'medium',
    questions: [
      {
        id: 'q-101',
        topicId: 'topic-101',
        question:
          'What was the name of the writing system developed in ancient Mesopotamia?',
        type: 'multiple_choice',
        options: ['Hieroglyphics', 'Cuneiform', 'Sanskrit', 'Runes'],
        correctAnswer: 'Cuneiform',
        explanation:
          'Cuneiform was developed by the Sumerians around 3500 BCE and is considered the earliest form of writing.',
        difficulty: 'easy'
      },
      {
        id: 'q-102',
        topicId: 'topic-101',
        question:
          'The Code of Hammurabi is one of the earliest examples of written law.',
        type: 'true_false',
        correctAnswer: 'true',
        explanation:
          'The Code of Hammurabi, created around 1754 BCE, is one of the oldest deciphered writings of significant length in the world.',
        difficulty: 'easy'
      },
      {
        id: 'q-104',
        topicId: 'topic-101',
        question: 'Which river valley was NOT part of Mesopotamia?',
        type: 'multiple_choice',
        options: ['Tigris', 'Euphrates', 'Nile', 'Karun'],
        correctAnswer: 'Nile',
        explanation:
          'The Nile River is associated with ancient Egyptian civilization, not Mesopotamia. Mesopotamia was primarily located between the Tigris and Euphrates rivers.',
        difficulty: 'medium'
      }
    ]
  }
]

export const concepts: Concept[] = [
  {
    id: 'concept-101',
    name: 'City-State',
    definition:
      'A city-state is an independent sovereign state that consists of a city and its surrounding territory. In ancient Mesopotamia, prominent city-states included Ur, Uruk, Babylon, and Nineveh.',
    topicIds: ['topic-101'],
    relatedConcepts: ['civilization', 'government', 'urban development']
  },
  {
    id: 'concept-201',
    name: 'Phase Transition',
    definition:
      'A phase transition is the transformation of matter from one state to another due to changes in temperature, pressure, or other physical conditions. Common phase transitions include melting, freezing, vaporization, and condensation.',
    topicIds: ['topic-201'],
    relatedConcepts: ['states of matter', 'thermal energy', 'molecular motion']
  }
]
