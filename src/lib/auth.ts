import { auth } from './firebase'
import { 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth'
import { setCookie, deleteCookie, getCookie } from 'cookies-next'

// List of admin emails that are allowed to access the dashboard
export const ADMIN_EMAILS = [
  'medelberkaoui2001@gmail.com'
  
  // Add more admin emails here
]

export const signIn = async (email: string, password: string) => {
  try {
    // Temporary hardcoded admin login for testing
    if (email === 'admin@test.com' && password === 'admin123') {
      // Mock successful authentication
      setCookie('session', 'mock-admin-token', {
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      })
      return { email: 'admin@test.com' } as any
    }
    
    if (!auth) {
      throw new Error('Firebase auth is not initialized')
    }
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    
    if (!ADMIN_EMAILS.includes(user.email || '')) {
      await firebaseSignOut(auth)
      throw new Error('Unauthorized access. Only administrators can log in.')
    }
    
    // Set session cookie
    const token = await user.getIdToken()
    setCookie('session', token, {
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    })
    
    return user
  } catch (error: any) {
    console.error('Login error:', error)
    throw error
  }
}

export const signOut = async () => {
  try {
    if (!auth) {
      throw new Error('Firebase auth is not initialized')
    }
    
    await firebaseSignOut(auth)
    deleteCookie('session')
  } catch (error) {
    console.error('Sign out error:', error)
    throw error
  }
}

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    if (!auth) {
      console.error('Firebase auth is not initialized')
      resolve(null)
      return
    }
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      resolve(user)
    })
  })
}

export const isUserAdmin = (user: User | null): boolean => {
  if (!user) return false
  return ADMIN_EMAILS.includes(user.email || '')
}

export const getSessionToken = (): string | undefined => {
  return getCookie('session')?.toString()
}

export const isAuthenticated = async (): Promise<boolean> => {
  const user = await getCurrentUser()
  return user !== null && isUserAdmin(user)
} 