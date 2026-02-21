import axios from 'axios'

// Test API connectivity
const testAPI = async () => {
    const backendURL = import.meta.env.VITE_URL || 'http://localhost:8000'
    
    console.log('🔍 Testing Backend Connectivity...')
    console.log('Backend URL:', backendURL)
    
    try {
        // Test 1: Check if backend is alive
        console.log('\n📍 Test 1: Checking backend server...')
        const healthCheck = await axios.get(`${backendURL}/api/v1/product/getallproducts`, {
            timeout: 5000
        })
        console.log('✅ Backend is responding!')
        console.log('Response:', healthCheck.data)
        
    } catch (error) {
        console.error('❌ Backend Connection Error:', {
            status: error.response?.status,
            message: error.message,
            details: error.response?.data
        })
    }
}

export default testAPI
