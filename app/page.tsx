'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const HomePage = () => {
  const [grade, setGrade] = useState('6')
  const [subjects, setSubjects] = useState([])
  const router = useRouter()

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await fetch(`/api/subjects?grade=${grade}`)
        if (!res.ok) throw new Error('Failed to fetch subjects')
        const data = await res.json()
        setSubjects(data.subjects || [])
      } catch (error) {
        console.error('Error fetching subjects:', error)
      }
    }

    fetchSubjects()
  }, [grade])

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Select Your Subject</h1>

      <div className="mb-4">
        <label htmlFor="grade" className="mr-2 font-medium">
          Grade:
        </label>
        <select
          id="grade"
          value={grade}
          onChange={e => setGrade(e.target.value)}
          className="p-2 border rounded"
        >
          {[6, 7, 8, 9, 10].map(g => (
            <option key={g} value={g}>{`${g}th Grade`}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map(subject => (
          <div
            key={subject.id}
            className="p-4 border rounded shadow hover:shadow-lg cursor-pointer transition"
            onClick={() => router.push(`/chat/${subject.id}`)}
          >
            <h2 className="text-xl font-bold mb-2">{subject.title}</h2>
            <p className="text-sm text-gray-600">{subject.description}</p>
            <p className="text-sm text-gray-500">
              Chapters: {subject.chapterCount}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage
