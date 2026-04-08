require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASS,
  },
});

const sendConfirmationEmail = async ({ clientName, clientEmail, projectDetails }) => {
  try {
    await transporter.sendMail({
      from: `"DS Technologies Pvt. Limited" <${process.env.EMAIL_USER}>`,
      to: clientEmail,
      subject: "✅ We received your project inquiry — DS Technologies",
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#1e40af,#3b82f6);border-radius:16px 16px 0 0;padding:40px 40px 30px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;letter-spacing:-0.5px;">DS Technologies</h1>
              <p style="margin:6px 0 0;color:#bfdbfe;font-size:14px;letter-spacing:1px;">Pvt. Limited</p>
              <div style="margin:20px auto 0;width:50px;height:3px;background:#60a5fa;border-radius:2px;"></div>
            </td>
          </tr>

          <!-- MAIN BODY -->
          <tr>
            <td style="background:#ffffff;padding:40px;">

              <!-- Greeting -->
              <p style="margin:0 0 8px;color:#64748b;font-size:14px;">Hello,</p>
              <h2 style="margin:0 0 20px;color:#1e293b;font-size:22px;font-weight:700;">Dear ${clientName} 👋</h2>

              <!-- Thank you message -->
              <p style="margin:0 0 24px;color:#475569;font-size:15px;line-height:1.7;">
                Thank you for reaching out to <strong style="color:#1e40af;">DS Technologies Pvt. Limited</strong>. 
                We have successfully received your project inquiry and our senior team is already reviewing your requirements.
              </p>

              <!-- Response time badge -->
              <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:16px 20px;margin:0 0 28px;text-align:center;">
                <p style="margin:0;color:#1d4ed8;font-size:15px;font-weight:600;">
                  ⚡ Expected response within <span style="color:#dc2626;">2 hours</span> during business hours
                </p>
              </div>

              <!-- Project Summary -->
              <div style="background:#f8fafc;border-left:4px solid #3b82f6;border-radius:0 10px 10px 0;padding:20px 24px;margin:0 0 28px;">
                <p style="margin:0 0 10px;color:#94a3b8;font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">Your Project Summary</p>
                <p style="margin:0;color:#334155;font-size:15px;line-height:1.7;">${projectDetails}</p>
              </div>

              <!-- What happens next -->
              <p style="margin:0 0 16px;color:#1e293b;font-size:16px;font-weight:700;">What happens next?</p>

              <!-- Step 1 -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
                <tr>
                  <td width="44" valign="top">
                    <div style="width:36px;height:36px;background:#eff6ff;border-radius:50%;text-align:center;line-height:36px;color:#1d4ed8;font-weight:700;font-size:15px;">1</div>
                  </td>
                  <td valign="middle">
                    <p style="margin:0;color:#334155;font-size:14px;line-height:1.6;">
                      <strong>Requirements Review</strong> — Our technical team will carefully analyze your project requirements
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Step 2 -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
                <tr>
                  <td width="44" valign="top">
                    <div style="width:36px;height:36px;background:#eff6ff;border-radius:50%;text-align:center;line-height:36px;color:#1d4ed8;font-weight:700;font-size:15px;">2</div>
                  </td>
                  <td valign="middle">
                    <p style="margin:0;color:#334155;font-size:14px;line-height:1.6;">
                      <strong>Detailed Quote</strong> — We will send you a complete cost and timeline breakdown within 24 hours
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Step 3 -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td width="44" valign="top">
                    <div style="width:36px;height:36px;background:#eff6ff;border-radius:50%;text-align:center;line-height:36px;color:#1d4ed8;font-weight:700;font-size:15px;">3</div>
                  </td>
                  <td valign="middle">
                    <p style="margin:0;color:#334155;font-size:14px;line-height:1.6;">
                      <strong>Free Consultation Call</strong> — We will schedule a 30 minute call to discuss your project in detail
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Why choose us -->
              <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:20px 24px;margin:0 0 28px;">
                <p style="margin:0 0 12px;color:#166534;font-size:14px;font-weight:700;">Why clients choose DS Technologies</p>
                <p style="margin:0 0 6px;color:#15803d;font-size:13px;">✅ &nbsp;5+ years of industry experience</p>
                <p style="margin:0 0 6px;color:#15803d;font-size:13px;">✅ &nbsp;50+ successfully delivered projects</p>
                <p style="margin:0 0 6px;color:#15803d;font-size:13px;">✅ &nbsp;Free 30 days support after delivery</p>
                <p style="margin:0 0 6px;color:#15803d;font-size:13px;">✅ &nbsp;Money back guarantee in first week</p>
                <p style="margin:0;color:#15803d;font-size:13px;">✅ &nbsp;Transparent pricing, no hidden charges</p>
              </div>

              <!-- CTA Button -->
              <div style="text-align:center;margin:0 0 28px;">
                <a href="mailto:${process.env.EMAIL_USER}" 
                   style="display:inline-block;background:linear-gradient(135deg,#1e40af,#3b82f6);color:#ffffff;text-decoration:none;padding:14px 36px;border-radius:8px;font-size:15px;font-weight:600;letter-spacing:0.3px;">
                  Reply to This Email
                </a>
              </div>

              <!-- Closing -->
              <p style="margin:0 0 4px;color:#475569;font-size:14px;line-height:1.7;">
                If you have any urgent questions, feel free to reply to this email and our team will get back to you as soon as possible.
              </p>
              <p style="margin:20px 0 0;color:#475569;font-size:14px;">Warm regards,</p>
              <p style="margin:4px 0 0;color:#1e293b;font-size:15px;font-weight:700;">The DS Technologies Team</p>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#1e293b;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;">
              <p style="margin:0 0 8px;color:#94a3b8;font-size:13px;">
                DS Technologies Pvt. Limited
              </p>
              <p style="margin:0 0 8px;color:#64748b;font-size:12px;">
                Available Monday to Saturday &nbsp;|&nbsp; 9 AM to 6 PM PKT
              </p>
              <p style="margin:0;color:#64748b;font-size:11px;">
                This email was sent automatically by our AI Agent. Please do not reply if you did not contact us.
              </p>
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

    console.log(`✅ Confirmation email sent to ${clientEmail}`);

  } catch (err) {
    console.error("❌ Email error:", err.message);
  }
};

module.exports = { sendConfirmationEmail };