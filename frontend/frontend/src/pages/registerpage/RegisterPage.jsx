import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/AuthLayout'
import TextInput from '../../components/TextInput'
import { register } from '../../services/authService'
import './RegisterPage.css'

function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

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

    if (!form.name || !form.email || !form.password || !form.confirmPassword || !form.dob) {
      setFormError('Please fill in all fields.')
      return
    }

    if (form.password !== form.confirmPassword) {
      setFormError('Passwords do not match.')
      return
    }

    try {
      setSubmitting(true)
      setFormError('')
      const response = await register({
        fullName: form.name,
        email: form.email,
        password: form.password,
        dob: form.dob,
      })
      
      // Show success message
      setSuccessMessage(
        response?.message || 'Account created successfully! Redirecting to login...'
      )
      
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (error) {
      setSuccessMessage('')
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
          label="Date of Birth"
          name="dob"
          type="date"
          value={form.dob}
          onChange={handleChange}
          autoComplete="bday"
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

        {successMessage && (
          <div className="auth-success-text">{successMessage}</div>
        )}
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


