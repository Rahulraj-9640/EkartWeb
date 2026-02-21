import nodemailer from 'nodemailer'
import 'dotenv/config'

export const verifyEmail = async (token, email) => {
    return new Promise((resolve, reject) => {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS
                },
                // Add timeout and connection settings
                connectionTimeout: 10000,
                socketTimeout: 10000
            });

            // Frontend URL from environment or default
            const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173'

            const mailConfigurations = {
                from: process.env.MAIL_USER,
                to: email,
                subject: 'Email Verification - Ekart',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2>Email Verification</h2>
                        <p>Hi! Please verify your email address to activate your Ekart account.</p>
                        <p>Click the button below to verify:</p>
                        <a href="${frontendURL}/verify/${token}" 
                           style="display: inline-block; padding: 10px 20px; background-color: #F47286; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
                            Verify Email
                        </a>
                        <p>Or copy this link: ${frontendURL}/verify/${token}</p>
                        <p>This link will expire in 10 minutes.</p>
                        <p>Thanks,<br>Ekart Team</p>
                    </div>
                `,
                replyTo: process.env.MAIL_USER
            };

            // Send email with timeout
            const sendPromise = transporter.sendMail(mailConfigurations)
            
            // Set a 30-second timeout for the email sending
            const timeoutPromise = new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Email sending timeout')), 30000)
            )

            Promise.race([sendPromise, timeoutPromise])
                .then(() => {
                    console.log('✅ Verification Email Sent Successfully to:', email)
                    resolve()
                })
                .catch((error) => {
                    console.error('❌ Email sending failed:', error.message)
                    reject(error)
                })

        } catch (error) {
            console.error('❌ Email configuration error:', error.message)
            reject(error)
        }
    })
}
