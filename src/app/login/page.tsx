"use client"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import styles from './page.module.css'
import Button from "@components/Atoms/Button/Button"
import FormInput from "@components/Atoms/FormInput/FormInput"
import PageContainer from "@components/Templates/PageContainer/PageContainer"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false
    })

    if (result?.error) {
      setError('Invalid email or password')
      setLoading(false)
    } else {
      router.push('/generate')
    }
  }

  return (
    <PageContainer>
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        
        {error && <p className={styles.error}>{error}</p>}

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
          loadingText="Logging in..."
        >
          Log In
        </Button>
        <p className={styles.footer}>
          Don't have an account? <Link href="/register" className={styles.link}>Register</Link>
        </p>
      </form>
    </PageContainer>
  )
}