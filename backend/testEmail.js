// Email testing script - run on backend to verify email configuration
// Usage: node testEmail.js

import dotenv from 'dotenv'
import { sendOTPMail } from './emailVerify/sendOTPMail.js'
import { verifyEmail } from './emailVerify/verifyEmail.js'

dotenv.config()

console.log('🔍 Testing Email Configuration...\n')

// Check environment variables
console.log('Checking Environment Variables:')
console.log('MAIL_USER:', process.env.MAIL_USER ? '✅ Set' : '❌ Not set')
console.log('MAIL_PASS:', process.env.MAIL_PASS ? '✅ Set' : '❌ Not set')
console.log('FRONTEND_URL:', process.env.FRONTEND_URL ? `✅ ${process.env.FRONTEND_URL}` : '❌ Not set (using default)')
console.log('')

// Test OTP email
async function testOTP() {
    try {
        console.log('📧 Testing OTP Email...')
        const testEmail = process.env.MAIL_USER // Send to yourself for testing
        const testOTP = '123456'
        
        await sendOTPMail(testOTP, testEmail)
        console.log('✅ OTP Email sent successfully to:', testEmail)
    } catch (error) {
        console.error('❌ OTP Email failed:', error.message)
    }
}

// Test verification email
function testVerification() {
    try {
        console.log('📧 Testing Verification Email...')
        const testEmail = process.env.MAIL_USER // Send to yourself for testing
        const testToken = 'test-token-12345'
        
        verifyEmail(testToken, testEmail)
        console.log('✅ Verification Email sent successfully to:', testEmail)
    } catch (error) {
        console.error('❌ Verification Email failed:', error.message)
    }
}

console.log('Starting email tests...\n')
testOTP()
setTimeout(() => testVerification(), 2000)

setTimeout(() => {
    console.log('\n✅ Email test complete. Check your inbox!')
    process.exit(0)
}, 5000)
