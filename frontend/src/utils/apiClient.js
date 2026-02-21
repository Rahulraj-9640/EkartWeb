import axios from 'axios'

// Get backend URL from environment variable or use default
const BACKEND_URL = import.meta.env.VITE_URL || 'http://localhost:8000'

console.log('Backend URL:', BACKEND_URL)

// Create axios instance with base URL
const apiClient = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Add token to requests if it exists
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

export default apiClient
