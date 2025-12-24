import React from 'react'
import './AuthLayout.css'

function AuthLayout({ title, subtitle, children, bottomText }) {
  return (
    <div className="auth-page-root">
      <div className="auth-card">
        <div className="auth-logo-wrapper">
          <div className="auth-logo-icon">
            <div className="auth-logo-check" />
          </div>
        </div>
        <div className="auth-app-name">TodoPro</div>
        <div className="auth-title">{title}</div>
        {subtitle && <div className="auth-subtitle">{subtitle}</div>}

        {children}

        {bottomText && <div className="auth-footer-text">{bottomText}</div>}
      </div>
    </div>
  )
}

export default AuthLayout

