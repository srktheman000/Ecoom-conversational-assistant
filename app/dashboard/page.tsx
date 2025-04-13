// app/dashboard/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchSubjects = async () => {
      if (!user) return

      try {
        const response = await fetch(`/api/subjects?grade=${user.grade}`)

        if (!response.ok) {
          throw new Error('Failed to fetch subjects')
        }

        const data = await response.json()
        setSubjects(data.subjects)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchSubjects()
  }, [user])

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">RevisionLLM</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">
              Hello, {user?.name || 'Student'}
            </span>
            <button
              onClick={() => logout()}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-semibold mb-6">
            Welcome, {user?.name || 'Student'}
          </h2>
          <p className="mb-6 text-gray-300">Grade {user?.grade} Subjects</p>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-500 text-white p-4 rounded-md">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((subject: any) => (
                <div
                  key={subject._id}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {subject.title}
                    </h3>
                    <div className="mb-4">
                      <span className="inline-block bg-blue-600 rounded-full px-3 py-1 text-sm font-semibold mr-2">
                        Grade {subject.grade}
                      </span>
                      <span className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold">
                        {subject.chapterCount} Chapters
                      </span>
                    </div>
                    <p className="text-gray-300 mb-4">{subject.description}</p>
                    <button
                      onClick={() =>
                        router.push(`/chat?subject=${subject._id}`)
                      }
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Start Learning
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
