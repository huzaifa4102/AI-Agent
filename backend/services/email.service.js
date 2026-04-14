require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASS,
  },
});

// Email 1 — Sent to the CLIENT
const sendClientEmail = async ({ clientName, clientEmail, projectDetails, clientPhone }) => {
  try {
    await transporter.sendMail({
      from: `"DS Technologies Pvt. Limited" <${process.env.EMAIL_USER}>`,
      to: clientEmail,
      subject: "✅ We received your project inquiry — DS Technologies",
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <tr>
            <td style="background:linear-gradient(135deg,#1e40af,#3b82f6);border-radius:16px 16px 0 0;padding:40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;">DS Technologies</h1>
              <p style="margin:6px 0 0;color:#bfdbfe;font-size:14px;">Pvt. Limited</p>
            </td>
          </tr>

          <tr>
            <td style="background:#ffffff;padding:40px;">
              <h2 style="margin:0 0 20px;color:#1e293b;font-size:22px;">Dear ${clientName} 👋</h2>
              <p style="margin:0 0 24px;color:#475569;font-size:15px;line-height:1.7;">
                Thank you for reaching out to <strong style="color:#1e40af;">DS Technologies Pvt. Limited</strong>.
                We have successfully received your project inquiry and our senior team is already reviewing your requirements.
              </p>

              <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:16px;margin:0 0 28px;text-align:center;">
                <p style="margin:0;color:#1d4ed8;font-size:15px;font-weight:600;">
                  ⚡ Expected response within <span style="color:#dc2626;">2 hours</span> during business hours
                </p>
              </div>

              <div style="background:#f8fafc;border-left:4px solid #3b82f6;border-radius:0 10px 10px 0;padding:20px;margin:0 0 28px;">
                <p style="margin:0 0 10px;color:#94a3b8;font-size:12px;font-weight:600;text-transform:uppercase;">Your Project Summary</p>
                <p style="margin:0 0 8px;color:#334155;font-size:15px;line-height:1.7;">${projectDetails}</p>
                <p style="margin:8px 0 0;color:#64748b;font-size:13px;">Contact Phone: ${clientPhone || "Not provided"}</p>
              </div>

              <p style="margin:0 0 16px;color:#1e293b;font-size:16px;font-weight:700;">What happens next?</p>
              <p style="margin:0 0 8px;color:#334155;font-size:14px;">1. Our technical team will carefully analyze your project requirements</p>
              <p style="margin:0 0 8px;color:#334155;font-size:14px;">2. We will send you a detailed quote within 24 hours</p>
              <p style="margin:0 0 28px;color:#334155;font-size:14px;">3. We will schedule a free 30 minute consultation call</p>

              <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:20px;margin:0 0 28px;">
                <p style="margin:0 0 12px;color:#166534;font-size:14px;font-weight:700;">Why clients choose DS Technologies</p>
                <p style="margin:0 0 6px;color:#15803d;font-size:13px;">✅ 5+ years of industry experience</p>
                <p style="margin:0 0 6px;color:#15803d;font-size:13px;">✅ 50+ successfully delivered projects</p>
                <p style="margin:0 0 6px;color:#15803d;font-size:13px;">✅ Free 30 days support after delivery</p>
                <p style="margin:0 0 6px;color:#15803d;font-size:13px;">✅ Money back guarantee in first week</p>
                <p style="margin:0;color:#15803d;font-size:13px;">✅ Transparent pricing, no hidden charges</p>
              </div>

              <p style="margin:20px 0 0;color:#475569;font-size:14px;">Warm regards,</p>
              <p style="margin:4px 0 0;color:#1e293b;font-size:15px;font-weight:700;">The DS Technologies Team</p>
            </td>
          </tr>

          <tr>
            <td style="background:#1e293b;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;">
              <p style="margin:0 0 8px;color:#94a3b8;font-size:13px;">DS Technologies Pvt. Limited</p>
              <p style="margin:0;color:#64748b;font-size:12px;">Available Monday to Saturday | 9 AM to 6 PM PKT</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });
    console.log(`✅ Client email sent to ${clientEmail}`);
  } catch (err) {
    console.error("❌ Client email error:", err.message);
  }
};

// Email 2 — Sent to YOUR COMPANY
const sendCompanyEmail = async ({ clientName, clientEmail, clientPhone, projectDetails, channel }) => {
  try {
    await transporter.sendMail({
      from: `"AI Agent" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `🔔 New Lead: ${clientName} via ${channel}`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <tr>
            <td style="background:linear-gradient(135deg,#dc2626,#ef4444);border-radius:16px 16px 0 0;padding:30px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">🔔 New Lead Alert!</h1>
              <p style="margin:6px 0 0;color:#fecaca;font-size:14px;">A new client just confirmed their interest</p>
            </td>
          </tr>

          <tr>
            <td style="background:#ffffff;padding:40px;">

              <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:10px;padding:20px;margin:0 0 24px;">
                <p style="margin:0 0 6px;color:#991b1b;font-size:12px;font-weight:700;text-transform:uppercase;">Action Required</p>
                <p style="margin:0;color:#dc2626;font-size:15px;font-weight:600;">Follow up with this client within 2 hours</p>
              </div>

              <p style="margin:0 0 16px;color:#1e293b;font-size:16px;font-weight:700;">Client Details</p>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:14px;width:140px;">Client Name</td>
                  <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#1e293b;font-size:14px;font-weight:600;">${clientName}</td>
                </tr>
                <tr>
                   <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:14px;">Email</td>
                   <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#1e293b;font-size:14px;font-weight:600;">${clientEmail}</td>
                 </tr>
                 <tr>
                   <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:14px;">Phone</td>
                   <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#1e293b;font-size:14px;font-weight:600;">${clientPhone || "Not provided"}</td>
                 </tr>
                 <tr>
                   <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:14px;">Channel</td>
                   <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#1e293b;font-size:14px;font-weight:600;">${channel}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#64748b;font-size:14px;">Date</td>
                  <td style="padding:10px 0;color:#1e293b;font-size:14px;font-weight:600;">${new Date().toLocaleString("en-PK", { timeZone: "Asia/Karachi" })}</td>
                </tr>
              </table>

              <p style="margin:0 0 12px;color:#1e293b;font-size:16px;font-weight:700;">Project Details</p>
              <div style="background:#f8fafc;border-left:4px solid #dc2626;border-radius:0 10px 10px 0;padding:20px;margin:0 0 28px;">
                <p style="margin:0;color:#334155;font-size:15px;line-height:1.7;">${projectDetails}</p>
              </div>

              <div style="background:#eff6ff;border-radius:10px;padding:16px;text-align:center;">
                <p style="margin:0;color:#1d4ed8;font-size:14px;">This lead was automatically captured by your AI Agent</p>
                <p style="margin:4px 0 0;color:#3b82f6;font-size:13px;">A confirmation email has already been sent to the client</p>
              </div>

            </td>
          </tr>

          <tr>
            <td style="background:#1e293b;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;">
              <p style="margin:0;color:#94a3b8;font-size:13px;">DS Technologies AI Agent — Automatic Lead Notification</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });
    console.log(`✅ Company notification email sent`);
  } catch (err) {
    console.error("❌ Company email error:", err.message);
  }
};

const sendConfirmationEmail = async ({ clientName, clientEmail, clientPhone, projectDetails, channel }) => {
  await sendClientEmail({ clientName, clientEmail, clientPhone, projectDetails });
  await sendCompanyEmail({ clientName, clientEmail, clientPhone, projectDetails, channel });
};

module.exports = { sendConfirmationEmail };