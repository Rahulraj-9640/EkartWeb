import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const VerifyEmail = () => {
    const {token} = useParams()
    const [status, setStatus] = useState("Verifying your email...")
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    const verifyEmail = async() => {
        try {
            if (!token) {
                throw new Error('No verification token provided')
            }
            
            const backendURL = import.meta.env.VITE_URL || 'http://localhost:8000'
            const res = await axios.post(`${backendURL}/api/v1/user/verify`,{},{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            
            if(res.data.success){
                setStatus("✅ Email Verified Successfully! Redirecting to login...")
                setIsLoading(false)
                setTimeout(() => {
                    navigate('/login')
                }, 2000);
            } else {
                setStatus(`❌ ${res.data.message || 'Verification failed'}`)
                setIsLoading(false)
            }
        } catch (error) {
            console.error('Verification error:', error.response?.data?.message || error.message)
            setStatus(`❌ ${error.response?.data?.message || 'Verification failed. Please try again.'}`)
            setIsLoading(false)
        }
    }
    
    useEffect(() => {
        verifyEmail()
    }, [token])
    return (
        <div className='relative w-full h-[760px] bg-pink-100 overflow-hidden'>
            <div className='min-h-screen flex items-center justify-center'>
                <div className='bg-white p-6 rounded-2xl shadow-md text-center w-[90%] max-w-md'>
                    <h2 className='text-2xl font-semibold text-gray-800'>{status}</h2>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail