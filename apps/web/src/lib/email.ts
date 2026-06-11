import nodemailer from 'nodemailer';

export interface InquiryEmailData {
  name: string;
  phone: string;
  service_required: string;
  message?: string;
}

function getTransporter() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
    },
  });
}

export async function sendInquiryEmail(data: InquiryEmailData): Promise<boolean> {
  const recipient = process.env.INQUIRY_EMAIL_TO || 'tanmayshivane20@gmail.com';

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('SMTP credentials not configured. Email will not be sent.');
    console.log('Inquiry received:', JSON.stringify(data, null, 2));
    return false;
  }

  try {
    const transporter = getTransporter();
    await transporter.sendMail({
      from: `"Atharv Digital Studio" <${process.env.SMTP_USER}>`,
      to: recipient,
      subject: `New Inquiry: ${data.service_required} from ${data.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.1);">
            <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); padding: 24px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 20px;">📸 New Studio Inquiry</h1>
            </div>
            <div style="padding: 24px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666; font-size: 13px;">Name</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: 600; font-size: 14px;">${data.name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666; font-size: 13px;">Phone</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: 600; font-size: 14px;">${data.phone}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666; font-size: 13px;">Service Required</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: 600; font-size: 14px;">${data.service_required}</td>
                </tr>
                ${data.message ? `
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666; font-size: 13px; vertical-align: top;">Message</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; font-size: 14px;">${data.message}</td>
                </tr>
                ` : ''}
              </table>
              <p style="color: #999; font-size: 12px; margin-top: 20px; text-align: center;">
                Sent from Atharv Digital Photo Studio website
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });
    console.log('Inquiry email sent successfully to', recipient);
    return true;
  } catch (error) {
    console.error('Failed to send inquiry email:', error);
    return false;
  }
}
