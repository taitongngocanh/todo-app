import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../../components/AuthLayout'
import TextInput from '../../components/TextInput'
import { register } from '../../services/authService'
import './RegisterPage.css'

function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setFormError('')

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setFormError('Please fill in all fields.')
      return
    }

    if (form.password !== form.confirmPassword) {
      setFormError('Passwords do not match.')
      return
    }

    try {
      setSubmitting(true)
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
      })
      // TODO: After successful register, you might redirect to login or auto-login.
    } catch (error) {
      setFormError(
        error?.response?.data?.message ||
          'Unable to create account. Please try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Sign up to start organizing your tasks"
      bottomText={
        <>
          Already have an account?
          <Link to="/login" className="auth-footer-link">
            Sign in
          </Link>
        </>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <TextInput
          label="Full name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Jane Doe"
          autoComplete="name"
        />

        <TextInput
          label="Email address"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          autoComplete="email"
        />

        <TextInput
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Create a password"
          autoComplete="new-password"
        />

        <TextInput
          label="Confirm password"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Re-enter your password"
          autoComplete="new-password"
        />

        {formError && <div className="auth-error-text">{formError}</div>}

        <button
          type="submit"
          className="auth-primary-button"
          disabled={submitting}
        >
          {submitting ? 'Creating account…' : 'Sign up'}
        </button>
      </form>
    </AuthLayout>
  )
}

export default RegisterPage


