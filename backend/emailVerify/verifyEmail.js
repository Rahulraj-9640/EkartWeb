import { Resend } from "resend";
import "dotenv/config";

const resend = new Resend(process.env.RESEND_API_KEY);

export const verifyEmail = async (token, email, name = "User") => {
  try {
    const frontendURL =
      process.env.FRONTEND_URL || "http://localhost:5173";

    const verificationLink = `${frontendURL}/verify/${token}`;

    await resend.emails.send({
      from: "onboarding@resend.dev",   // free account default sender
      to: email,
      subject: "Verify Your Email - Ekart",
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,sans-serif;">
        
        <table align="center" width="100%" cellpadding="0" cellspacing="0"
               style="max-width:600px;margin:auto;background:#ffffff;border-radius:8px;overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background:#111827;padding:20px;text-align:center;">
              <h1 style="color:#ffffff;margin:0;">EKART</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px;">
              <h2 style="color:#111827;">Hi ${name}, 👋</h2>

              <p style="color:#4b5563;font-size:16px;line-height:1.6;">
                Thank you for signing up with <strong>Ekart</strong>.
                Please confirm your email address to activate your account.
              </p>

              <div style="text-align:center;margin:30px 0;">
                <a href="${verificationLink}"
                   style="background:#111827;color:#ffffff;
                          padding:12px 25px;
                          text-decoration:none;
                          border-radius:6px;
                          font-size:16px;
                          display:inline-block;">
                  Verify Email
                </a>
              </div>

              <p style="color:#6b7280;font-size:14px;">
                If the button doesn’t work, copy this link:
              </p>

              <p style="word-break:break-all;color:#2563eb;font-size:14px;">
                ${verificationLink}
              </p>

              <p style="color:#9ca3af;font-size:13px;margin-top:30px;">
                This link will expire in 10 minutes.
              </p>

              <p style="color:#9ca3af;font-size:13px;">
                If you didn’t create an account, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;padding:15px;text-align:center;
                       font-size:12px;color:#9ca3af;">
              © ${new Date().getFullYear()} Ekart. All rights reserved.
            </td>
          </tr>

        </table>
      </body>
      </html>
      `
    });

    console.log("✅ Verification Email Sent Successfully via Resend:", email);

  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw error;
  }
};