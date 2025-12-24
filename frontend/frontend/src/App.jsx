import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/loginpage/LoginPage'
import RegisterPage from './pages/registerpage/RegisterPage'
import HomePage from './pages/homepage/HomePage'
import RequireAuth from './routes/RequireAuth'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<RequireAuth />}>
        <Route path="/home" element={<HomePage />} />
      </Route>
    </Routes>
  )
}

export default App




