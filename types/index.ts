// types/index.ts
export interface User {
  id: string
  email: string
  grade: number
  name?: string
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface SignupCredentials {
  email: string
  password: string
  grade: number
}
