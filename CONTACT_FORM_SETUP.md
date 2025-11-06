# Contact Form Setup Instructions

## Overview
The contact form has been successfully configured with Nodemailer and SMTP to send emails when users submit the form. Here's what has been implemented:

## Features
- ✅ Form validation (client-side and server-side)
- ✅ Email sending via Nodemailer with SMTP
- ✅ Success/error message display
- ✅ Loading states during form submission
- ✅ Responsive design with proper styling
- ✅ Form field validation with error messages

## Setup Instructions

### 1. Install Dependencies
```bash
npm install nodemailer
```

### 2. Environment Configuration
1. Copy the `env.example` file to `.env.local`:
   ```bash
   cp env.example .env.local
   ```

2. Update `.env.local` with your email service credentials:

#### For Gmail:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com
CONTACT_EMAIL=contact@yourdomain.com
```

**Important for Gmail:**
- Enable 2-factor authentication on your Gmail account
- Generate an App Password (not your regular password)
- Use the App Password in `SMTP_PASS`

#### For Outlook/Hotmail:
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
SMTP_FROM=your-email@outlook.com
CONTACT_EMAIL=contact@yourdomain.com
```

### 3. Files Modified/Created

#### New Files:
- `src/pages/api/contact.js` - API route for handling form submissions
- `env.example` - Environment variables template

#### Modified Files:
- `src/components/contact/Contact1.jsx` - Updated with form handling logic
- `src/styles/extra.css` - Added form validation styles

### 4. Testing the Form

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the contact page
3. Fill out the form and submit
4. Check your email for the contact form submission

### 5. Form Fields

The form includes the following fields:
- **Name** (required)
- **Email** (required, validated)
- **Phone** (optional)
- **Subject** (required)
- **Message** (required)

### 6. Email Template

The email will be sent with:
- Professional HTML formatting
- All form data included
- Timestamp of submission
- Clear subject line with the form subject

### 7. Troubleshooting

#### Common Issues:

1. **"Authentication failed" error:**
   - Check your email credentials
   - For Gmail, ensure you're using an App Password, not your regular password
   - Verify 2-factor authentication is enabled

2. **"Connection timeout" error:**
   - Check your SMTP host and port settings
   - Verify your internet connection
   - Some networks block SMTP ports

3. **Form not submitting:**
   - Check browser console for JavaScript errors
   - Verify the API route is accessible at `/api/contact`
   - Check server logs for errors

4. **Emails not received:**
   - Check spam/junk folder
   - Verify the `CONTACT_EMAIL` address is correct
   - Check SMTP logs for delivery status

### 8. Security Notes

- Never commit `.env.local` to version control
- Use environment variables for all sensitive data
- Consider implementing rate limiting for production
- Add CAPTCHA for additional spam protection if needed

## Support

If you encounter any issues, check:
1. Environment variables are correctly set
2. Email service credentials are valid
3. Network connectivity
4. Browser console for client-side errors
5. Server logs for API errors
