// app/login/page.tsx
import { Metadata } from 'next'
import AuthLayout from '../../components/auth/AuthLayout'
import LoginForm from '../../components/auth/LoginForm'

export const metadata: Metadata = {
  title: 'Login | RevisionLLM',
  description: 'Sign in to your RevisionLLM account'
}

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  )
}
