import { Resend } from "resend";
import "dotenv/config";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOTPMail = async (otp, email, name = "User") => {
  try {
    await resend.emails.send({
      from: "Ekart <onboarding@resend.dev>",   // Free account default
      to: email,
      subject: "Ekart - Password Reset OTP",
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
            <td style="padding:30px;text-align:center;">
              <h2 style="color:#111827;">Hi ${name}, 👋</h2>

              <p style="color:#4b5563;font-size:16px;line-height:1.6;">
                We received a request to reset your Ekart account password.
              </p>

              <p style="color:#6b7280;font-size:15px;">
                Use the OTP below to reset your password:
              </p>

              <!-- OTP Box -->
              <div style="
                  margin:25px auto;
                  padding:15px 25px;
                  background:#f3f4f6;
                  border-radius:8px;
                  display:inline-block;
                  letter-spacing:6px;
                  font-size:28px;
                  font-weight:bold;
                  color:#111827;">
                ${otp}
              </div>

              <p style="color:#ef4444;font-size:14px;margin-top:15px;">
                ⚠ This OTP is valid for 10 minutes only.
              </p>

              <p style="color:#9ca3af;font-size:13px;margin-top:25px;">
                If you didn’t request a password reset, you can safely ignore this email.
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

    console.log("✅ OTP Email Sent Successfully via Resend:", email);

  } catch (error) {
    console.error("❌ OTP Email sending failed:", error);
    throw error;
  }
};