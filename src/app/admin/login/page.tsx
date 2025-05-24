"use client"

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { signIn } from '@/lib/auth'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await signIn(email, password)
      
      // Redirect to admin dashboard
      router.push('/admin/dashboard')
    } catch (error: any) {
      console.error('Login error:', error)
      setError(error.message || 'Failed to login. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-premium shadow-premium p-8 border border-stone-200">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 relative mb-4">
              <Image 
                src="/logo.png" 
                alt="VIP Marrakech Trips" 
                fill 
                className="object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-stone-900">Admin Login</h1>
            <p className="text-stone-600 text-center mt-2">
              Enter your credentials to access the admin dashboard
            </p>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-stone-800 font-medium mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 focus:border-highlight-primary outline-none transition-colors"
                placeholder="admin@example.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-stone-800 font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 focus:border-highlight-primary outline-none transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full bg-highlight-primary text-white font-medium flex items-center justify-center gap-2 hover:bg-highlight-primary/90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Logging in...</span>
                </>
              ) : (
                <span>Login</span>
              )}
            </button>
          </form>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-stone-600 text-sm">
            This area is restricted to authorized personnel only.
          </p>
        </div>
      </div>
    </div>
  )
} 