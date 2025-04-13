// types/index.ts
export interface User {
  id: string
  name: string
  email: string
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface SignupCredentials {
  name: string
  email: string
  password: string
}
