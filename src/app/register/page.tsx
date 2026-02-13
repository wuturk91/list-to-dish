"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Button from "@components/Atoms/Button/Button"
import FormInput from "@components/Atoms/FormInput/FormInput"
import styles from './page.module.css'

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || 'Registration failed')
    } else {
      router.push('/login')
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Register</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        
        {error && <p className={styles.error}>{error}</p>}

        <FormInput
          label="Name"
          name="name"
          type="text"
          required
          disabled={loading}
          onChangeAction={setName}
        />
        <FormInput
          label="Email"
          name="email"
          type="email"
          required
          disabled={loading}
          onChangeAction={setEmail}
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          required
          disabled={loading}
          onChangeAction={setPassword}
        />
        <Button
          variant="primary"
          type="submit"
          disabled={loading}
          loading={loading}
          loadingText="Registering..."
        >
          Register
        </Button>
        <p className={styles.footer}>
          Already have an account? <Link href="/login" className={styles.link}>Login</Link>
        </p>
      </form>
    </div>
  )
}