import React from 'react'

function TextInput({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  autoComplete,
  error,
}) {
  return (
    <div>
      {label && <label className="auth-field-label">{label}</label>}
      <div className="auth-input-wrapper">
        <span className="auth-input-icon" aria-hidden="true" />
        <input
          className={`auth-input ${error ? 'auth-input-error' : ''}`}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
      </div>
      {error && <div className="auth-error-text">{error}</div>}
    </div>
  )
}

export default TextInput


