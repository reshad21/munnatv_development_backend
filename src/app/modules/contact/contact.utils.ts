import nodemailer from 'nodemailer';

interface ContactEmailData {
  name: string;
  email: string;
  message?: string;
  subject?: string;
  createdAt: Date;
}

export const sendContactEmailToAdmin = async (
  contactData: ContactEmailData,
) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'softysta@gmail.com',
      pass: 'eyxa nlhz cljy fiib',
    },
  });

  const htmlContent = `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Inquiry - SOFTYSTA</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f8fafc;
        color: #334155;
        line-height: 1.6;
      }
      
      .email-container {
        max-width: 650px;
        margin: 40px auto;
        background-color: #ffffff;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        border: 1px solid #e2e8f0;
      }
      
      .header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: #ffffff;
        padding: 40px 30px;
        text-align: center;
        position: relative;
      }
      
      .header::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
        opacity: 0.3;
      }
      
      .header h1 {
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 8px;
        position: relative;
        z-index: 1;
      }
      
      .header p {
        font-size: 16px;
        opacity: 0.9;
        position: relative;
        z-index: 1;
      }
      
      .content {
        padding: 40px 30px;
        background-color: #ffffff;
      }
      
      .alert-badge {
        display: inline-block;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 25px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .contact-info {
        background: linear-gradient(135deg, #f8fafc, #f1f5f9);
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 25px;
        margin: 25px 0;
      }
      
      .info-row {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        padding: 10px 0;
      }
      
      .info-row:last-child {
        margin-bottom: 0;
      }
      
      .info-label {
        font-weight: 600;
        color: #475569;
        min-width: 120px;
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .info-value {
        color: #1e293b;
        font-size: 16px;
        word-break: break-word;
      }
      
      .message-section {
        background: #ffffff;
        border: 2px dashed #e2e8f0;
        border-radius: 12px;
        padding: 25px;
        margin: 25px 0;
      }
      
      .message-label {
        font-weight: 600;
        color: #475569;
        margin-bottom: 12px;
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .message-content {
        color: #334155;
        font-size: 15px;
        line-height: 1.7;
        white-space: pre-wrap;
        background: #f8fafc;
        padding: 20px;
        border-radius: 8px;
        border-left: 4px solid #667eea;
      }
      
      .cta-section {
        text-align: center;
        margin: 30px 0;
        padding: 25px;
        background: linear-gradient(135deg, #f8fafc, #f1f5f9);
        border-radius: 12px;
      }
      
      .cta-button {
        display: inline-block;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: #ffffff;
        text-decoration: none;
        padding: 14px 28px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 16px;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .cta-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
      }
      
      .footer {
        background: linear-gradient(135deg, #1e293b, #334155);
        color: #cbd5e1;
        text-align: center;
        padding: 30px;
        font-size: 14px;
      }
      
      .company-name {
        font-weight: 700;
        color: #ffffff;
        font-size: 20px;
        margin-bottom: 8px;
        letter-spacing: 1px;
      }
      
      .tagline {
        font-style: italic;
        opacity: 0.8;
        margin-bottom: 15px;
      }
      
      .copyright {
        border-top: 1px solid rgba(203, 213, 225, 0.2);
        padding-top: 15px;
        margin-top: 15px;
        opacity: 0.7;
      }
      
      @media (max-width: 600px) {
        .email-container {
          margin: 20px;
          border-radius: 8px;
        }
        
        .header, .content, .footer {
          padding: 25px 20px;
        }
        
        .info-row {
          flex-direction: column;
          align-items: flex-start;
        }
        
        .info-label {
          margin-bottom: 5px;
        }
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <h1>New Contact Inquiry</h1>
        <p>Someone has reached out through your website</p>
      </div>
      
      <div class="content">
        <div class="alert-badge">🔔 New Lead</div>
        
        <p style="font-size: 16px; margin-bottom: 25px; color: #475569;">
          Hello SOFTYSTA Team,
        </p>
        
        <p style="font-size: 16px; margin-bottom: 25px; color: #475569;">
          You have received a new contact inquiry through your website. Here are the details:
        </p>
        
        <div class="contact-info">
          <div class="info-row">
            <span class="info-label">👤 Name:</span>
            <span class="info-value">${contactData.name}</span>
          </div>
          
          <div class="info-row">
            <span class="info-label">📧 Email:</span>
            <span class="info-value">${contactData.email}</span>
          </div>
          
          <div class="info-row">
            <span class="info-label">📅 Date:</span>
            <span class="info-value">${new Date(
              contactData.createdAt,
            ).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}</span>
          </div>
        </div>
        
        ${
          contactData.message
            ? `
        <div class="message-section">
          <div class="message-label">💬 Message:</div>
          <div class="message-content">${contactData.message}</div>
        </div>
        `
            : ''
        }
        
        <div class="cta-section">
          <p style="margin-bottom: 20px; color: #475569; font-size: 16px;">
            <strong>Ready to respond?</strong> Click below to reply directly to this inquiry.
          </p>
          <a href="mailto:${contactData.email}?subject=Re: Your inquiry to SOFTYSTA&body=Hi ${contactData.name},%0D%0A%0D%0AThank you for reaching out to SOFTYSTA. We appreciate your interest in our services.%0D%0A%0D%0ABest regards,%0D%0ASOFTYSTA Team" class="cta-button">
            Reply to ${contactData.name}
          </a>
        </div>
        
        <p style="font-size: 14px; color: #64748b; text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          <strong>Pro Tip:</strong> Quick responses lead to better conversion rates. Consider replying within 24 hours for the best results.
        </p>
      </div>
      
      <div class="footer">
        <div class="company-name">SOFTYSTA</div>
        <div class="tagline">Crafting Digital Excellence</div>
        <div class="copyright">
          &copy; ${new Date().getFullYear()} SOFTYSTA. All rights reserved.
        </div>
      </div>
    </div>
  </body>
  </html>
  `;

  // Send email to admin
  await transporter.sendMail({
    from: 'softysta@gmail.com',
    to: 'softysta@gmail.com', // Admin email - you can change this to your admin email
    subject: `${contactData.subject || '🔔 New Contact Inquiry from ' + contactData.name} - SOFTYSTA`,
    text: `New contact inquiry received:\n\nName: ${contactData.name}\nEmail: ${contactData.email}\nMessage: ${contactData.message || 'No message provided'}\nDate: ${new Date(contactData.createdAt).toLocaleString()}`,
    html: htmlContent,
  });
};

export const sendContactConfirmationToUser = async (
  contactData: ContactEmailData,
) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'softysta@gmail.com',
      pass: 'eyxa nlhz cljy fiib',
    },
  });

  const confirmationHtml = `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You - SOFTYSTA</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f8fafc;
        color: #334155;
        line-height: 1.6;
      }
      
      .email-container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        border: 1px solid #e2e8f0;
      }
      
      .header {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: #ffffff;
        padding: 40px 30px;
        text-align: center;
      }
      
      .header h1 {
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 8px;
      }
      
      .content {
        padding: 40px 30px;
      }
      
      .success-icon {
        text-align: center;
        margin-bottom: 30px;
        font-size: 48px;
      }
      
      .message-box {
        background: linear-gradient(135deg, #f0fdf4, #dcfce7);
        border: 1px solid #bbf7d0;
        border-radius: 12px;
        padding: 25px;
        margin: 25px 0;
        text-align: center;
      }
      
      .footer {
        background: linear-gradient(135deg, #1e293b, #334155);
        color: #cbd5e1;
        text-align: center;
        padding: 30px;
        font-size: 14px;
      }
      
      .company-name {
        font-weight: 700;
        color: #ffffff;
        font-size: 20px;
        margin-bottom: 8px;
        letter-spacing: 1px;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <h1>Thank You for Contacting Us!</h1>
      </div>
      
      <div class="content">
        <div class="success-icon">✅</div>
        
        <p style="font-size: 18px; margin-bottom: 25px;">
          Hello <strong>${contactData.name}</strong>,
        </p>
        
        <div class="message-box">
          <h2 style="color: #059669; margin-bottom: 15px;">Message Received Successfully!</h2>
          <p style="font-size: 16px; color: #065f46;">
            Thank you for reaching out to SOFTYSTA. We have received your inquiry and our team will review it shortly.
          </p>
        </div>
        
        <p style="font-size: 16px; margin-bottom: 20px; color: #475569;">
          Our team typically responds within <strong>24-48 hours</strong> during business days. We're excited to learn more about your project and explore how we can help bring your vision to life.
        </p>
        
        <p style="font-size: 16px; margin-bottom: 25px; color: #475569;">
          In the meantime, feel free to explore our portfolio and services on our website.
        </p>
        
        <p style="font-size: 16px; color: #475569;">
          Best regards,<br>
          <strong>The SOFTYSTA Team</strong>
        </p>
      </div>
      
      <div class="footer">
        <div class="company-name">SOFTYSTA</div>
        <div style="font-style: italic; opacity: 0.8; margin-bottom: 15px;">
          Crafting Digital Excellence
        </div>
        <div style="border-top: 1px solid rgba(203, 213, 225, 0.2); padding-top: 15px; margin-top: 15px; opacity: 0.7;">
          &copy; ${new Date().getFullYear()} SOFTYSTA. All rights reserved.
        </div>
      </div>
    </div>
  </body>
  </html>
  `;

  // Send confirmation email to user
  await transporter.sendMail({
    from: 'softysta@gmail.com',
    to: contactData.email,
    subject: "Thank you for contacting SOFTYSTA - We'll be in touch soon!",
    text: `Hello ${contactData.name},\n\nThank you for reaching out to SOFTYSTA. We have received your inquiry and our team will review it shortly.\n\nOur team typically responds within 24-48 hours during business days.\n\nBest regards,\nThe SOFTYSTA Team`,
    html: confirmationHtml,
  });
};
