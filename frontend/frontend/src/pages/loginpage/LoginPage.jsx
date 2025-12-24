import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/AuthLayout'
import TextInput from '../../components/TextInput'
import { login } from '../../services/authService'
import './LoginPage.css'

function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setFormError('')

    if (!form.email || !form.password) {
      setFormError('Please enter both email and password.')
      return
    }

    try {
      setSubmitting(true)
      const response = await login({
        email: form.email,
        password: form.password,
      })

      if (response?.token) {
        localStorage.setItem('authToken', response.token)
      }
      if (response?.email) {
        localStorage.setItem('authEmail', response.email)
      }
      if (response?.fullName) {
        localStorage.setItem('authFullName', response.fullName)
      }

      navigate('/home')
    } catch (error) {
      setFormError(
        error?.response?.data?.message || 'Unable to sign in. Please try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account to continue"
      bottomText={
        <>
          Don&apos;t have an account?
          <Link to="/register" className="auth-footer-link">
            Sign up
          </Link>
        </>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <TextInput
          label="Email address"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          autoComplete="email"
        />

        <div>
          <TextInput
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            autoComplete="current-password"
          />
          <div className="auth-row">
            <label className="auth-remember">
              <input
                type="checkbox"
                name="rememberMe"
                checked={form.rememberMe}
                onChange={handleChange}
                className="auth-checkbox"
              />
              <span>Remember me</span>
            </label>

            <button
              type="button"
              className="auth-link"
              style={{
                border: 'none',
                padding: 0,
                background: 'transparent',
                cursor: 'pointer',
              }}
            >
              Forgot password?
            </button>
          </div>
        </div>

        {formError && <div className="auth-error-text">{formError}</div>}

        <button
          type="submit"
          className="auth-primary-button"
          disabled={submitting}
        >
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </AuthLayout>
  )
}

export default LoginPage


