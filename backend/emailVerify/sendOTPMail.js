import nodemailer from 'nodemailer'
import 'dotenv/config'

export const sendOTPMail = async(otp, email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    const mailConfigurations = {
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Ekart - Password Reset OTP',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Password Reset Request</h2>
                <p>We received a request to reset your Ekart account password.</p>
                <p>Use this One-Time Password (OTP) to reset your password:</p>
                <h1 style="color: #F47286; letter-spacing: 2px; font-size: 32px; margin: 20px 0;">${otp}</h1>
                <p>This OTP is valid for 10 minutes only.</p>
                <p>If you didn't request this, please ignore this email.</p>
                <p>Thanks,<br>Ekart Team</p>
            </div>
        `
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailConfigurations, function (error, info) {
            if (error) {
                console.error('❌ OTP Email sending failed:', error.message)
                reject(error);
            } else {
                console.log('✅ OTP Email Sent Successfully to:', email);
                resolve(info);
            }
        });
    });
}