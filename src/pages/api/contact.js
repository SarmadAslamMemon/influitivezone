import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { name, email, phone, subject, message } = req.body;

  // Get SMTP configuration from environment variables
  const smtpHost = process.env.SMTP_HOST || "smtp.hostinger.com";
  const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
  // Secure should be true for port 465 (SSL), false for port 587 (TLS)
  const smtpSecure = smtpPort === 465 || process.env.SMTP_SECURE === "true";
  const smtpUser = process.env.SMTP_USER || "cameron.blake@influitivezone.com";
  
  // Remove quotes from password if present (handle both single and double quotes)
  let smtpPass = process.env.SMTP_PASS || "mM>1|&mYU6";
  
  // Remove surrounding quotes more robustly - handle multiple layers
  if (smtpPass) {
    // Keep removing quotes until none remain at start/end
    let previousLength = 0;
    while (smtpPass.length !== previousLength) {
      previousLength = smtpPass.length;
      // Remove double quotes
      if (smtpPass.startsWith('"') && smtpPass.endsWith('"')) {
        smtpPass = smtpPass.slice(1, -1);
      }
      // Remove single quotes
      if (smtpPass.startsWith("'") && smtpPass.endsWith("'")) {
        smtpPass = smtpPass.slice(1, -1);
      }
    }
    // Remove newlines, carriage returns, and other control characters
    smtpPass = smtpPass.replace(/\r\n/g, '').replace(/\n/g, '').replace(/\r/g, '');
    // Trim any whitespace from both ends
    smtpPass = smtpPass.trim();
    // Remove any remaining quotes that might be embedded
    smtpPass = smtpPass.replace(/^["']+|["']+$/g, '');
  }
  
  // Debug password (first and last few chars for debugging, but safely)
  const originalPass = process.env.SMTP_PASS || '';
  console.log("Password processing:", {
    originalLength: originalPass.length,
    cleanedLength: smtpPass.length,
    first3Chars: smtpPass.substring(0, 3),
    last3Chars: smtpPass.substring(Math.max(0, smtpPass.length - 3)),
    originalFirst3: originalPass.substring(0, 3),
    originalLast3: originalPass.substring(Math.max(0, originalPass.length - 3)),
    hasNewlines: originalPass.includes('\n') || originalPass.includes('\r'),
    hasQuotes: originalPass.includes('"') || originalPass.includes("'")
  });

  try {

    // Debug: Log environment variables (remove in production)
    console.log("SMTP Config:", {
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      user: smtpUser,
      pass: "***hidden***",
      passLength: smtpPass.length,
    });

    // ✅ Transporter uses environment variables with fallback to defaults
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser, 
        pass: smtpPass,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Verify connection before sending
    console.log("Verifying SMTP connection...");
    await transporter.verify();
    console.log("✅ SMTP connection verified successfully");

    // ✅ Send email (visibly from info@influitivezone.com)
    await transporter.sendMail({
      from: `"${name}" <info@influitivezone.com>`,  // display info@influitivezone.com
      sender: "cameron.blake@influitivezone.com",   // actual authenticated sender
      to: "info@influitivezone.com",                // deliver to info@influitivezone.com
      replyTo: email,                               // replies go to user's email
      subject: subject || "New Contact Form Submission",
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone || "N/A"}
        Message: ${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    console.log("✅ Email sent successfully");
    return res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    
    // Enhanced error logging for debugging
    if (error.code === 'EAUTH') {
      console.error("Authentication failed. Check:");
      console.error("1. Username:", smtpUser);
      console.error("2. Password length:", smtpPass.length);
      console.error("3. SMTP Host:", smtpHost);
      console.error("4. SMTP Port:", smtpPort);
      console.error("5. SMTP Secure:", smtpSecure);
    }
    
    return res.status(500).json({
      success: false,
      message: "Email failed to send",
      error: error.message,
      code: error.code,
      response: error.response
    });
  }
}
