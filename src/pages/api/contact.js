import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { name, email, phone, subject, message } = req.body;

  try {
    // Debug: Log environment variables (remove in production)
    console.log("SMTP Config:", {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE,
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS ? "***hidden***" : "NOT_SET",
      passLength: process.env.SMTP_PASS?.length,
      passFirstChar: process.env.SMTP_PASS?.charAt(0),
      passLastChar: process.env.SMTP_PASS?.charAt(process.env.SMTP_PASS?.length - 1)
    });

    // ✅ Transporter uses direct credentials (no env variables)
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 587,
      secure: false,
      auth: {
        user: "cameron.blake@influitivezone.com", 
        pass: "~i5bE*i]+m5P",
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
      console.error("1. Username:", process.env.SMTP_USER);
      console.error("2. Password length:", process.env.SMTP_PASS?.length);
      console.error("3. SMTP Host:", process.env.SMTP_HOST);
      console.error("4. SMTP Port:", process.env.SMTP_PORT);
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
