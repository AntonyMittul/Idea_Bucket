"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { UserPlus, Loader2 } from "lucide-react"
import { signIn } from "next-auth/react"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || "Registration failed")
        setLoading(false)
        return
      }

      // Automatically sign in the user after successful registration
      const signInRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (signInRes?.error) {
        setError("Login failed after registration. Please log in manually.")
        setLoading(false)
      } else {
        router.push("/")
        router.refresh()
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel auth-card"
      >
        <div className="auth-icon">
          <UserPlus size={32} />
        </div>
        <h1 className="auth-title">Create an Account</h1>
        <p className="auth-subtitle">
          Sign up to start organizing your ideas.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}
          
          <div className="input-group">
            <label className="input-label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              className="input-field"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="input-field"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              className="input-field"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '24px', padding: '14px' }}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Sign Up"}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{" "}
          <Link href="/login" className="auth-link">
            Log in here
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
