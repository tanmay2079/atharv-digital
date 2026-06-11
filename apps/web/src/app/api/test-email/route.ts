import nodemailer from 'nodemailer';

export async function GET() {
  const results: string[] = [];
  const env = {
    SMTP_USER: process.env.SMTP_USER || 'NOT SET',
    SMTP_PASS: process.env.SMTP_PASS ? '***SET***' : 'NOT SET',
    SMTP_HOST: process.env.SMTP_HOST || 'NOT SET',
    SMTP_PORT: process.env.SMTP_PORT || 'NOT SET',
    INQUIRY_EMAIL_TO: process.env.INQUIRY_EMAIL_TO || 'NOT SET',
  };

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return Response.json({ success: false, env, error: 'SMTP credentials not set in .env' });
  }

  // Try port 587 first, then 465
  const configs = [
    { port: 587, secure: false },
    { port: 465, secure: true },
  ];

  for (const config of configs) {
    try {
      results.push(`Trying port ${config.port} (secure: ${config.secure})...`);
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: config.port,
        secure: config.secure,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        tls: { rejectUnauthorized: false },
      });
      await transporter.verify();
      results.push(`✓ Port ${config.port} - Connection OK!`);

      const info = await transporter.sendMail({
        from: `"Atharv Studio" <${process.env.SMTP_USER}>`,
        to: process.env.INQUIRY_EMAIL_TO,
        subject: 'Test Email - Atharv Studio',
        text: 'Email system is working!',
      });
      results.push(`✓ Email sent! ID: ${info.messageId}`);
      return Response.json({ success: true, env, results });
    } catch (err: any) {
      results.push(`✗ Port ${config.port} failed: ${err.response || err.message}`);
    }
  }

  return Response.json({ success: false, env, results });
}
