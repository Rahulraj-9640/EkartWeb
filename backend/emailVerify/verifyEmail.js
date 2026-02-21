import nodemailer from 'nodemailer'
import 'dotenv/config'

export const verifyEmail = (token, email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    // Frontend URL from environment or default
    const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173'

    const mailConfigurations = {
        from: process.env.MAIL_USER,
        to: email,

        // Subject of Email
        subject: 'Email Verification - Ekart',

        // This would be the HTML of email body
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
        `
    };

    transporter.sendMail(mailConfigurations, function (error, info) {
        if (error) {
            console.error('❌ Email sending failed:', error.message)
            throw Error(error);
        }
        console.log('✅ Verification Email Sent Successfully');
    });
}
