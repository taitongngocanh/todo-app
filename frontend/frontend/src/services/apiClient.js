const API_BASE_URL = 'http://localhost:8080/api'

async function request(path, options = {}) {
  const url = `${API_BASE_URL}${path}`

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  const contentType = response.headers.get('content-type') || ''
  const isJson = contentType.includes('application/json')
  const data = isJson ? await response.json() : await response.text()

  if (!response.ok) {
    const error = new Error('Request failed')
    error.response = {
      status: response.status,
      data,
    }
    throw error
  }

  return data
}

export default {
  get: (path) =>
    request(path, {
      method: 'GET',
    }),
  post: (path, body) =>
    request(path, {
      method: 'POST',
      body: JSON.stringify(body),
    }),
}


