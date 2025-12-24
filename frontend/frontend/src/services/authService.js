import apiClient from './apiClient'

export async function login(credentials) {
  // Backend: POST /api/auth/login
  return apiClient.post('/auth/login', credentials)
}

export async function register(payload) {
  // Backend: POST /api/auth/register
  return apiClient.post('/auth/register', payload)
}

export async function logout(token) {
  // Backend: POST /api/auth/logout with Bearer token in header
  return fetch('http://localhost:8080/api/auth/logout', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(async (response) => {
    const text = await response.text()
    if (!response.ok) {
      const error = new Error('Logout failed')
      error.response = { status: response.status, data: text }
      throw error
    }
    return text
  })
}


