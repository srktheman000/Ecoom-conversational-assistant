// app/signup/page.tsx
import { Metadata } from 'next'
import AuthLayout from '../../components/auth/AuthLayout'
import SignupForm from '../../components/auth/SignupForm'

export const metadata: Metadata = {
  title: 'Sign Up | RevisionLLM',
  description: 'Create your RevisionLLM account'
}

export default function SignupPage() {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  )
}
