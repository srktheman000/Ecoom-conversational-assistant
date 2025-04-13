// components/auth/AuthLayout.tsx
'use client'

import React from 'react'

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      {children}
    </div>
  )
}

export default AuthLayout
